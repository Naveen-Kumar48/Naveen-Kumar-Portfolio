import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface OffPageSeoConfig {
  title: string;
  description: string;
  url: string;
  image: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class OffPageSeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);

  private socialProfiles = {
    github: 'https://github.com/Naveen-Kumar48',
    linkedin: 'https://www.linkedin.com/in/naveen-kumar-dev/',
    twitter: 'https://twitter.com/naveenkumar_dev',
    email: 'mailto:kumarnaveen897941@gmail.com'
  };

  /**
   * Optimize off-page SEO with structured data and social signals
   */
  optimizeOffPageSeo(config: OffPageSeoConfig) {
    // Add structured data for rich snippets
    this.addPersonStructuredData();
    this.addOrganizationStructuredData();
    this.addBreadcrumbStructuredData(config.breadcrumbs);
    
    // Add social meta tags
    this.addSocialSignals(config);
    
    // Add trust signals
    this.addTrustSignals();
    
    // Add author information
    this.addAuthorInformation(config.author);
  }

  /**
   * Add Person schema for rich snippets
   */
  private addPersonStructuredData() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://naveenweb.site/#person',
      'name': 'Naveen Kumar',
      'url': 'https://naveenweb.site',
      'image': 'https://naveenweb.site/og-image.png',
      'jobTitle': 'Full Stack Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Freelance',
        'url': 'https://naveenweb.site'
      },
      'sameAs': [
        'https://github.com/Naveen-Kumar48',
        'https://www.linkedin.com/in/naveen-kumar-dev/',
        'https://twitter.com/naveenkumar_dev'
      ],
      'email': 'kumarnaveen897941@gmail.com',
      'telephone': '+918979413404',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'New Delhi',
        'addressRegion': 'DL',
        'addressCountry': 'IN'
      },
      'knowsAbout': [
        'Full Stack Development',
        'React.js',
        'Node.js',
        'MERN Stack',
        'Next.js',
        'AI Integration',
        'Web Development'
      ]
    };

    this.addJsonLd(schema);
  }

  /**
   * Add Organization schema
   */
  private addOrganizationStructuredData() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Naveen Kumar - Full Stack Developer',
      'url': 'https://naveenweb.site',
      'logo': 'https://naveenweb.site/logo.png',
      'description': 'Professional Full Stack Developer specializing in MERN Stack and React.js',
      'sameAs': [
        'https://github.com/Naveen-Kumar48',
        'https://www.linkedin.com/in/naveen-kumar-dev/',
        'https://twitter.com/naveenkumar_dev'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+918979413404',
        'contactType': 'Customer Service',
        'email': 'kumarnaveen897941@gmail.com'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'New Delhi',
        'addressRegion': 'DL',
        'addressCountry': 'IN'
      }
    };

    this.addJsonLd(schema);
  }

  /**
   * Add Breadcrumb schema for better navigation
   */
  private addBreadcrumbStructuredData(breadcrumbs?: Array<{ name: string; url: string }>) {
    if (!breadcrumbs || breadcrumbs.length === 0) return;

    const items = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.url
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    };

    this.addJsonLd(schema);
  }

  /**
   * Add social signals and sharing metadata
   */
  private addSocialSignals(config: OffPageSeoConfig) {
    // Enhanced Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:url', content: config.url },
      { property: 'og:image', content: config.image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'Naveen Kumar Portfolio' },
      { property: 'og:locale', content: 'en_IN' }
    ];

    ogTags.forEach(tag => {
      this.meta.updateTag(tag);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image },
      { name: 'twitter:creator', content: '@naveenkumar_dev' },
      { name: 'twitter:site', content: '@naveenkumar_dev' }
    ];

    twitterTags.forEach(tag => {
      this.meta.updateTag(tag);
    });

    // LinkedIn tags
    const linkedinTags = [
      { name: 'linkedin:title', content: config.title },
      { name: 'linkedin:description', content: config.description }
    ];

    linkedinTags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  /**
   * Add trust signals (E-E-A-T)
   */
  private addTrustSignals() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Naveen Kumar - Full Stack Developer',
      'description': 'Trusted Full Stack Developer with expertise in MERN Stack, React.js, and Node.js',
      'url': 'https://naveenweb.site',
      'image': 'https://naveenweb.site/og-image.png',
      'priceRange': '$$',
      'areaServed': {
        '@type': 'Country',
        'name': 'IN'
      },
      'knowsLanguage': ['en', 'hi'],
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'Bachelor of Computer Applications',
          'issuedBy': {
            '@type': 'EducationalOrganization',
            'name': 'IGNOU'
          }
        }
      ]
    };

    this.addJsonLd(schema);
  }

  /**
   * Add author information
   */
  private addAuthorInformation(author?: string) {
    if (!author) return;

    const tag = {
      rel: 'author',
      href: `https://naveenweb.site/`
    };

    let link = this.document.querySelector('link[rel="author"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'author');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', tag.href);
  }

  /**
   * Add JSON-LD structured data
   */
  private addJsonLd(schema: any) {
    let script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }

    // Merge with existing schema if needed
    try {
      const existing = script.textContent ? JSON.parse(script.textContent) : null;
      if (existing && existing['@graph']) {
        if (!existing['@graph'].find((item: any) => item['@type'] === schema['@type'])) {
          existing['@graph'].push(schema);
          script.textContent = JSON.stringify(existing, null, 2);
        }
      } else {
        script.textContent = JSON.stringify(schema, null, 2);
      }
    } catch (e) {
      script.textContent = JSON.stringify(schema, null, 2);
    }
  }

  /**
   * Generate social share links
   */
  generateShareLinks(config: {
    title: string;
    url: string;
    text?: string;
  }) {
    const encodedUrl = encodeURIComponent(config.url);
    const encodedTitle = encodeURIComponent(config.title);
    const encodedText = encodeURIComponent(config.text || config.title);

    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    };
  }

  /**
   * Get social profile URLs
   */
  getSocialProfiles() {
    return this.socialProfiles;
  }

  /**
   * Add rel="me" links for identity verification
   */
  addIdentityVerification() {
    const relMeLinks = [
      { href: this.socialProfiles.github, text: 'GitHub' },
      { href: this.socialProfiles.linkedin, text: 'LinkedIn' },
      { href: this.socialProfiles.twitter, text: 'Twitter' }
    ];

    relMeLinks.forEach(link => {
      let linkEl = this.document.querySelector(`link[href="${link.href}"]`);
      if (!linkEl) {
        linkEl = this.document.createElement('link');
        linkEl.setAttribute('rel', 'me');
        linkEl.setAttribute('href', link.href);
        this.document.head.appendChild(linkEl);
      }
    });
  }
}
