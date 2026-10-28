import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Main Sensory Dot -->
    <div #cursor class="fixed top-0 left-0 w-3 h-3 bg-emerald-500 rounded-full pointer-events-none z-[9999] hidden md:block"></div>
    
    <!-- Outer Interactive Ring -->
    <div #follower class="fixed top-0 left-0 w-10 h-10 border border-emerald-500/50 rounded-full pointer-events-none z-[9998] hidden md:block transition-opacity duration-300"></div>

    <!-- Global Sensory Glow (radial gradient instead of blur filter: far cheaper to composite) -->
    <div #glow class="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000 hidden md:block" style="background: radial-gradient(closest-side, rgba(16,185,129,0.08), transparent);"></div>
  `,
  styles: [`
    :host { pointer-events: none; }
    div { will-change: transform; transform: translateZ(0); }
  `]
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor') cursorRef!: ElementRef;
  @ViewChild('follower') followerRef!: ElementRef;
  @ViewChild('glow') glowRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private mouseX = 0;
  private mouseY = 0;
  private velX = 0;
  private velY = 0;
  private observer?: MutationObserver;
  private hoverListeners = new Map<Element, { enter: () => void, leave: () => void }>();

  private xSetterCursor: any;
  private ySetterCursor: any;
  private xSetterFollower: any;
  private ySetterFollower: any;
  private rotateSetterFollower: any;
  private scaleXSetterFollower: any;
  private scaleYSetterFollower: any;
  private xSetterGlow: any;
  private ySetterGlow: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Disable custom cursor protocol on touch-only devices to prevent interaction shielding
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (isTouch) return;

      gsap.set([this.cursorRef.nativeElement, this.followerRef.nativeElement, this.glowRef.nativeElement], { xPercent: -50, yPercent: -50 });

      this.xSetterCursor = gsap.quickTo(this.cursorRef.nativeElement, "x", { duration: 0.1, ease: 'power2.out' });
      this.ySetterCursor = gsap.quickTo(this.cursorRef.nativeElement, "y", { duration: 0.1, ease: 'power2.out' });

      this.xSetterFollower = gsap.quickTo(this.followerRef.nativeElement, "x", { duration: 0.8, ease: 'power3.out' });
      this.ySetterFollower = gsap.quickTo(this.followerRef.nativeElement, "y", { duration: 0.8, ease: 'power3.out' });
      this.rotateSetterFollower = gsap.quickTo(this.followerRef.nativeElement, "rotation", { duration: 0.8, ease: 'power3.out' });
      this.scaleXSetterFollower = gsap.quickTo(this.followerRef.nativeElement, "scaleX", { duration: 0.8, ease: 'power3.out' });
      this.scaleYSetterFollower = gsap.quickTo(this.followerRef.nativeElement, "scaleY", { duration: 0.8, ease: 'power3.out' });

      this.xSetterGlow = gsap.quickTo(this.glowRef.nativeElement, "x", { duration: 1.5, ease: 'power2.out' });
      this.ySetterGlow = gsap.quickTo(this.glowRef.nativeElement, "y", { duration: 1.5, ease: 'power2.out' });

      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('mousemove', this.onMouseMove);
        this.initInteractionListeners();
      });

      // Reveal glow after initial load
      setTimeout(() => {
        gsap.to(this.glowRef.nativeElement, { opacity: 1, duration: 2 });
      }, 3000);
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    // Calculate velocity for "Stretchy" cursor effect
    this.velX = clientX - this.mouseX;
    this.velY = clientY - this.mouseY;
    this.mouseX = clientX;
    this.mouseY = clientY;

    // Main Dot tracking (Instant)
    this.xSetterCursor(clientX);
    this.ySetterCursor(clientY);

    // Ring tracking (Fluid inertia)
    const angle = Math.atan2(this.velY, this.velX) * 180 / Math.PI;
    const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    const scaleX = 1 + Math.min(speed / 500, 0.4);
    const scaleY = 1 - Math.min(speed / 500, 0.2);

    this.xSetterFollower(clientX);
    this.ySetterFollower(clientY);

    // Animate the rotation and scale properties that can't use x/y quickTo
    this.rotateSetterFollower(angle);
    this.scaleXSetterFollower(scaleX);
    this.scaleYSetterFollower(scaleY);

    // Global Glow (Subtle spatial presence)
    this.xSetterGlow(clientX);
    this.ySetterGlow(clientY);
  };

  private initInteractionListeners() {
    const attachListeners = (el: Element) => {
      if (this.hoverListeners.has(el)) return;

      const enter = () => this.handleHover(true, el);
      const leave = () => this.handleHover(false, el);

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);

      this.hoverListeners.set(el, { enter, leave });
    };

    document.querySelectorAll('a, button, [appMagnetic]').forEach(attachListeners);

    // Dynamic Observer for new elements
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches('a, button, [appMagnetic]')) attachListeners(node);
            node.querySelectorAll('a, button, [appMagnetic]').forEach(attachListeners);
          }
        });
        m.removedNodes.forEach((node) => {
          if (node instanceof Element) {
            this.removeListeners(node);
            node.querySelectorAll('a, button, [appMagnetic]').forEach(n => this.removeListeners(n));
          }
        });
      });
    });

    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  private removeListeners(el: Element) {
    const listeners = this.hoverListeners.get(el);
    if (listeners) {
      el.removeEventListener('mouseenter', listeners.enter);
      el.removeEventListener('mouseleave', listeners.leave);
      this.hoverListeners.delete(el);
    }
  }

  private handleHover(entering: boolean, el: Element) {
    const isMagnetic = el.hasAttribute('appMagnetic');

    if (entering) {
      gsap.to(this.followerRef.nativeElement, {
        scale: isMagnetic ? 2.5 : 1.8,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        duration: 0.4,
        ease: 'expo.out'
      });
      gsap.to(this.cursorRef.nativeElement, { scale: 0.5, duration: 0.4 });
    } else {
      gsap.to(this.followerRef.nativeElement, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
      gsap.to(this.cursorRef.nativeElement, { scale: 1, duration: 0.4 });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onMouseMove);
      if (this.observer) this.observer.disconnect();
      this.hoverListeners.forEach((listeners, el) => {
        el.removeEventListener('mouseenter', listeners.enter);
        el.removeEventListener('mouseleave', listeners.leave);
      });
    }
  }
}
