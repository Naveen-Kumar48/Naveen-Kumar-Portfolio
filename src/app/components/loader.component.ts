import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="isVisible()" class="loader-overlay">
      <div class="container">
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: -1; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 0; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: -1; --y: 1; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: -1; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 0; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 0; --y: 1; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: -1; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 0; --z: 1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: -1; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 0; --ry: 1; --fy: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --fz: 0"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --fz: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --rx: 1; --fx: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --rx: 1; --fx: 1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --ry: 1; --fy: -1"></div>
        <div class="cube" style="--x: 1; --y: 1; --z: 1; --ry: 1; --fy: 1"></div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes hue-rotate {
      to { filter: hue-rotate(360deg); }
    }

    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-primary, #09090b);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      perspective: 1000px;
    }

    .container {
      --w: 35px;
      --g: 5px;
      --t: calc(var(--w) + var(--g));
      width: var(--w);
      aspect-ratio: 1;
      perspective: 120px;
      transform-style: preserve-3d;
      animation: hue-rotate 10s linear infinite;
    }

    .cube {
      --fz: 0;
      --rx: 0;
      --fx: 0;
      --ry: 0;
      --fy: 0;
      position: absolute;
      background: rgba(52, 211, 153, 0.4); /* Emerald-400 with opacity */
      border: 1px solid #10b981; /* Emerald-500 border */
      width: var(--w);
      aspect-ratio: 1;
      bottom: calc(var(--w) * -0.5);
      right: calc(var(--w) * -0.5);
      animation: rotate 15s linear infinite;
      transition: 5s;
      --a: translateZ(calc(0.5 * var(--w)))
        translateX(calc(var(--x) * var(--t) - 0.5 * var(--fy) * var(--w)))
        translateY(calc(var(--y) * var(--t) - 0.5 * var(--fx) * var(--w)))
        translateZ(
          calc(
            var(--z) * var(--t) - 0.5 * var(--ry) * var(--w) - 0.5 * var(--rx) *
              var(--w) - var(--fz) * var(--w)
          )
        )
        rotateX(calc(90deg * var(--rx))) rotateY(calc(90deg * var(--ry)));
      --p: translateX(calc(-0.5 * var(--w))) translateY(calc(-0.5 * var(--w)))
        translateZ(calc(-0.5 * var(--w)));
    }

    @keyframes rotate {
      0% { transform: var(--p) rotateZ(0deg) rotateY(0deg) rotateX(0deg) var(--a); }
      100% { transform: var(--p) rotateZ(360deg) rotateY(720deg) rotateX(360deg) var(--a); }
    }
  `]
})
export class LoaderComponent implements OnInit {
    private platformId = inject(PLATFORM_ID);
    isVisible = signal(true);

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.isVisible.set(false);
            }, 3000);
        }
    }
}
