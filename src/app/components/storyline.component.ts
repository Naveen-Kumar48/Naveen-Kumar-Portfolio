import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
    selector: 'app-storyline',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="absolute inset-0 pointer-events-none z-0 overflow-visible">
      <svg width="100%" height="100%" class="opacity-15">
        <path #path
              id="scroll-path"
              d="M 50 0 Q 50 500 100 1000 T 50 2000 T 100 3000 T 50 4000"
              fill="transparent"
              stroke="#10b981"
              stroke-width="1.5"
              stroke-dasharray="8,8" />
      </svg>
    </div>
  `,
    styles: [`
    :host { display: block; position: absolute; inset: 0; }
  `]
})
export class StorylineComponent implements OnInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);
    private scrollTriggerInstance: ScrollTrigger | null = null;

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.initPathDrawing();
        }
    }

    ngOnDestroy() {
        if (this.scrollTriggerInstance) {
            this.scrollTriggerInstance.kill();
        }
    }

    private initPathDrawing() {
        const path = document.querySelector('#scroll-path') as SVGPathElement;
        if (!path) return;

        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        this.scrollTriggerInstance = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            animation: gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none'
            })
        });
    }
}
