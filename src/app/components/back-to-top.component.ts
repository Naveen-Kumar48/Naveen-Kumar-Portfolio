import { Component, HostListener, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    template: `
    <button 
      #btn
      (click)="scrollToTop()"
      class="fixed bottom-8 right-8 z-40 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group hidden md:flex opacity-0 -translate-y-4"
      aria-label="Back to Top">
      <mat-icon class="group-hover:-translate-y-1 transition-transform">arrow_upward</mat-icon>
      
      <!-- Pulsing Ring -->
      <div class="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-20 pointer-events-none"></div>
    </button>
  `
})
export class BackToTopComponent {
    @ViewChild('btn') btnRef!: ElementRef;

    private platformId = inject(PLATFORM_ID);
    private visible = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollPos = window.scrollY;
            const shouldBeVisible = scrollPos > 400;

            if (shouldBeVisible !== this.visible) {
                this.visible = shouldBeVisible;
                this.toggleVisibility();
            }
        }
    }

    private toggleVisibility() {
        if (this.visible) {
            gsap.to(this.btnRef.nativeElement, {
                opacity: 1,
                y: 0,
                display: 'flex',
                duration: 0.4,
                ease: 'power3.out'
            });
        } else {
            gsap.to(this.btnRef.nativeElement, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    if (!this.visible) {
                        this.btnRef.nativeElement.style.display = 'none';
                    }
                }
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Smooth GSAP jump cut if you wanted it even more "agentic" 
        // but standard smooth scroll is fine unless they want fancy easing
    }
}
