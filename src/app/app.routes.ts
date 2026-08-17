import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { LocalLandingPageComponent } from './pages/local-landing-page.component';

const landingCopy = {
  'web-developer-in-delhi': {
    title: 'Web Developer in Delhi NCR | Naveen Kumar',
    description: 'Hire a web developer in Delhi NCR for fast, SEO-friendly websites, landing pages, and web apps that focus on leads and performance.',
    h1: 'Web Developer in Delhi NCR',
    intro: 'I build modern websites for Delhi businesses that need speed, clean structure, and stronger search visibility. The focus is practical lead generation, not just visuals.',
    keywordList: [
      'web developer in Delhi', 'freelance web developer Delhi NCR', 'website developer Delhi', 'SEO-friendly website',
      'hire web developer Delhi NCR', 'best web developer Delhi', 'web design Delhi NCR', 'affordable web developer Delhi',
      'web development agency Delhi', 'freelance website developer Delhi', 'custom website developer Delhi'
    ],
    services: ['Lead-focused business websites', 'SEO-ready landing pages', 'Performance audits and fixes', 'Conversion copy support'],
    benefits: ['Local-intent pages designed for Delhi NCR searches.', 'Clean technical SEO with canonicals, schema, and metadata.', 'Fast delivery for startups, freelancers, and small businesses.'],
    faqs: [
      { question: 'Do you work with businesses outside Delhi?', answer: 'Yes, I work with clients across India, but this page is tailored for Delhi NCR local search intent.' },
      { question: 'Can you improve an existing website?', answer: 'Yes, I can audit and improve structure, speed, metadata, schema, and conversion flow.' }
    ],
    ctaLabel: 'Book a website audit',
    canonical: 'https://naveenweb.site/web-developer-in-delhi'
  },
  'full-stack-developer-in-delhi': {
    title: 'Full Stack Developer in Delhi NCR | Naveen Kumar',
    description: 'Need a full stack developer in Delhi NCR? I build scalable React, Angular, Node.js, and MERN solutions with SEO and performance in mind.',
    h1: 'Full Stack Developer in Delhi NCR',
    intro: 'This page is for founders and teams looking for a full stack developer who can handle frontend, backend, deployment, and SEO-aware product structure.',
    keywordList: [
      'full stack developer in Delhi', 'hire full stack developer Delhi NCR', 'MERN stack developer Delhi', 'React developer Delhi',
      'full stack engineer Delhi', 'hire MERN developer India', 'full stack web developer Delhi NCR', 'senior full stack developer Delhi',
      'full stack developer Noida', 'full stack developer Gurgaon'
    ],
    services: ['Frontend and backend development', 'REST API design and integration', 'SEO-aware information architecture', 'Deployment and maintenance'],
    benefits: ['One developer for end-to-end execution.', 'Built for speed, usability, and search.', 'Practical communication with clear scope and milestones.'],
    faqs: [
      { question: 'What stack do you work with?', answer: 'Angular, React, Node.js, Express, MongoDB, and modern deployment workflows.' },
      { question: 'Do you provide SEO with development?', answer: 'Yes, I include technical SEO basics such as metadata, schema, and performance-friendly structure.' }
    ],
    ctaLabel: 'Discuss your project',
    canonical: 'https://naveenweb.site/full-stack-developer-in-delhi'
  },
  'mern-stack-developer-delhi': {
    title: 'MERN Stack Developer Delhi | Naveen Kumar',
    description: 'Looking for a MERN stack developer in Delhi? I build scalable MongoDB, Express, React, and Node.js applications optimized for users and Google.',
    h1: 'MERN Stack Developer Delhi',
    intro: 'I help startups and small businesses ship MERN stack products with a strong focus on architecture, performance, and organic visibility.',
    keywordList: [
      'mern stack developer delhi', 'MERN developer Delhi NCR', 'hire MERN stack developer', 'React Node developer',
      'MERN developer for hire India', 'full stack MERN developer Delhi NCR', 'MongoDB Express React Node developer',
      'MERN stack web application Delhi', 'best MERN developer Delhi'
    ],
    services: ['MERN app builds', 'Authentication and dashboards', 'Admin panels and APIs', 'SEO-friendly content structure'],
    benefits: ['Ideal for SaaS, dashboards, and business apps.', 'Engineering plus SEO from the first build.', 'Flexible for freelance and part-time delivery.'],
    faqs: [
      { question: 'Can you upgrade an old MERN app?', answer: 'Yes, I can refactor existing MERN apps for better performance, structure, and maintainability.' },
      { question: 'Do you handle deployment?', answer: 'Yes, I can support deployment and ongoing improvements after launch.' }
    ],
    ctaLabel: 'Request a MERN consultation',
    canonical: 'https://naveenweb.site/mern-stack-developer-delhi'
  },
  'react-developer-in-delhi': {
    title: 'React Developer in Delhi NCR | Naveen Kumar',
    description: 'Hire a React developer in Delhi NCR for fast, accessible, SEO-friendly interfaces, landing pages, and product frontends.',
    h1: 'React Developer in Delhi NCR',
    intro: 'If you need a React developer in Delhi NCR, I build interfaces that are fast, responsive, and structured to support search and conversion.',
    keywordList: [
      'react developer in Delhi', 'hire React developer Delhi NCR', 'frontend developer Delhi', 'React landing page developer',
      'Next.js developer Delhi', 'React.js expert Delhi NCR', 'freelance React developer Delhi', 'React developer Noida',
      'React developer Gurgaon', 'best React developer India'
    ],
    services: ['Component-driven frontend builds', 'SEO-friendly landing pages', 'Responsive UI systems', 'Conversion-focused redesigns'],
    benefits: ['Great for startups, agencies, and founder-led teams.', 'Strong focus on UX, performance, and mobile first.', 'Content and metadata are aligned with search intent.'],
    faqs: [
      { question: 'Do you build only React sites?', answer: 'No, I also work with Angular and full stack setups, but this page focuses on React-led projects.' },
      { question: 'Can you improve page speed?', answer: 'Yes, I can help reduce load time by cutting unnecessary weight and improving critical rendering.' }
    ],
    ctaLabel: 'Get a React audit',
    canonical: 'https://naveenweb.site/react-developer-in-delhi'
  }
} as const;

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Naveen Kumar | Web Developer in Delhi NCR'
  },
  {
    path: 'web-developer-in-delhi',
    component: LocalLandingPageComponent,
    title: landingCopy['web-developer-in-delhi'].title,
    data: { copy: landingCopy['web-developer-in-delhi'] }
  },
  {
    path: 'full-stack-developer-in-delhi',
    component: LocalLandingPageComponent,
    title: landingCopy['full-stack-developer-in-delhi'].title,
    data: { copy: landingCopy['full-stack-developer-in-delhi'] }
  },
  {
    path: 'mern-stack-developer-delhi',
    component: LocalLandingPageComponent,
    title: landingCopy['mern-stack-developer-delhi'].title,
    data: { copy: landingCopy['mern-stack-developer-delhi'] }
  },
  {
    path: 'react-developer-in-delhi',
    component: LocalLandingPageComponent,
    title: landingCopy['react-developer-in-delhi'].title,
    data: { copy: landingCopy['react-developer-in-delhi'] }
  },
  {
    path: '**',
    redirectTo: ''
  }
];