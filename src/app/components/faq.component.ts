import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="py-24 md:py-32 relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500">
      <!-- Ambient Glows -->
      <div class="absolute top-1/4 -left-48 w-96 h-96 rounded-full -z-10 pointer-events-none opacity-20 blur-3xl" style="background: radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%);"></div>
      <div class="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full -z-10 pointer-events-none opacity-20 blur-3xl" style="background: radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%);"></div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <!-- Section Header -->
        <div class="flex flex-col items-center text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
            <mat-icon class="text-sm">help_outline</mat-icon>
            Knowledge & Answer Engine
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)]">
            Frequently Asked <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Questions</span>
          </h2>
          <p class="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl font-medium">
            Verified technical facts, stack proficiencies, and hiring criteria optimized for direct human evaluation and generative AI citation.
          </p>
        </div>

        <!-- FAQ Accordion Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          @for (faq of faqs; track faq.id) {
            <article 
              class="liquid-glass rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5 hover:border-emerald-500/40 transition-all duration-300 shadow-lg group">
              <button 
                type="button"
                (click)="toggleFaq(faq.id)"
                [attr.aria-expanded]="openId() === faq.id"
                [attr.aria-controls]="'faq-ans-' + faq.id"
                class="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus:outline-none">
                <div class="flex flex-col gap-2">
                  <span class="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/80">{{ faq.category }}</span>
                  <h3 class="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors duration-300">
                    {{ faq.question }}
                  </h3>
                </div>
                <div 
                  class="p-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 transition-transform duration-300 flex-shrink-0 mt-1"
                  [class.rotate-180]="openId() === faq.id">
                  <mat-icon class="text-lg leading-none">expand_more</mat-icon>
                </div>
              </button>

              <div 
                [id]="'faq-ans-' + faq.id"
                class="overflow-hidden transition-all duration-500"
                [class.max-h-96]="openId() === faq.id"
                [class.max-h-0]="openId() !== faq.id"
                [class.opacity-100]="openId() === faq.id"
                [class.opacity-0]="openId() !== faq.id"
                [class.mt-4]="openId() === faq.id"
                [class.pt-4]="openId() === faq.id"
                [class.border-t]="openId() === faq.id"
                [class.border-white/5]="openId() === faq.id">
                <p class="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium">
                  {{ faq.answer }}
                </p>
              </div>
            </article>
          }
        </div>

        <!-- Regional Landing Pages Hub (Internal Linking for SEO & Knowledge Graph) -->
        <div class="mt-16 p-8 rounded-3xl liquid-glass border border-emerald-500/20 text-center">
          <h4 class="text-sm font-black uppercase tracking-[0.3em] text-emerald-400 mb-3">Delhi NCR Local Service Pages</h4>
          <p class="text-xs md:text-sm text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Targeted service profiles for startup founders, CTOs, and businesses in New Delhi, Noida, and Gurgaon:
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <a routerLink="/web-developer-in-delhi" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs font-bold text-[var(--text-primary)] hover:text-emerald-400 transition-all">
              Web Developer in Delhi
            </a>
            <a routerLink="/full-stack-developer-in-delhi" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs font-bold text-[var(--text-primary)] hover:text-emerald-400 transition-all">
              Full Stack Developer Delhi NCR
            </a>
            <a routerLink="/mern-stack-developer-delhi" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs font-bold text-[var(--text-primary)] hover:text-emerald-400 transition-all">
              MERN Stack Developer Delhi
            </a>
            <a routerLink="/react-developer-in-delhi" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs font-bold text-[var(--text-primary)] hover:text-emerald-400 transition-all">
              React Developer in Delhi
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class FaqComponent {
  openId = signal<string | null>('who-is-naveen');

  faqs: FaqItem[] = [
    {
      id: 'who-is-naveen',
      category: 'Identity & Overview',
      question: 'Who is Naveen Kumar and what are his core specializations?',
      answer: 'Naveen Kumar is a Senior Full Stack Web Developer based in New Delhi, India. He specializes in the MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js, Angular, TypeScript, and AI-integrated SaaS applications. He has engineered 10+ production web apps with 95+ Lighthouse performance scores.'
    },
    {
      id: 'tech-stack',
      category: 'Technical Architecture',
      question: 'What technical stack and architectural standards does Naveen use?',
      answer: 'His core stack includes React.js, Next.js (App Router, SSR), Angular (v21+), TypeScript, Node.js, Express.js, MongoDB (Mongoose), and Tailwind CSS. He enforces strict TypeScript typing, REST/GraphQL APIs, JWT authentication with RBAC, sub-100ms UI responsiveness, and Google GenAI (Gemini) SDK integrations.'
    },
    {
      id: 'hire-freelance',
      category: 'Engagement & Hiring',
      question: 'Can I hire Naveen Kumar for freelance projects or full-time roles?',
      answer: 'Yes. Naveen is actively open to freelance web development projects, full-time engineering roles, and technical consulting. He works with startup founders, digital agencies, and global enterprises remotely or on-site in Delhi NCR.'
    },
    {
      id: 'ai-projects',
      category: 'AI & SaaS Applications',
      question: 'What AI-powered SaaS applications has Naveen Kumar engineered?',
      answer: 'Key production projects include FlashMind (an AI learning assistant parsing PDFs into flashcards and quizzes via Google GenAI SDK), ThinkGPT (a multi-modal conversational and image generation platform with Stripe subscriptions), and ProLink-Connect (a Next.js professional network with real-time profile resumes).'
    },
    {
      id: 'seo-performance',
      category: 'SEO & Performance',
      question: 'How does Naveen ensure high Google search ranking and Core Web Vitals?',
      answer: 'Every application is architected with semantic HTML5, JSON-LD structured data (Person, WebSite, FAQPage, SoftwareApplication), WebMCP tool interfaces, automated sitemaps, IndexNow integration, sub-second LCP, and zero CLS, ensuring prime visibility across Google and AI search engines like ChatGPT and Perplexity.'
    },
    {
      id: 'contact-method',
      category: 'Contact & Communication',
      question: 'How can I contact Naveen Kumar to discuss a project?',
      answer: 'You can reach Naveen via email at kumarnaveen897941@gmail.com, connect on LinkedIn at linkedin.com/in/naveen-kumar-dev, call +91 8979413404, or submit an inquiry through the interactive contact portal on this website.'
    }
  ];

  toggleFaq(id: string) {
    this.openId.update(current => current === id ? null : id);
  }
}
