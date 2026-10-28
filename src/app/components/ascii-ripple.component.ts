import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, PLATFORM_ID, inject, NgZone, ChangeDetectionStrategy, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../services/theme.service';

/**
 * AsciiRippleComponent: Angular implementation of React Bits Pro's "ASCII Ripple"
 * Renders text on a grid that ripples like water under the cursor.
 * Features:
 * - 2D wave propagation physics (wave equation with surface damping)
 * - Dynamic ASCII glyph modulation based on wave intensity
 * - Optical refraction & fluid color shifting (crest emerald, trough cyan)
 * - Auto-pausing when offscreen or tab hidden for zero CPU drain
 * - Non-blocking pointer events: interacts across the entire parent section
 */
@Component({
  selector: 'app-ascii-ripple',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="w-full h-full block pointer-events-none" aria-hidden="true"></canvas>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class AsciiRippleComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() text = 'DIGINATURE · SENIOR FULL STACK DEVELOPER · ARCHITECTURE · SCALABILITY · REST APIS · MERN STACK · REACT.JS · NODE.JS · PERFORMANCE · Q-SPIDERS · CLOUD DEPLOYMENT · SYSTEM DESIGN · TYPESCRIPT · DISTRIBUTED SYSTEMS · HIGH VELOCITY · PRODUCTION GRADE · ';
  @Input() chars = ' ·.,:;-~=+*%#@';
  @Input() fontSize = 13;
  @Input() lineHeight = 1.35;
  @Input() fontFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';
  @Input() damping = 0.968;
  @Input() dropStrength = 1.8;
  @Input() interactive = true;
  @Input() ambientRain = true;

  // Custom colors (if unset, adapt automatically to ThemeService)
  @Input() textColor?: string;
  @Input() rippleColor?: string;
  @Input() troughColor?: string;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private hostEl = inject(ElementRef);
  private themeService = inject(ThemeService);

  private ctx!: CanvasRenderingContext2D;
  private offscreenCanvas!: HTMLCanvasElement;
  private offscreenCtx!: CanvasRenderingContext2D;

  private width = 0;
  private height = 0;
  private cols = 0;
  private rows = 0;
  private cellW = 9;
  private cellH = 18;

  // Water wave buffers (Float32Array)
  private buffer1!: Float32Array;
  private buffer2!: Float32Array;

  private rafId?: number;
  private lastTime = 0;
  private inView = true;
  private isAwake = false;
  private lastMouseX = -9999;
  private lastMouseY = -9999;
  private lastInteractionTime = 0;
  private ambientInterval?: ReturnType<typeof setInterval>;

  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private interactiveTarget?: HTMLElement;

  constructor() {
    effect(() => {
      // Re-render offscreen cache whenever theme mode changes
      const isDark = this.themeService.isDarkMode();
      if (this.offscreenCanvas && isPlatformBrowser(this.platformId)) {
        this.renderOffscreenBase();
        this.wakeUp();
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d', { alpha: true })!;
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCtx = this.offscreenCanvas.getContext('2d', { alpha: true })!;

      this.initDimensions();

      this.resizeObserver = new ResizeObserver(() => {
        this.initDimensions();
        this.wakeUp();
      });
      this.resizeObserver.observe(canvas);

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.inView = entry.isIntersecting;
        if (this.inView) {
          this.wakeUp();
        } else if (this.rafId !== undefined) {
          cancelAnimationFrame(this.rafId);
          this.rafId = undefined;
          this.isAwake = false;
        }
      });
      this.intersectionObserver.observe(canvas);

      document.addEventListener('visibilitychange', this.onVisibilityChange);

      if (this.interactive) {
        this.setupEventListeners();
      }

      if (this.ambientRain) {
        this.setupAmbientDrops();
      }

      // Initial gentle ripple upon loading
      setTimeout(() => {
        this.drop(this.width * 0.5, this.height * 0.4, 1.5, 3);
      }, 600);
    });
  }

  ngOnDestroy() {
    if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
    if (this.ambientInterval) clearInterval(this.ambientInterval);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();

    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      if (this.interactiveTarget) {
        this.interactiveTarget.removeEventListener('mousemove', this.onMouseMove as any);
        this.interactiveTarget.removeEventListener('touchmove', this.onTouchMove as any);
        this.interactiveTarget.removeEventListener('mousedown', this.onMouseDown as any);
      }
    }
  }

  private onVisibilityChange = () => {
    if (!document.hidden && this.inView) {
      this.wakeUp();
    } else if (document.hidden && this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
      this.isAwake = false;
    }
  };

  private setupEventListeners() {
    // Listen on the parent section if available so mouse movements anywhere inside trigger ripples
    const target = this.hostEl.nativeElement.closest('section') || this.hostEl.nativeElement.parentElement || this.canvasRef.nativeElement;
    this.interactiveTarget = target;

    target.addEventListener('mousemove', this.onMouseMove as any, { passive: true });
    target.addEventListener('touchmove', this.onTouchMove as any, { passive: true });
    target.addEventListener('mousedown', this.onMouseDown as any, { passive: true });
  }

  private onMouseMove = (e: MouseEvent) => {
    this.lastInteractionTime = performance.now();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > this.width || y < 0 || y > this.height) return;

    const dist = Math.hypot(x - this.lastMouseX, y - this.lastMouseY);
    if (dist >= this.cellW * 0.8) {
      this.lastMouseX = x;
      this.lastMouseY = y;
      this.drop(x, y, 0.75, 2);
    }
  };

  private onTouchMove = (e: TouchEvent) => {
    if (!e.touches.length) return;
    this.lastInteractionTime = performance.now();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const t = e.touches[0];
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;

    if (x < 0 || x > this.width || y < 0 || y > this.height) return;

    this.drop(x, y, 0.9, 2);
  };

  private onMouseDown = (e: MouseEvent) => {
    this.lastInteractionTime = performance.now();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
      // Stronger splash on click
      this.drop(x, y, this.dropStrength * 1.5, 4);
    }
  };

  private setupAmbientDrops() {
    this.ambientInterval = setInterval(() => {
      // If user hasn't moved mouse for over 4.5 seconds and section is in view, drop a gentle ambient ripple
      const now = performance.now();
      if (this.inView && !document.hidden && now - this.lastInteractionTime > 4500) {
        const randX = this.width * (0.15 + Math.random() * 0.7);
        const randY = this.height * (0.15 + Math.random() * 0.7);
        this.drop(randX, randY, 0.7, 2);
      }
    }, 4000);
  }

  /**
   * Imperative API: Trigger a ripple drop at (x, y)
   */
  public drop(pixelX: number, pixelY: number, strength = this.dropStrength, radius = 3) {
    if (!this.cols || !this.rows || !this.buffer1) return;

    const gx = Math.floor(pixelX / this.cellW);
    const gy = Math.floor(pixelY / this.cellH);
    if (gx < 1 || gx >= this.cols - 1 || gy < 1 || gy >= this.rows - 1) return;

    for (let dy = -radius; dy <= radius; dy++) {
      const cy = gy + dy;
      if (cy < 1 || cy >= this.rows - 1) continue;
      for (let dx = -radius; dx <= radius; dx++) {
        const cx = gx + dx;
        if (cx < 1 || cx >= this.cols - 1) continue;
        const d = Math.hypot(dx, dy);
        if (d <= radius) {
          const factor = (1 - d / radius) * strength;
          this.buffer1[cy * this.cols + cx] += factor;
        }
      }
    }
    this.wakeUp();
  }

  /**
   * Imperative API: Calm the surface instantly
   */
  public calm() {
    if (this.buffer1) this.buffer1.fill(0);
    if (this.buffer2) this.buffer2.fill(0);
    this.draw(true);
  }

  private initDimensions() {
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;

    if (this.width === 0 || this.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(this.width * dpr));
    canvas.height = Math.max(1, Math.round(this.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Offscreen canvas setup (1x CSS pixels for crisp text drawing)
    this.offscreenCanvas.width = this.width;
    this.offscreenCanvas.height = this.height;

    // Character metrics
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    const testMetrics = this.ctx.measureText('M');
    this.cellW = Math.max(8, Math.round(testMetrics.width || this.fontSize * 0.6));
    this.cellH = Math.max(12, Math.round(this.fontSize * this.lineHeight));

    this.cols = Math.ceil(this.width / this.cellW) + 2;
    this.rows = Math.ceil(this.height / this.cellH) + 2;

    const size = this.cols * this.rows;
    this.buffer1 = new Float32Array(size);
    this.buffer2 = new Float32Array(size);

    this.renderOffscreenBase();
  }

  private getEffectiveColors() {
    const isDark = this.themeService.isDarkMode();
    return {
      text: this.textColor || (isDark ? 'rgba(52, 211, 153, 0.16)' : 'rgba(15, 23, 42, 0.18)'),
      ripple: this.rippleColor || (isDark ? '#34d399' : '#059669'),
      trough: this.troughColor || (isDark ? '#22d3ee' : '#0891b2')
    };
  }

  private renderOffscreenBase() {
    if (!this.offscreenCtx || this.width === 0 || this.height === 0) return;

    const ctx = this.offscreenCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textBaseline = 'top';
    const colors = this.getEffectiveColors();
    ctx.fillStyle = colors.text;

    const textLen = this.text.length;
    let charIdx = 0;

    for (let y = 0; y < this.rows; y++) {
      const py = y * this.cellH;
      if (py > this.height) break;
      for (let x = 0; x < this.cols; x++) {
        const px = x * this.cellW;
        if (px > this.width) break;

        const ch = this.text[charIdx % textLen];
        charIdx++;
        ctx.fillText(ch, px, py);
      }
    }
  }

  private wakeUp() {
    if (!this.inView || document.hidden) return;
    if (!this.isAwake) {
      this.isAwake = true;
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.renderLoop);
    }
  }

  private renderLoop = (time: number) => {
    if (!this.isAwake) return;

    const hasMovement = this.updatePhysics();
    this.draw(false);

    if (hasMovement && this.inView && !document.hidden) {
      this.rafId = requestAnimationFrame(this.renderLoop);
    } else {
      this.isAwake = false;
      this.rafId = undefined;
    }
  };

  /**
   * Discrete 2D wave propagation step
   */
  private updatePhysics(): boolean {
    const { cols, rows, damping, buffer1, buffer2 } = this;
    if (!buffer1 || !buffer2) return false;

    let totalEnergy = 0;

    for (let y = 1; y < rows - 1; y++) {
      const rowOffset = y * cols;
      for (let x = 1; x < cols - 1; x++) {
        const idx = rowOffset + x;

        // Wave equation
        let val = (
          buffer1[idx - 1] +
          buffer1[idx + 1] +
          buffer1[idx - cols] +
          buffer1[idx + cols]
        ) * 0.5 - buffer2[idx];

        val *= damping;

        // Clamp to prevent numerical oscillation
        if (val > 8) val = 8;
        else if (val < -8) val = -8;

        buffer2[idx] = val;
        totalEnergy += Math.abs(val);
      }
    }

    // Swap buffers
    const temp = this.buffer1;
    this.buffer1 = this.buffer2;
    this.buffer2 = temp;

    // Wake state continues while wave energy is above threshold
    return totalEnergy > 0.04;
  }

  private draw(isCalmOnly = false) {
    const { ctx, width, height, offscreenCanvas, cols, rows, cellW, cellH, buffer1 } = this;
    if (!ctx || width === 0 || height === 0) return;

    ctx.clearRect(0, 0, width, height);

    // Draw base resting text matrix from cache
    if (offscreenCanvas) {
      ctx.drawImage(offscreenCanvas, 0, 0);
    }

    if (isCalmOnly || !buffer1) return;

    const colors = this.getEffectiveColors();
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textBaseline = 'top';

    const textLen = this.text.length;
    const charsLen = this.chars.length;
    const refractionScale = 14;

    // Render disturbed characters on top
    for (let y = 1; y < rows - 1; y++) {
      const py = y * cellH;
      if (py > height + cellH) break;
      const rowOffset = y * cols;

      for (let x = 1; x < cols - 1; x++) {
        const px = x * cellW;
        if (px > width + cellW) break;

        const idx = rowOffset + x;
        const h = buffer1[idx];
        const absH = Math.abs(h);

        // Threshold for disturbance rendering
        if (absH < 0.02) continue;

        // Compute surface normal gradient (slopes)
        const slopeX = (buffer1[idx + 1] - buffer1[idx - 1]) * 0.5;
        const slopeY = (buffer1[idx + cols] - buffer1[idx - cols]) * 0.5;

        // Optical refraction displacement
        const dispX = Math.max(-10, Math.min(10, slopeX * refractionScale));
        const dispY = Math.max(-10, Math.min(10, slopeY * refractionScale));

        // Glyph selection: modulate to ASCII palette when ripple is strong
        let ch: string;
        if (absH > 0.25) {
          const charIdx = Math.min(charsLen - 1, Math.floor(absH * 3.5));
          ch = this.chars[charIdx] || this.chars[charsLen - 1];
        } else {
          ch = this.text[(y * cols + x) % textLen];
        }

        // Color & alpha modulation
        const intensity = Math.min(1, absH * 0.85);
        if (h > 0) {
          // Wave crest (Emerald shimmer)
          ctx.fillStyle = colors.ripple;
          ctx.globalAlpha = Math.min(1, 0.4 + intensity * 0.6);
        } else {
          // Wave trough (Cyan depth)
          ctx.fillStyle = colors.trough;
          ctx.globalAlpha = Math.min(1, 0.35 + intensity * 0.5);
        }

        ctx.fillText(ch, px + dispX, py + dispY);
      }
    }

    ctx.globalAlpha = 1.0;
  }
}
