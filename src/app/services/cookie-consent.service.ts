import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookiePreferences, ConsentState, DEFAULT_PREFERENCES } from '../models/cookie-consent.models';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'cookie_consent';
  private readonly CONSENT_VERSION = '1.0';

  private consentState$ = new BehaviorSubject<ConsentState | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadConsent();
    }
  }

  getConsentState(): Observable<ConsentState | null> {
    return this.consentState$.asObservable();
  }

  hasConsent(): boolean {
    return this.consentState$.value?.hasConsent ?? false;
  }

  getPreferences(): CookiePreferences {
    return this.consentState$.value?.preferences ?? DEFAULT_PREFERENCES;
  }

  acceptAll(): void {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: true,
      performance: true,
      marketing: true
    };
    this.saveConsent(preferences);
  }

  rejectNonEssential(): void {
    this.saveConsent(DEFAULT_PREFERENCES);
  }

  savePreferences(preferences: CookiePreferences): void {
    // Force analytics to always be true
    this.saveConsent({ ...preferences, essential: true, analytics: true });
  }

  private saveConsent(preferences: CookiePreferences): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Force analytics to always be true
    const forcedPreferences = { ...preferences, analytics: true };

    const state: ConsentState = {
      hasConsent: true,
      preferences: forcedPreferences,
      timestamp: Date.now()
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...state, version: this.CONSENT_VERSION }));
    this.consentState$.next(state);
  }

  private loadConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === this.CONSENT_VERSION) {
          this.consentState$.next({
            hasConsent: parsed.hasConsent,
            preferences: parsed.preferences,
            timestamp: parsed.timestamp
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load cookie consent');
    }
  }

  resetConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(this.STORAGE_KEY);
    this.consentState$.next(null);
  }
}
