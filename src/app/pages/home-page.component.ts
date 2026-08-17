import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero.component';
import { AboutComponent } from '../components/about.component';
import { SkillsComponent } from '../components/skills.component';
import { ProjectsComponent } from '../components/projects.component';
import { ExperienceComponent } from '../components/experience.component';
import { ContactComponent } from '../components/contact.component';
import { FooterComponent } from '../components/footer.component';
import { AcademicActivityComponent } from '../components/academic-activity.component';
import { NavbarComponent } from '../components/navbar.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    AcademicActivityComponent,
    ContactComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `
})
export class HomePageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    const description = 'Hire Naveen Kumar — a top-rated Full Stack MERN Developer from Delhi NCR, India. Expert in React.js, Next.js, Node.js, MongoDB, TypeScript & AI-integrated SaaS apps. 10+ products built. Available for freelance & full-time roles.';

    this.seo.updateSeo({
      title: 'Naveen Kumar | MERN Stack Developer for Hire | React & Next.js Expert, Delhi NCR',
      description,
      url: 'https://naveenweb.site/',
      keywords: [
        // Branded
        'Naveen Kumar', 'Naveen Kumar MERN', 'Naveen Kumar developer',
        'Naveen Kumar portfolio', 'Naveen Kumar full stack',
        // Hire Intent (highest value)
        'hire MERN developer India', 'hire full stack developer Delhi',
        'hire React developer India', 'hire Next.js developer India',
        'MERN stack developer for hire', 'full stack developer for hire India',
        'React developer for hire India',
        // Superlative / Competitive
        'top React developer India', 'best Next.js developer India',
        'best MERN developer Delhi NCR', 'best full stack developer India',
        'experienced MERN developer India', 'senior React developer India',
        // Tech + Location
        'full stack developer Delhi NCR', 'MERN stack developer Delhi',
        'React.js developer Delhi India', 'Node.js backend developer India',
        'MongoDB developer India', 'TypeScript developer India',
        'Express.js developer India', 'Angular developer India',
        'JavaScript developer India',
        // AI / Modern Stack
        'AI SaaS developer India', 'AI web developer India', 'AI app developer India',
        'SaaS application developer India', 'web app developer India',
        'web application developer Delhi',
        // Freelance
        'freelance web developer Delhi NCR', 'freelance React developer India',
        'freelance MERN developer India', 'freelance Next.js developer India',
        'freelance Node.js developer India',
        // Junior / Entry
        'junior full stack developer India', 'junior MERN developer India',
        'junior developer for hire India',
        // Portfolio Discovery
        'full stack web developer India portfolio', 'React developer portfolio India',
        'MERN developer portfolio India', 'portfolio website developer India',
        'developer portfolio India', 'GitHub developer India',
        // Expert Keywords
        'React.js expert India', 'Next.js expert India',
        'Node.js expert India', 'MongoDB expert India',
        // Brand + Domain
        'Naveen Kumar naveenweb.site', 'naveenweb site developer', 'naveenweb portfolio',
        // NCR Cities
        'React developer Noida', 'React developer Gurgaon',
        'full stack developer Noida', 'full stack developer Gurgaon',
        // Startup / Remote
        'web developer for startup India', 'web developer for agency India',
        'remote developer India', 'open to work developer India',
        'available for hire web developer India',
        // Project Types
        'MERN stack web app India', 'e-commerce developer India',
        'SaaS platform developer India', 'REST API developer India',
        'backend developer India', 'frontend developer India'
      ].join(', ')
    });

    this.seo.setSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://naveenweb.site/#person',
          'name': 'Naveen Kumar',
          'url': 'https://naveenweb.site/',
          'jobTitle': 'Full Stack MERN Developer | React.js, Next.js & AI Integration Expert',
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
          'sameAs': [
            'https://www.linkedin.com/in/naveen-kumar-dev/',
            'https://github.com/Naveen-Kumar48'
          ],
          'knowsAbout': [
            'React.js', 'Next.js', 'Node.js', 'MERN Stack', 'Angular',
            'TypeScript', 'JavaScript', 'SEO', 'Web Performance', 'Lead Generation',
            'MongoDB', 'Express.js', 'REST API', 'AI Integration', 'SaaS Development',
            'Tailwind CSS', 'Redux Toolkit', 'MySQL', 'Freelance Web Development',
            'Hire Full Stack Developer India', 'React Developer Delhi NCR',
            'Next.js Developer India', 'AI Web Developer India',
            'MERN Stack Developer Delhi', 'Web Application Development',
            'Web Developer in Delhi', 'Hire MERN Developer India', 'Custom Web Development',
            'GraphQL API', 'Gemini API Integration', 'OpenAI API Integration', 'SEO Friendly Web Apps'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://naveenweb.site/#website',
          'url': 'https://naveenweb.site/',
          'name': 'Naveen Kumar Portfolio',
          'description': description,
          'publisher': { '@id': 'https://naveenweb.site/#person' },
          'inLanguage': 'en-IN'
        },
        {
          '@type': 'ProfilePage',
          '@id': 'https://naveenweb.site/#profilepage',
          'url': 'https://naveenweb.site/',
          'name': 'Naveen Kumar - Portfolio',
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
}