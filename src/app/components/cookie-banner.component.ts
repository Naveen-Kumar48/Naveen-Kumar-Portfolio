import { Component, OnInit, inject, PLATFORM_ID, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';
import { ScriptLoaderService } from '../services/script-loader.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showBanner()) {
      <div #banner class="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 md:p-6 pointer-events-none will-change-transform" style="transform: translateZ(0);">
        <div class="max-w-6xl mx-auto px-2 sm:px-4 pointer-events-auto">
          <div class="liquid-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-[var(--glass-border)] transition-colors duration-500 will-change-transform" style="transform: translateZ(0);">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <!-- Icon + Content -->
              <div class="flex-1 flex items-start gap-3 md:gap-4">
                <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1 sm:mb-2">Cookie Preferences</h3>
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    <button (click)="openPreferences()" class="text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors ml-1 font-medium">
                      Manage preferences
                    </button>
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full md:w-auto">
                <button 
                  (click)="rejectAll()"
                  class="px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 border border-[var(--glass-border)] text-[var(--text-primary)] font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                  Reject
                </button>
                <button 
                  (click)="acceptAll()"
                  class="px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class CookieBannerComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private consentService = inject(CookieConsentService);
  private scriptLoader = inject(ScriptLoaderService);
  
  showBanner = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Always load analytics immediately
      this.loadAnalyticsScripts();

      this.consentService.getConsentState().subscribe(state => {
        this.showBanner.set(!state?.hasConsent);
      });

      setTimeout(() => this.animateBanner(), 1500);
    }
  }

  acceptAll() {
    this.consentService.acceptAll();
    this.hideBanner();
  }

  rejectAll() {
    this.consentService.rejectNonEssential();
    this.hideBanner();
  }

  openPreferences() {
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  }

  private animateBanner() {
    if (!this.showBanner()) return;
    
    gsap.fromTo('.liquid-glass',
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out', 
        delay: 0.3,
        clearProps: 'transform'
      }
    );
  }

  private hideBanner() {
    gsap.to('.liquid-glass', {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        this.showBanner.set(false);
        // Force reflow to ensure content settles properly
        void document.body.offsetHeight;
        
        // Restore focus to main content for accessibility
        setTimeout(() => {
          const hero = document.querySelector('app-hero');
          if (hero instanceof HTMLElement) {
            hero.focus();
          }
        }, 100);
      }
    });
  }

  private loadAnalyticsScripts() {
    // Always load analytics regardless of consent
    this.scriptLoader.loadGoogleAnalytics('G-RLJGE4BXLC');
    this.scriptLoader.loadMicrosoftClarity('w0n75xme9h');
  }
}
