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
import { signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    AcademicActivityComponent,
    CursorComponent,
    LoaderComponent,
    BackToTopComponent,
    CommonModule
  ],
  template: `
    <app-loader />
    
    <div [style.visibility]="contentVisible() ? 'visible' : 'hidden'"
         [style.opacity]="contentVisible() ? '1' : '0'"
         class="transition-opacity duration-700 ease-in-out">
      <app-cursor />
      <main class="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-emerald-500/30 selection:text-emerald-200 cursor-none overflow-x-hidden">
        <app-navbar />
        <app-hero />
        <app-about />
        <app-skills />
        <app-projects />
        <app-experience />
        <app-academic-activity />
        <app-contact />
        <app-footer />
      </main>
      <app-back-to-top />
    </div>
  `
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);
  contentVisible = signal(false);

  ngOnInit() {
    // Ultra-Premium SEO Keywords & Descriptions
    const premiumDescription = 'Naveen Kumar is a Senior Full Stack Developer and MERN Architect specializing in AI-integrated SaaS, elite Next.js applications, and high-performance system design. Expert in React, Node.js, and Scalable Cloud Architectures.';
    const premiumKeywords = 'Senior Full Stack Developer, MERN Stack Architect, Expert React.js Engineer, Lead Next.js Developer, AI SaaS Systems, Node.js Backend Specialist, High-Authority Engineering Portfolio, Scalable Software Solutions, Advanced TypeScript Developer, Modern UI/UX Architecture, Enterprise Software Design, Freelance Full Stack Architect';

    this.seo.updateTags({
      description: premiumDescription,
      keywords: premiumKeywords,
      url: 'https://naveenweb.site/',
      image: 'https://naveenweb.site/og-image.png'
    });

    // Premium JSON-LD Schema (Structured Data)
    this.seo.setSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://naveenweb.site/#person',
          'name': 'Naveen Kumar',
          'url': 'https://naveenweb.site/',
          'image': 'https://naveenweb.site/naveen_about.png',
          'jobTitle': 'Senior Full Stack Developer',
          'description': premiumDescription,
          'knowsAbout': ['MERN Stack', 'Next.js', 'React.js', 'Node.js', 'AI Integration', 'System Design', 'Scalable Architecture'],
          'sameAs': [
            'https://github.com/Naveen-Kumar48',
            'https://www.linkedin.com/in/naveen-kumar-6806382b9/'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://naveenweb.site/#website',
          'url': 'https://naveenweb.site/',
          'name': 'Naveen Kumar | Professional Portfolio',
          'publisher': { '@id': 'https://naveenweb.site/#person' }
        }
      ]
    });

    if (isPlatformBrowser(this.platformId)) {
      // Components will start initializing now but stay hidden
      setTimeout(() => {
        this.contentVisible.set(true);
      }, 3000);
    } else {
      this.contentVisible.set(true);
    }
  }
}
