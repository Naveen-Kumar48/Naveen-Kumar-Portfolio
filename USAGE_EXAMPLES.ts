// ═══════════════════════════════════════════════════════════════
// COOKIE CONSENT SERVICE - USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════

import { Component, OnInit, inject } from '@angular/core';
import { CookieConsentService } from './services/cookie-consent.service';
import { ScriptLoaderService } from './services/script-loader.service';

// ───────────────────────────────────────────────────────────────
// EXAMPLE 1: Check if user has given consent
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-analytics-component',
  template: `
    @if (hasConsent) {
      <div>Analytics tracking is active</div>
    } @else {
      <div>Analytics tracking is disabled</div>
    }
  `
})
export class AnalyticsComponent implements OnInit {
  private consentService = inject(CookieConsentService);
  hasConsent = false;

  ngOnInit() {
    // Simple boolean check
    this.hasConsent = this.consentService.hasConsent();
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 2: React to consent changes
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-reactive-component',
  template: `<div>{{ consentStatus }}</div>`
})
export class ReactiveComponent implements OnInit {
  private consentService = inject(CookieConsentService);
  consentStatus = 'Checking...';

  ngOnInit() {
    // Subscribe to consent state changes
    this.consentService.getConsentState().subscribe(state => {
      if (state?.hasConsent) {
        this.consentStatus = 'User has consented';
        this.initializeAnalytics();
      } else {
        this.consentStatus = 'Awaiting consent';
      }
    });
  }

  private initializeAnalytics() {
    // Your analytics initialization code
    console.log('Analytics initialized');
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 3: Check specific cookie category
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-category-check',
  template: `<div>{{ message }}</div>`
})
export class CategoryCheckComponent implements OnInit {
  private consentService = inject(CookieConsentService);
  message = '';

  ngOnInit() {
    const preferences = this.consentService.getPreferences();

    if (preferences.analytics) {
      this.message = 'Analytics cookies enabled';
      this.loadAnalytics();
    }

    if (preferences.performance) {
      this.message += ' | Performance cookies enabled';
      this.enableCaching();
    }

    if (preferences.marketing) {
      this.message += ' | Marketing cookies enabled';
      this.loadMarketingPixels();
    }
  }

  private loadAnalytics() {
    // Load analytics scripts
  }

  private enableCaching() {
    // Enable performance features
  }

  private loadMarketingPixels() {
    // Load marketing scripts
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 4: Conditional feature loading
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-feature-loader',
  template: `<div>Features loaded based on consent</div>`
})
export class FeatureLoaderComponent implements OnInit {
  private consentService = inject(CookieConsentService);
  private scriptLoader = inject(ScriptLoaderService);

  ngOnInit() {
    this.consentService.getConsentState().subscribe(state => {
      if (!state?.hasConsent) return;

      const prefs = state.preferences;

      // Load features based on consent
      if (prefs.analytics) {
        this.scriptLoader.loadGoogleAnalytics('G-RLJGE4BXLC');
        this.scriptLoader.loadMicrosoftClarity('w0n75xme9h');
      }

      if (prefs.performance) {
        this.enableServiceWorker();
        this.enableLocalStorageCache();
      }

      if (prefs.marketing) {
        this.loadFacebookPixel();
        this.loadLinkedInInsight();
      }
    });
  }

  private enableServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }

  private enableLocalStorageCache() {
    localStorage.setItem('cache_enabled', 'true');
  }

  private loadFacebookPixel() {
    // Facebook Pixel implementation
  }

  private loadLinkedInInsight() {
    // LinkedIn Insight Tag implementation
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 5: Custom analytics service integration
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-custom-analytics',
  template: `<div>Custom analytics integration</div>`
})
export class CustomAnalyticsComponent implements OnInit {
  private consentService = inject(CookieConsentService);

  ngOnInit() {
    this.consentService.getConsentState().subscribe(state => {
      if (state?.preferences.analytics) {
        this.initCustomAnalytics();
      }
    });
  }

  private initCustomAnalytics() {
    // Example: Mixpanel
    const script = document.createElement('script');
    script.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
    script.onload = () => {
      (window as any).mixpanel.init('YOUR_TOKEN');
    };
    document.head.appendChild(script);

    // Example: Hotjar
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 6: Programmatically open preferences modal
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-privacy-page',
  template: `
    <button (click)="openCookieSettings()">
      Manage Cookie Preferences
    </button>
  `
})
export class PrivacyPageComponent {
  openCookieSettings() {
    // Dispatch custom event to open modal
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 7: Reset consent (for testing or user request)
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-admin-panel',
  template: `
    <button (click)="resetConsent()">
      Reset Cookie Consent
    </button>
  `
})
export class AdminPanelComponent {
  private consentService = inject(CookieConsentService);

  resetConsent() {
    // Clear all consent data
    this.consentService.resetConsent();
    
    // Reload page to show banner again
    window.location.reload();
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 8: Guard route based on consent
// ───────────────────────────────────────────────────────────────

import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const analyticsGuard = () => {
  const consentService = inject(CookieConsentService);
  const router = inject(Router);

  const preferences = consentService.getPreferences();

  if (!preferences.analytics) {
    // Redirect to consent page if analytics not accepted
    return router.createUrlTree(['/consent-required']);
  }

  return true;
};

// Usage in routes:
// {
//   path: 'analytics-dashboard',
//   component: AnalyticsDashboardComponent,
//   canActivate: [analyticsGuard]
// }

// ───────────────────────────────────────────────────────────────
// EXAMPLE 9: Track consent events
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-consent-tracker',
  template: `<div>Tracking consent events</div>`
})
export class ConsentTrackerComponent implements OnInit {
  private consentService = inject(CookieConsentService);

  ngOnInit() {
    this.consentService.getConsentState().subscribe(state => {
      if (state?.hasConsent) {
        // Log consent event (only if analytics enabled)
        if (state.preferences.analytics) {
          this.trackConsentEvent(state);
        }
      }
    });
  }

  private trackConsentEvent(state: any) {
    // Send to analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'cookie_consent', {
        analytics: state.preferences.analytics,
        performance: state.preferences.performance,
        marketing: state.preferences.marketing,
        timestamp: state.timestamp
      });
    }
  }
}

// ───────────────────────────────────────────────────────────────
// EXAMPLE 10: Conditional localStorage usage
// ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-storage-manager',
  template: `<div>Storage management</div>`
})
export class StorageManagerComponent {
  private consentService = inject(CookieConsentService);

  saveUserPreference(key: string, value: any) {
    const preferences = this.consentService.getPreferences();

    if (preferences.performance) {
      // Performance cookies accepted - use localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      // Use sessionStorage (cleared on browser close)
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getUserPreference(key: string): any {
    const preferences = this.consentService.getPreferences();

    if (preferences.performance) {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } else {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// BEST PRACTICES
// ═══════════════════════════════════════════════════════════════

/*
1. ALWAYS check consent before loading third-party scripts
2. Use getConsentState() observable for reactive updates
3. Use hasConsent() for simple boolean checks
4. Use getPreferences() for category-specific checks
5. Never load analytics scripts in index.html
6. Always provide a way to change preferences
7. Respect user choices across sessions
8. Log consent events only if analytics enabled
9. Use sessionStorage for non-consented data
10. Test in incognito mode regularly
*/

// ═══════════════════════════════════════════════════════════════
// COMMON PATTERNS
// ═══════════════════════════════════════════════════════════════

// Pattern 1: Wait for consent before initializing
class WaitForConsentPattern {
  private consentService = inject(CookieConsentService);

  ngOnInit() {
    this.consentService.getConsentState().subscribe(state => {
      if (state?.hasConsent && state.preferences.analytics) {
        this.initialize();
      }
    });
  }

  private initialize() {
    // Your initialization code
  }
}

// Pattern 2: Conditional feature flag
class FeatureFlagPattern {
  private consentService = inject(CookieConsentService);

  get canUseAnalytics(): boolean {
    return this.consentService.getPreferences().analytics;
  }

  trackEvent(name: string, data: any) {
    if (this.canUseAnalytics) {
      // Track event
    }
  }
}

// Pattern 3: Lazy load based on consent
class LazyLoadPattern {
  private consentService = inject(CookieConsentService);

  async loadFeature() {
    const prefs = this.consentService.getPreferences();

    if (prefs.analytics) {
      const module = await import('./analytics.module');
      module.initialize();
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// END OF EXAMPLES
// ═══════════════════════════════════════════════════════════════
