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
      <div #banner class="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none">
        <div class="max-w-6xl mx-auto pointer-events-auto">
          <div class="liquid-glass rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10">
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
              <!-- Icon + Content -->
              <div class="flex-1 flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg md:text-xl font-bold text-white mb-2">Cookie Preferences</h3>
                  <p class="text-sm text-zinc-400 leading-relaxed">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    <button (click)="openPreferences()" class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors ml-1">
                      Manage preferences
                    </button>
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  (click)="rejectAll()"
                  class="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                  Reject Non-Essential
                </button>
                <button 
                  (click)="acceptAll()"
                  class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25">
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
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }

  private hideBanner() {
    gsap.to('.liquid-glass', {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => this.showBanner.set(false)
    });
  }

  private loadAnalyticsScripts() {
    // Always load analytics regardless of consent
    this.scriptLoader.loadGoogleAnalytics('G-RLJGE4BXLC');
    this.scriptLoader.loadMicrosoftClarity('w0n75xme9h');
  }
}
