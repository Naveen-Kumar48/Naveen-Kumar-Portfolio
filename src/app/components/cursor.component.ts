import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursor class="fixed top-0 left-0 w-4 h-4 bg-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"></div>
    <div #follower class="fixed top-0 left-0 w-12 h-12 border border-emerald-500 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block transition-opacity duration-300"></div>
  `,
  styles: [`
    :host {
      pointer-events: none;
    }
  `]
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor') cursorRef!: ElementRef;
  @ViewChild('follower') followerRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private isHovering = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initial positioning off-screen
      gsap.set(this.cursorRef.nativeElement, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      gsap.set(this.followerRef.nativeElement, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      // Mouse move listener
      window.addEventListener('mousemove', this.onMouseMove);

      // Hover listeners
      this.addHoverListeners();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onMouseMove);
      this.removeHoverListeners();
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    // Super fast smooth tracking for the main dot
    gsap.to(this.cursorRef.nativeElement, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Elegant, delayed smooth tracking for the ring
    gsap.to(this.followerRef.nativeElement, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  private addHoverListeners() {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', this.onHoverEnter);
      el.addEventListener('mouseleave', this.onHoverLeave);
    });

    // Observe DOM changes to add listeners to new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
          newInteractiveElements.forEach(el => {
            el.removeEventListener('mouseenter', this.onHoverEnter); // Prevent duplicates
            el.removeEventListener('mouseleave', this.onHoverLeave);
            el.addEventListener('mouseenter', this.onHoverEnter);
            el.addEventListener('mouseleave', this.onHoverLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  private removeHoverListeners() {
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.removeEventListener('mouseenter', this.onHoverEnter);
      el.removeEventListener('mouseleave', this.onHoverLeave);
    });
  }

  private onHoverEnter = () => {
    this.isHovering = true;
    gsap.to(this.followerRef.nativeElement, {
      scale: 1.5,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'transparent',
      duration: 0.3
    });
    gsap.to(this.cursorRef.nativeElement, {
      scale: 0.5,
      duration: 0.3
    });
  };

  private onHoverLeave = () => {
    this.isHovering = false;
    gsap.to(this.followerRef.nativeElement, {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: '#10b981', // emerald-500
      duration: 0.3
    });
    gsap.to(this.cursorRef.nativeElement, {
      scale: 1,
      duration: 0.3
    });
  };
}
