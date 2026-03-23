import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="isVisible()" id="loader-overlay" class="loader-overlay transition-colors duration-1000">
      <div class="container animate-reveal">
        <!-- Optimized Cube Matrix -->
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --rx: 1; --fx: -1"></div>
        <!-- Simplified for performance while maintaining visual complexity -->
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --fz: 1"></div>
      </div>
      
      <div class="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 animate-fade-in">
        <div class="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <div class="absolute inset-0 bg-emerald-500 animate-loading-bar"></div>
        </div>
        <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] italic">Initializing Extreme Tier</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #050505;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      perspective: 1200px;
    }

    .container {
      --w: 50px;
      --g: 10px;
      --t: calc(var(--w) + var(--g));
      width: var(--w);
      aspect-ratio: 1;
      transform-style: preserve-3d;
      animation: rotate-matrix 10s linear infinite;
    }

    .cube {
      --fz: 0; --rx: 0; --fx: 0; --ry: 0; --fy: 0;
      position: absolute;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.4);
      width: var(--w);
      aspect-ratio: 1;
      transform-style: preserve-3d;
      --p: translateX(-50%) translateY(-50%) translateZ(-50%);
      --a: translateZ(calc(0.5 * var(--w)))
           translateX(calc(var(--x) * var(--t)))
           translateY(calc(var(--y) * var(--t)))
           rotateX(calc(90deg * var(--rx))) 
           rotateY(calc(90deg * var(--ry)));
      transform: var(--p) var(--a);
    }

    @keyframes rotate-matrix {
      0% { transform: rotateY(0) rotateX(0); }
      100% { transform: rotateY(360deg) rotateX(720deg); }
    }

    .animate-loading-bar {
        animation: progress 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    }

    @keyframes progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
    }

    .animate-reveal {
        animation: zoom-in 0.6s cubic-bezier(0.2, 0, 0, 1) forwards;
    }

    @keyframes zoom-in {
        0% { transform: scale(0) rotateY(-180deg); opacity: 0; }
        100% { transform: scale(1) rotateY(0); opacity: 1; }
    }

    .animate-fade-in {
        animation: fade-in 0.8s ease-out 0.2s both;
    }

    @keyframes fade-in {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isVisible = signal(true);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const overlay = document.getElementById('loader-overlay');
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            scale: 1.05,
            duration: 0.5,
            ease: 'expo.inOut',
            onComplete: () => this.isVisible.set(false)
          });
        } else {
          this.isVisible.set(false);
        }
      }, 500);
    }
  }
}
