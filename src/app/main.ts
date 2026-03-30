import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { AboutComponent } from './components/about.component';
import { SkillsComponent } from './components/skills.component';
import { ProjectsComponent } from './components/projects.component';
import { ExperienceComponent } from './components/experience.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';
import { AcademicActivityComponent } from './components/academic-activity.component';
import { CursorComponent } from './components/cursor.component';
import { LoaderComponent } from './components/loader.component';
import { BackToTopComponent } from './components/back-to-top.component';
import { CookieBannerComponent } from './components/cookie-banner.component';
import { CookiePreferencesModalComponent } from './components/cookie-preferences-modal.component';
import { CookieSettingsButtonComponent } from './components/cookie-settings-button.component';
import { signal, OnInit, inject, PLATFORM_ID, AfterViewInit, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SeoService } from './services/seo.service';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent, HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent,
    ExperienceComponent, ContactComponent, FooterComponent, AcademicActivityComponent,
    CursorComponent, LoaderComponent, BackToTopComponent, CommonModule,
    CookieBannerComponent, CookiePreferencesModalComponent, CookieSettingsButtonComponent
  ],
  template: `
    <app-loader />
    
    <div [style.visibility]="contentVisible() ? 'visible' : 'hidden'"
         [style.opacity]="contentVisible() ? '1' : '0'"
         class="transition-opacity duration-[800ms] ease-out">
      <app-cursor />
      <main class="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] cursor-none overflow-x-hidden selection:bg-transparent">
        <app-navbar />
        <app-hero />
        
        @defer (on idle; on viewport; prefetch on idle) {
          <app-about />
        } @placeholder {
          <div class="h-[600px] w-full bg-[var(--bg-primary)]"></div>
        }

        @defer (on idle; on viewport; prefetch on idle) {
          <app-skills />
        } @placeholder {
          <div class="h-[500px] w-full bg-[var(--bg-secondary)]"></div>
        }

        @defer (on idle; on viewport; prefetch on idle) {
          <app-projects />
        } @placeholder {
          <div class="h-[800px] w-full bg-[var(--bg-primary)]"></div>
        }

        @defer (on idle; on viewport; prefetch on idle) {
          <app-experience />
        } @placeholder {
          <div class="h-[700px] w-full bg-[var(--bg-secondary)]"></div>
        }

        @defer (on idle; on viewport; prefetch on idle) {
          <app-academic-activity />
        } @placeholder {
          <div class="h-[600px] w-full bg-[var(--bg-primary)]"></div>
        }

        @defer (on idle; on viewport; prefetch on idle) {
          <app-contact />
        } @placeholder {
          <div class="h-[500px] w-full bg-[var(--bg-secondary)]"></div>
        }

        <app-footer />
      </main>
      <app-back-to-top />
      <app-cookie-banner />
      <app-cookie-preferences-modal />
      <app-cookie-settings-button />
    </div>
  `
})
export class App implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private seo = inject(SeoService);
  contentVisible = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngOnInit() {
    this.initSEO();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSmoothScroll();
      this.initSecurityLock();
      this.initPageRevealer();
    }
  }

  private initSEO() {
    const description = 'Naveen Kumar is a Full Stack Developer from New Delhi, India. Expert in MERN Stack, React.js, Next.js, Node.js & AI integration. Available for freelance and full-time roles. View portfolio at naveenweb.site.';

    const keywords = [
      // Name-based (highest priority — people searching you directly)
      'Naveen Kumar', 'Naveen Kumar developer', 'Naveen Kumar portfolio',
      'Naveen Kumar full stack developer', 'Naveen Kumar New Delhi',
      'Naveen Kumar React developer', 'Naveen Kumar MERN stack',
      'naveenweb.site', 'naveen kumar web developer india',

      // Role + Location (local SEO — recruiters & clients search these)
      'full stack developer India', 'full stack developer New Delhi',
      'MERN stack developer India', 'MERN stack developer New Delhi',
      'React developer India', 'React.js developer New Delhi',
      'Next.js developer India', 'Node.js developer India',
      'JavaScript developer India', 'TypeScript developer India',
      'frontend developer India', 'backend developer India',
      'software engineer New Delhi', 'software developer India',

      // Hire intent (high commercial value — recruiters & clients)
      'hire full stack developer India', 'hire React developer India',
      'hire MERN stack developer', 'hire Next.js developer India',
      'freelance full stack developer India',
      'freelance web developer New Delhi',
      'freelance React developer India',
      'full stack developer for hire India',
      'remote full stack developer India',

      // Skill-based (tech recruiters search these)
      'React.js expert India', 'Next.js SSR developer India',
      'Node.js backend developer India', 'MongoDB developer India',
      'Express.js developer India', 'REST API developer India',
      'AI developer India', 'SaaS developer India',
      'e-commerce developer India', 'web application developer India',

      // Portfolio-specific (long-tail, low competition, high intent)
      'best full stack developer portfolio India',
      'web developer portfolio New Delhi',
      'portfolio website developer India',
      'top React developer portfolio India'
    ].join(', ');

    this.seo.updateTags({
      description,
      keywords,
      url: 'https://naveenweb.site/',
      image: 'https://naveenweb.site/og-image.png'
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
          'description': description,
          'email': 'kumarnaveen897941@gmail.com',
          'telephone': '+918979413404',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'New Delhi',
            'addressRegion': 'Delhi',
            'addressCountry': 'IN'
          },
          'alumniOf': {
            '@type': 'CollegeOrUniversity',
            'name': 'Indira Gandhi National Open University (IGNOU)'
          },
          'knowsAbout': [
            'React.js', 'Next.js', 'Node.js', 'MongoDB', 'Express.js',
            'MERN Stack', 'TypeScript', 'JavaScript', 'Full Stack Development',
            'AI Integration', 'SaaS Development', 'REST API', 'Web Performance'
          ],
          'sameAs': [
            'https://github.com/Naveen-Kumar48',
            'https://www.linkedin.com/in/naveen-kumar-dev/'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://naveenweb.site/#website',
          'url': 'https://naveenweb.site/',
          'name': 'Naveen Kumar | Full Stack Developer Portfolio',
          'description': description,
          'publisher': { '@id': 'https://naveenweb.site/#person' },
          'inLanguage': 'en-IN'
        },
        {
          '@type': 'ProfilePage',
          '@id': 'https://naveenweb.site/#profilepage',
          'url': 'https://naveenweb.site/',
          'name': 'Naveen Kumar - Full Stack Developer Portfolio',
          'about': { '@id': 'https://naveenweb.site/#person' },
          'mainEntity': { '@id': 'https://naveenweb.site/#person' }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [{
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://naveenweb.site/'
          }]
        }
      ]
    });
  }

  private initSmoothScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Enforce top-of-page entry protocol
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Force immediate reset
      window.scrollTo(0, 0);

      // Clear hash to prevent auto-jump
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }

      this.ngZone.runOutsideAngular(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp: 0.15,
          touchMultiplier: 2.5,
          infinite: false,
        });

        (window as any).lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      });
    }
  }

  private initSecurityLock() {
    if (isPlatformBrowser(this.platformId)) {
      // Shield against direct extraction
      window.addEventListener('contextmenu', (e) => e.preventDefault());
      window.addEventListener('copy', (e) => e.preventDefault());

      // Blacklist tactical shortcut keys
      window.addEventListener('keydown', (e) => {
        if (
          (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'i' || e.key === 'j')) ||
          (e.metaKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'i' || e.key === 'j')) ||
          e.key === 'F12'
        ) {
          e.preventDefault();
          return false;
        }
        return true;
      });
    }
  }

  private initPageRevealer() {
    // Precise, high-speed reveal protocol
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
      this.contentVisible.set(true);
    }, 800);
  }
}
