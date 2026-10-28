import { Component, OnInit, OnDestroy, ElementRef, inject, PLATFORM_ID, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';
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
        <div #backdrop class="absolute inset-0 bg-black/60 backdrop-blur-sm modal-backdrop-enter"></div>

        <!-- Modal -->
        <div 
          #panel
          role="dialog"
          aria-modal="true"
          aria-label="Cookie Preferences"
          data-lenis-prevent
          class="relative liquid-glass rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--glass-border)] transition-colors duration-500 modal-enter" 
          (click)="$event.stopPropagation()">
          
          <!-- Header -->
          <div class="sticky top-0 liquid-glass border-b border-[var(--glass-border)] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl z-10 transition-colors duration-500">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">Cookie Preferences</h2>
              <button 
                (click)="close()"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Close">
                <svg class="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p class="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">Manage your cookie preferences and control how we use data.</p>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Essential -->
            <div class="p-4 sm:p-5 rounded-lg sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] transition-colors duration-500">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">Essential Cookies</h3>
                    <span class="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-500 rounded-md border border-emerald-500/30">Required</span>
                  </div>
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)]">Required for basic site functionality, security, and user authentication.</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="w-12 h-7 rounded-full bg-emerald-500 flex items-center px-1 cursor-not-allowed opacity-50 flex-shrink-0">
                    <div class="w-5 h-5 rounded-full bg-white shadow-lg translate-x-5"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics -->
            <div class="p-4 sm:p-5 rounded-lg sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] transition-colors duration-500">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">Analytics Cookies</h3>
                    <span class="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-500 rounded-md border border-emerald-500/30">Required</span>
                  </div>
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)] mb-3">Help us understand how visitors interact with our website (Google Analytics, Microsoft Clarity).</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 text-xs bg-[var(--glass-bg)] text-[var(--text-secondary)] rounded-md border border-[var(--glass-border)]">Google Analytics</span>
                    <span class="px-2 py-1 text-xs bg-[var(--glass-bg)] text-[var(--text-secondary)] rounded-md border border-[var(--glass-border)]">Microsoft Clarity</span>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="w-12 h-7 rounded-full bg-emerald-500 flex items-center px-1 cursor-not-allowed opacity-50 flex-shrink-0">
                    <div class="w-5 h-5 rounded-full bg-white shadow-lg translate-x-5"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Performance -->
            <div class="p-4 sm:p-5 rounded-lg sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] hover:border-emerald-500/30 transition-colors duration-500">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="flex-1 min-w-0">
                  <h3 class="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">Performance Cookies</h3>
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)]">Optimize loading times and cache preferences for a faster experience.</p>
                </div>
                <div class="flex-shrink-0 mt-2 sm:mt-0">
                  <button 
                    (click)="togglePreference('performance')"
                    [class]="preferences().performance ? 'bg-emerald-500' : 'bg-[var(--bg-secondary)] border border-[var(--glass-border)]'"
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
            <div class="p-4 sm:p-5 rounded-lg sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] hover:border-emerald-500/30 transition-colors duration-500">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="flex-1 min-w-0">
                  <h3 class="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">Marketing Cookies</h3>
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)]">Track conversions and deliver personalized content (currently not in use).</p>
                </div>
                <div class="flex-shrink-0 mt-2 sm:mt-0">
                  <button 
                    (click)="togglePreference('marketing')"
                    [class]="preferences().marketing ? 'bg-emerald-500' : 'bg-[var(--bg-secondary)] border border-[var(--glass-border)]'"
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
          <div class="sticky bottom-0 liquid-glass border-t border-[var(--glass-border)] p-4 sm:p-6 rounded-b-2xl sm:rounded-b-3xl flex flex-col sm:flex-row gap-3 transition-colors duration-500">
            <button 
              (click)="close()"
              class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 border border-[var(--glass-border)] text-[var(--text-primary)] font-medium transition-all duration-300">
              Cancel
            </button>
            <button 
              (click)="savePreferences()"
              class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-500/25">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes backdropIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal-enter { animation: modalIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
    .modal-backdrop-enter { animation: backdropIn 0.3s ease-out backwards; }
  `]
})
export class CookiePreferencesModalComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private consentService = inject(CookieConsentService);

  private panel = viewChild<ElementRef<HTMLElement>>('panel');
  private backdrop = viewChild<ElementRef<HTMLElement>>('backdrop');

  isOpen = signal(false);
  preferences = signal<CookiePreferences>({
    essential: true,
    analytics: false,
    performance: false,
    marketing: false
  });
  private closing = false;

  private openHandler = () => this.open();
  private keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen()) this.close();
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('openCookiePreferences', this.openHandler);
      window.addEventListener('keydown', this.keyHandler);
      this.preferences.set(this.consentService.getPreferences());
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('openCookiePreferences', this.openHandler);
      window.removeEventListener('keydown', this.keyHandler);
      this.unlockScroll();
    }
  }

  open() {
    if (this.isOpen()) return;
    this.closing = false;
    this.preferences.set(this.consentService.getPreferences());
    this.isOpen.set(true);
    this.lockScroll();

    // Panel is rendered after the next change detection pass
    setTimeout(() => {
      const el = this.panel()?.nativeElement;
      if (el) {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    }, 50);
  }

  close() {
    if (this.closing) return;
    const panel = this.panel()?.nativeElement;
    const backdrop = this.backdrop()?.nativeElement;
    if (!panel) {
      this.finishClose();
      return;
    }
    this.closing = true;
    if (backdrop) gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(panel, {
      scale: 0.95,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => this.finishClose()
    });
  }

  private finishClose() {
    this.isOpen.set(false);
    this.closing = false;
    this.unlockScroll();
  }

  private lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();
  }

  private unlockScroll() {
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
  }

  togglePreference(key: keyof CookiePreferences) {
    if (key === 'essential' || key === 'analytics') return;
    this.preferences.update(prefs => ({ ...prefs, [key]: !prefs[key] }));
  }

  savePreferences() {
    this.consentService.savePreferences(this.preferences());
    this.close();
  }
}
