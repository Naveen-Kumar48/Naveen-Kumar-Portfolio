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
    const description = 'Naveen Kumar is a full stack developer in Delhi NCR building SEO-friendly websites, React apps, and MERN applications that generate leads.';

    this.seo.updateSeo({
      title: 'Naveen Kumar | Web Developer in Delhi NCR',
      description,
      url: 'https://naveenweb.site/',
      keywords: [
        'Naveen Kumar',
        'web developer in Delhi',
        'full stack developer in Delhi',
        'MERN stack developer Delhi',
        'React developer in Delhi',
        'freelance web developer Delhi NCR',
        'SEO-friendly portfolio website',
        'hire web developer India'
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
          'sameAs': [
            'https://www.linkedin.com/in/naveen-kumar-dev/',
            'https://github.com/Naveen-Kumar48'
          ],
          'knowsAbout': [
            'React.js', 'Next.js', 'Node.js', 'MERN Stack', 'Angular',
            'TypeScript', 'JavaScript', 'SEO', 'Web Performance', 'Lead Generation'
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