import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CursorComponent } from './components/cursor.component';
import { LoaderComponent } from './components/loader.component';
import { BackToTopComponent } from './components/back-to-top.component';
import { CookieBannerComponent } from './components/cookie-banner.component';
import { CookiePreferencesModalComponent } from './components/cookie-preferences-modal.component';
import { CookieSettingsButtonComponent } from './components/cookie-settings-button.component';
import { OnInit, inject, PLATFORM_ID, AfterViewInit, NgZone } from '@angular/core';
import { LinkTrackingService } from './services/link-tracking.service';
import { OffPageSeoService } from './services/off-page-seo.service';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    CommonModule,
    CursorComponent,
    LoaderComponent,
    BackToTopComponent,
    CookieBannerComponent, CookiePreferencesModalComponent, CookieSettingsButtonComponent
  ],
  template: `
    <app-loader />
    <app-cursor />
    <main class="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-x-hidden selection:bg-transparent">
      <router-outlet />
    </main>
    <app-back-to-top />
    <app-cookie-banner />
    <app-cookie-preferences-modal />
    <app-cookie-settings-button />
  `
})
export class App implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private linkTracking = inject(LinkTrackingService);
  private offPageSeo = inject(OffPageSeoService);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      // Initialize link tracking (tracks external and internal link clicks)
      this.linkTracking.getLinkReport(); // Activate tracking
      // Initialize off-page SEO (structured data, social signals)
      this.offPageSeo.addIdentityVerification();
    }
  }

  ngOnInit() {
    this.initOffPageSeo();
  }

  private initOffPageSeo() {
    // Initialize off-page SEO optimization
    this.offPageSeo.optimizeOffPageSeo({
      title: 'Naveen Kumar | Full Stack Developer — React, Next.js, MERN',
      description: 'Full Stack Developer in New Delhi, India. Expert in MERN Stack, React.js, Next.js, Node.js & AI integration.',
      url: 'https://naveenweb.site',
      image: 'https://naveenweb.site/og-image.png',
      author: 'Naveen Kumar'
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSmoothScroll();
      this.initSecurityLock();
    }
  }

  private initSmoothScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Enforce top-of-page entry protocol
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Force immediate reset
      window.scrollTo(0, 0);

      // Clear hash to prevent auto-jump
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }

      this.ngZone.runOutsideAngular(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp: 0.15,
          touchMultiplier: 2.5,
          infinite: false,
        });

        (window as any).lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      });
    }
  }

  private initSecurityLock() {
    if (isPlatformBrowser(this.platformId)) {
      // Shield against direct extraction
      window.addEventListener('contextmenu', (e) => e.preventDefault());
      window.addEventListener('copy', (e) => e.preventDefault());

      // Blacklist tactical shortcut keys
      window.addEventListener('keydown', (e) => {
        if (
          (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'i' || e.key === 'j')) ||
          (e.metaKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'i' || e.key === 'j')) ||
          e.key === 'F12'
        ) {
          e.preventDefault();
          return false;
        }
        return true;
      });
    }
  }

}
