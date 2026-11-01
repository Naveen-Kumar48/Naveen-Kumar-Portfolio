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
import { FaqComponent } from '../components/faq.component';
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
    FaqComponent,
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
      <app-faq />
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
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://naveenweb.site/#service',
          'name': 'Naveen Kumar - Full Stack Web Development Services',
          'url': 'https://naveenweb.site/',
          'image': 'https://naveenweb.site/og-image.png',
          'telephone': '+918979413404',
          'email': 'kumarnaveen897941@gmail.com',
          'priceRange': '$$',
          'currenciesAccepted': 'INR, USD, EUR',
          'paymentAccepted': 'Stripe, Bank Transfer, PayPal',
          'areaServed': [
            { '@type': 'City', 'name': 'New Delhi' },
            { '@type': 'City', 'name': 'Noida' },
            { '@type': 'City', 'name': 'Gurgaon' },
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'Country', 'name': 'United States' },
            { '@type': 'Country', 'name': 'United Kingdom' }
          ],
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'New Delhi',
            'addressRegion': 'Delhi',
            'addressCountry': 'IN'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 28.6139,
            'longitude': 77.2090
          },
          'founder': { '@id': 'https://naveenweb.site/#person' }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://naveenweb.site/#faq',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Who is Naveen Kumar and what are his core specializations?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Naveen Kumar is a Senior Full Stack Web Developer based in New Delhi, India. He specializes in the MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js, Angular, TypeScript, and AI-integrated SaaS applications with 10+ production web apps built.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What technical stack and architectural standards does Naveen use?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'His core stack includes React.js, Next.js (App Router, SSR), Angular (v21+), TypeScript, Node.js, Express.js, MongoDB (Mongoose), and Tailwind CSS. He enforces strict TypeScript typing, REST/GraphQL APIs, JWT authentication with RBAC, sub-100ms UI responsiveness, and Google GenAI (Gemini) SDK integrations.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I hire Naveen Kumar for freelance projects or full-time roles?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Naveen is actively open to freelance web development projects, full-time engineering roles, and technical consulting. He works with startup founders, digital agencies, and global enterprises remotely or on-site in Delhi NCR.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What AI-powered SaaS applications has Naveen Kumar engineered?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Key production projects include FlashMind (an AI learning assistant parsing PDFs into flashcards and quizzes via Google GenAI SDK), ThinkGPT (a multi-modal conversational and image generation platform with Stripe subscriptions), and ProLink-Connect (a Next.js professional network with real-time profile resumes).'
              }
            },
            {
              '@type': 'Question',
              'name': 'How does Naveen ensure high Google search ranking and Core Web Vitals?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Every application is architected with semantic HTML5, JSON-LD structured data (Person, WebSite, FAQPage, SoftwareApplication), WebMCP tool interfaces, automated sitemaps, IndexNow integration, sub-second LCP, and zero CLS, ensuring prime visibility across Google and AI search engines like ChatGPT and Perplexity.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How can I contact Naveen Kumar to discuss a project?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'You can reach Naveen via email at kumarnaveen897941@gmail.com, connect on LinkedIn at linkedin.com/in/naveen-kumar-dev, call +91 8979413404, or submit an inquiry through the interactive contact portal on this website.'
              }
            }
          ]
        },
        {
          '@type': 'ItemList',
          '@id': 'https://naveenweb.site/#projects',
          'name': 'Featured Software Applications by Naveen Kumar',
          'itemListElement': [
            {
              '@type': 'SoftwareApplication',
              'position': 1,
              'name': 'FlashMind - AI Learning Assistant',
              'applicationCategory': 'EducationalApplication',
              'operatingSystem': 'Web',
              'url': 'https://flashmind-app-one.vercel.app/dashboard',
              'author': { '@id': 'https://naveenweb.site/#person' },
              'description': 'AI-powered learning assistant that parses PDFs to generate flashcards, quizzes, and summaries using Google GenAI SDK.'
            },
            {
              '@type': 'SoftwareApplication',
              'position': 2,
              'name': 'ThinkGPT - Multi-Modal AI Platform',
              'applicationCategory': 'BusinessApplication',
              'operatingSystem': 'Web',
              'url': 'https://thinkgpt-app.vercel.app/',
              'author': { '@id': 'https://naveenweb.site/#person' },
              'description': 'Multi-modal AI platform supporting contextual conversational chat and text-to-image synthesis with Stripe payments.'
            },
            {
              '@type': 'SoftwareApplication',
              'position': 3,
              'name': 'ProLink-Connect - Professional Network',
              'applicationCategory': 'SocialNetworkingApplication',
              'operatingSystem': 'Web',
              'url': 'https://prolink-network.vercel.app',
              'author': { '@id': 'https://naveenweb.site/#person' },
              'description': 'Professional networking platform featuring SSR for instant SEO, real-time profiles, and dynamic PDF resume generation.'
            },
            {
              '@type': 'SoftwareApplication',
              'position': 4,
              'name': 'E-Commerce Bookstore',
              'applicationCategory': 'ShoppingApplication',
              'operatingSystem': 'Web',
              'url': 'https://book-store-e-commerce-five.vercel.app/',
              'author': { '@id': 'https://naveenweb.site/#person' },
              'description': 'MERN Stack bookstore platform with OTP authentication, shopping cart state, and Stripe checkout.'
            }
          ]
        }
      ]
    });
  }
}