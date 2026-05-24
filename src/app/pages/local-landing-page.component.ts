import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../services/seo.service';

interface LandingPageCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywordList: string[];
  services: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
  canonical: string;
}

@Component({
  selector: 'app-local-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden py-28 md:py-32">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]"></div>
      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[var(--glass-border)] text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-8">
          <mat-icon class="text-base">location_on</mat-icon>
          Delhi NCR Service Page
        </div>

        <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[var(--text-primary)]">
              {{ copy.h1 }}
            </h1>
            <p class="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              {{ copy.intro }}
            </p>

            <div class="mt-10 flex flex-wrap gap-3">
              @for (keyword of copy.keywordList; track keyword) {
                <span class="px-4 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--bg-secondary)]/80 text-sm text-[var(--text-secondary)]">
                  {{ keyword }}
                </span>
              }
            </div>

            <div class="mt-10 flex flex-wrap gap-4">
              <a routerLink="/" class="px-6 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] font-bold text-[var(--text-primary)]">
                Back to home
              </a>
              <a href="#contact" class="px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-black uppercase tracking-[0.2em] text-sm">
                {{ copy.ctaLabel }}
              </a>
            </div>
          </div>

          <aside class="liquid-glass rounded-[2rem] p-8 border border-[var(--glass-border)]">
            <h2 class="text-2xl font-black tracking-tighter text-[var(--text-primary)]">What this page covers</h2>
            <ul class="mt-6 space-y-4 text-[var(--text-secondary)]">
              @for (benefit of copy.benefits; track benefit) {
                <li class="flex gap-3 items-start">
                  <mat-icon class="text-emerald-500 text-base mt-1">check_circle</mat-icon>
                  <span>{{ benefit }}</span>
                </li>
              }
            </ul>
          </aside>
        </div>

        <div class="mt-20 grid md:grid-cols-2 gap-6">
          <section class="liquid-glass rounded-[2rem] p-8 border border-[var(--glass-border)]">
            <h2 class="text-2xl font-black tracking-tighter">Services</h2>
            <ul class="mt-6 space-y-4 text-[var(--text-secondary)]">
              @for (service of copy.services; track service) {
                <li class="flex gap-3 items-start">
                  <mat-icon class="text-cyan-400 text-base mt-1">design_services</mat-icon>
                  <span>{{ service }}</span>
                </li>
              }
            </ul>
          </section>

          <section class="liquid-glass rounded-[2rem] p-8 border border-[var(--glass-border)]">
            <h2 class="text-2xl font-black tracking-tighter">FAQs</h2>
            <div class="mt-6 space-y-5">
              @for (faq of copy.faqs; track faq.question) {
                <article>
                  <h3 class="font-bold text-[var(--text-primary)]">{{ faq.question }}</h3>
                  <p class="mt-2 text-[var(--text-secondary)] leading-relaxed">{{ faq.answer }}</p>
                </article>
              }
            </div>
          </section>
        </div>
      </div>
    </section>
  `
})
export class LocalLandingPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  copy!: LandingPageCopy;

  ngOnInit() {
    this.copy = this.route.snapshot.data['copy'] as LandingPageCopy;

    this.seo.updateSeo({
      title: this.copy.title,
      description: this.copy.description,
      url: this.copy.canonical,
      keywords: this.copy.keywordList.join(', ')
    });

    this.seo.setSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://naveenweb.site/#person',
          'name': 'Naveen Kumar',
          'url': 'https://naveenweb.site/',
          'jobTitle': 'Full Stack Developer',
          'image': 'https://naveenweb.site/og-image.png',
          'description': this.copy.description,
          'telephone': '+918979413404',
          'email': 'kumarnaveen897941@gmail.com',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'New Delhi',
            'addressRegion': 'Delhi',
            'addressCountry': 'IN'
          },
          'sameAs': [
            'https://www.linkedin.com/in/naveen-kumar-dev/',
            'https://github.com/Naveen-Kumar48'
          ]
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${this.copy.canonical}#service`,
          'name': this.copy.title,
          'url': this.copy.canonical,
          'areaServed': [
            { '@type': 'Place', 'name': 'Delhi' },
            { '@type': 'Place', 'name': 'Delhi NCR' }
          ],
          'provider': { '@id': 'https://naveenweb.site/#person' },
          'description': this.copy.description,
          'serviceType': this.copy.h1
        },
        {
          '@type': 'FAQPage',
          '@id': `${this.copy.canonical}#faq`,
          'mainEntity': this.copy.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://naveenweb.site/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': this.copy.h1,
              'item': this.copy.canonical
            }
          ]
        }
      ]
    });
  }
}