import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private platformId = inject(PLATFORM_ID);
  private loadedScripts = new Set<string>();

  loadGoogleTagManager(containerId: string): void {
    if (!isPlatformBrowser(this.platformId) || this.loadedScripts.has('gtm')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js'
    });

    this.loadedScripts.add('gtm');
  }

  loadGoogleAnalytics(measurementId: string): void {
    if (!isPlatformBrowser(this.platformId) || this.loadedScripts.has('ga')) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    if (!(window as any).gtag) {
      (window as any).gtag = function(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      };
    }

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      (window as any).gtag('js', new Date());
      (window as any).gtag('config', measurementId);
    }

    this.loadedScripts.add('ga');
  }

  loadMicrosoftClarity(projectId: string): void {
    if (!isPlatformBrowser(this.platformId) || this.loadedScripts.has('clarity')) return;

    (function(c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId);

    this.loadedScripts.add('clarity');
  }

  removeAnalyticsScripts(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Remove GA scripts
    document.querySelectorAll('script[src*="googletagmanager"]').forEach(s => s.remove());
    delete (window as any).dataLayer;
    delete (window as any).gtag;

    // Remove Clarity
    document.querySelectorAll('script[src*="clarity.ms"]').forEach(s => s.remove());
    delete (window as any).clarity;

    this.loadedScripts.clear();
  }
}
