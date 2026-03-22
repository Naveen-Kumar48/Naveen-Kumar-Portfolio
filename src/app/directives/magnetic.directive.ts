import { Directive, ElementRef, Input, inject, PLATFORM_ID, OnInit, OnDestroy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Directive({
    selector: '[appMagnetic]',
    standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
    @Input() magneticAmount = 0.45;
    @Input() magneticDuration = 1.2;

    private el = inject(ElementRef);
    private platformId = inject(PLATFORM_ID);
    private ngZone = inject(NgZone);

    private xSetter: any;
    private ySetter: any;
    private mouseMoveHandler?: (e: MouseEvent) => void;
    private mouseLeaveHandler?: () => void;

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Disable magnetic influence on touch-only protocols
            const isTouch = window.matchMedia('(hover: none)').matches;
            if (isTouch) return;

            this.xSetter = gsap.quickSetter(this.el.nativeElement, 'x', 'px');
            this.ySetter = gsap.quickSetter(this.el.nativeElement, 'y', 'px');

            this.ngZone.runOutsideAngular(() => {
                this.mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e);
                this.mouseLeaveHandler = () => this.onMouseLeave();

                this.el.nativeElement.addEventListener('mousemove', this.mouseMoveHandler);
                this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveHandler);
            });
        }
    }

    private onMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = this.el.nativeElement.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * this.magneticAmount;
        const y = (clientY - (top + height / 2)) * this.magneticAmount;

        gsap.to(this.el.nativeElement, {
            x: x,
            y: y,
            duration: this.magneticDuration,
            ease: 'expo.out',
            overwrite: 'auto'
        });
    }

    private onMouseLeave() {
        gsap.to(this.el.nativeElement, {
            x: 0,
            y: 0,
            duration: this.magneticDuration * 1.5,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto'
        });
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mouseMoveHandler) {
                this.el.nativeElement.removeEventListener('mousemove', this.mouseMoveHandler);
            }
            if (this.mouseLeaveHandler) {
                this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveHandler);
            }
        }
    }
}
