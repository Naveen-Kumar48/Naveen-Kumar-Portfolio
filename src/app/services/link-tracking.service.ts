import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface ExternalLink {
  url: string;
  text: string;
  category: string;
  timestamp: number;
}

interface InternalLink {
  from: string;
  to: string;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class LinkTrackingService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private externalLinks: ExternalLink[] = [];
  private internalLinks: InternalLink[] = [];
  private currentPage: string = '';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTracking();
    }
  }

  private initializeTracking() {
    // Track page navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPage = event.urlAfterRedirects || '';
      });

    // Track all external links on page load and mutations
    this.trackExternalLinks();
    this.setupMutationObserver();
  }

  private trackExternalLinks() {
    if (!isPlatformBrowser(this.platformId)) return;

    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach((link: any) => {
      const href = link.getAttribute('href');
      const text = link.textContent?.trim() || '';

      if (href && !href.includes(window.location.hostname)) {
        link.addEventListener('click', (e: any) => {
          this.recordExternalLinkClick({
            url: href,
            text: text,
            category: this.categorizeLink(href),
            timestamp: Date.now()
          });
        });
      } else if (href && href.includes(window.location.hostname)) {
        link.addEventListener('click', (e: any) => {
          this.recordInternalLinkClick({
            from: this.currentPage,
            to: href,
            text: text,
            timestamp: Date.now()
          });
        });
      }
    });
  }

  private setupMutationObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new MutationObserver(() => {
      this.trackExternalLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private categorizeLink(url: string): string {
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('email') || url.startsWith('mailto:')) return 'Email';
    return 'External';
  }

  private recordExternalLinkClick(link: ExternalLink) {
    this.externalLinks.push(link);
    this.sendAnalytics('external_link_click', {
      url: link.url,
      text: link.text,
      category: link.category,
      page: this.currentPage
    });
  }

  private recordInternalLinkClick(link: InternalLink) {
    this.internalLinks.push(link);
    this.sendAnalytics('internal_link_click', {
      from: link.from,
      to: link.to,
      text: link.text
    });
  }

  private sendAnalytics(eventName: string, eventData: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    // Send to Google Analytics if available
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }

    // Send to custom analytics endpoint if needed
    this.sendToAnalyticsEndpoint(eventName, eventData);
  }

  private sendToAnalyticsEndpoint(eventName: string, eventData: any) {
    // This would send to your backend analytics service
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({eventName, eventData}) })
  }

  // Get link report
  getLinkReport() {
    return {
      externalLinks: this.externalLinks,
      internalLinks: this.internalLinks,
      totalExternalClicks: this.externalLinks.length,
      totalInternalClicks: this.internalLinks.length,
      externalLinksByCategory: this.groupByCategory(),
      topReferralLinks: this.getTopReferralLinks()
    };
  }

  private groupByCategory(): Record<string, number> {
    const grouped: Record<string, number> = {};
    this.externalLinks.forEach(link => {
      grouped[link.category] = (grouped[link.category] || 0) + 1;
    });
    return grouped;
  }

  private getTopReferralLinks() {
    const urlCounts: Record<string, number> = {};
    this.externalLinks.forEach(link => {
      urlCounts[link.url] = (urlCounts[link.url] || 0) + 1;
    });
    return Object.entries(urlCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }
}
