import { Component, OnInit, inject, PLATFORM_ID, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';
import { ScriptLoaderService } from '../services/script-loader.service';
import { CookiePreferences } from '../models/cookie-consent.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cookie-preferences-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4" (click)="close()">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div 
          class="relative liquid-glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
          (click)="$event.stopPropagation()">
          
          <!-- Header -->
          <div class="sticky top-0 liquid-glass border-b border-white/10 p-6 rounded-t-3xl z-10">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-white">Cookie Preferences</h2>
              <button 
                (click)="close()"
                class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-zinc-400 mt-2">Manage your cookie preferences and control how we use data.</p>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Essential -->
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-lg font-bold text-white">Essential Cookies</h3>
                    <span class="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">Required</span>
                  </div>
                  <p class="text-sm text-zinc-400">Required for basic site functionality, security, and user authentication.</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="w-12 h-7 rounded-full bg-emerald-500 flex items-center px-1 cursor-not-allowed opacity-50">
                    <div class="w-5 h-5 rounded-full bg-white shadow-lg translate-x-5"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics -->
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-lg font-bold text-white">Analytics Cookies</h3>
                    <span class="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">Required</span>
                  </div>
                  <p class="text-sm text-zinc-400 mb-3">Help us understand how visitors interact with our website (Google Analytics, Microsoft Clarity).</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 text-xs bg-white/5 text-zinc-400 rounded-md">Google Analytics</span>
                    <span class="px-2 py-1 text-xs bg-white/5 text-zinc-400 rounded-md">Microsoft Clarity</span>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="w-12 h-7 rounded-full bg-emerald-500 flex items-center px-1 cursor-not-allowed opacity-50">
                    <div class="w-5 h-5 rounded-full bg-white shadow-lg translate-x-5"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Performance -->
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-2">Performance Cookies</h3>
                  <p class="text-sm text-zinc-400">Optimize loading times and cache preferences for a faster experience.</p>
                </div>
                <div class="flex-shrink-0">
                  <button 
                    (click)="togglePreference('performance')"
                    [class]="preferences().performance ? 'bg-emerald-500' : 'bg-white/10'"
                    class="w-12 h-7 rounded-full flex items-center px-1 transition-all duration-300 hover:scale-105">
                    <div 
                      [class]="preferences().performance ? 'translate-x-5' : 'translate-x-0'"
                      class="w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300">
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Marketing -->
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-2">Marketing Cookies</h3>
                  <p class="text-sm text-zinc-400">Track conversions and deliver personalized content (currently not in use).</p>
                </div>
                <div class="flex-shrink-0">
                  <button 
                    (click)="togglePreference('marketing')"
                    [class]="preferences().marketing ? 'bg-emerald-500' : 'bg-white/10'"
                    class="w-12 h-7 rounded-full flex items-center px-1 transition-all duration-300 hover:scale-105">
                    <div 
                      [class]="preferences().marketing ? 'translate-x-5' : 'translate-x-0'"
                      class="w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300">
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="sticky bottom-0 liquid-glass border-t border-white/10 p-6 rounded-b-3xl flex gap-3">
            <button 
              (click)="close()"
              class="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300">
              Cancel
            </button>
            <button 
              (click)="savePreferences()"
              class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-500/25">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class CookiePreferencesModalComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private consentService = inject(CookieConsentService);
  private scriptLoader = inject(ScriptLoaderService);

  isOpen = signal(false);
  preferences = signal<CookiePreferences>({
    essential: true,
    analytics: false,
    performance: false,
    marketing: false
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('openCookiePreferences', () => this.open());
      const currentPrefs = this.consentService.getPreferences();
      // Always show analytics as ON (even though it's forced)
      this.preferences.set(currentPrefs);
    }
  }

  open() {
    this.preferences.set(this.consentService.getPreferences());
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
    
    gsap.fromTo('.liquid-glass',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }

  close() {
    gsap.to('.liquid-glass', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.isOpen.set(false);
        document.body.style.overflow = '';
      }
    });
  }

  togglePreference(key: keyof CookiePreferences) {
    if (key === 'essential') return;
    this.preferences.update(prefs => ({ ...prefs, [key]: !prefs[key] }));
  }

  savePreferences() {
    this.consentService.savePreferences(this.preferences());
    
    // Analytics is always loaded, so no need to conditionally load
    // Just close the modal
    this.close();
  }
}
