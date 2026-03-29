import { Component, OnInit, inject, PLATFORM_ID, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-settings-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showButton()) {
      <button
        (click)="openSettings()"
        class="fixed bottom-6 left-6 z-[9998] w-12 h-12 rounded-full liquid-glass shadow-2xl border border-white/10 flex items-center justify-center group hover:scale-110 transition-all duration-300 hover:shadow-emerald-500/25"
        aria-label="Cookie Settings"
        title="Cookie Settings">
        <svg class="w-6 h-6 text-zinc-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </button>
    }
  `
})
export class CookieSettingsButtonComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private consentService = inject(CookieConsentService);
  
  showButton = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.consentService.getConsentState().subscribe(state => {
        this.showButton.set(state?.hasConsent ?? false);
      });
    }
  }

  openSettings() {
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  }
}
