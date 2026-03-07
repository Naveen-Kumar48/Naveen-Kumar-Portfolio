import { Project, Skill, Experience, AcademicActivity } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'FlashMind',
    description: 'AI-Powered Learning Assistant SaaS platform that parses PDFs to generate flashcards, quizzes, and summaries. Features a contextual AI chatbot using Google GenAI SDK.',
    image: '/Flashacrd.png',
    tags: ['React', 'Node.js', 'Google GenAI', 'Tailwind', 'Multer'],
    liveLink: 'https://flashmind-app-one.vercel.app/dashboard',
    githubLink: 'https://github.com/Naveen-Kumar48/AI-powered-Learning-Assistant-app',
    category: 'fullstack'
  },
  {
    id: 2,
    title: 'ThinkGPT',
    description: 'Multi-Modal AI Platform supporting text-to-image generation and conversational AI. Integrated Stripe Payment Gateway for subscriptions.',
    image: 'https://private-user-images.githubusercontent.com/170291424/546284815-3ad64f7a-57e5-4831-9e61-997cef45b108.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzI4NjcyMDIsIm5iZiI6MTc3Mjg2NjkwMiwicGF0aCI6Ii8xNzAyOTE0MjQvNTQ2Mjg0ODE1LTNhZDY0ZjdhLTU3ZTUtNDgzMS05ZTYxLTk5N2NlZjQ1YjEwOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMwN1QwNzAxNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03NTY5N2ZkN2M5NDcwOTljZTAwN2QwNDRjZTRhOGI3YzU4YjFmNWFiZTRhODdjN2Q4ZWRlOTA3MzMzZWJmZmI2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.wuIv3gp-aA4Aj-aNb3Gcjx2ri9iXXBErLzpBw5Q8tQc',
    tags: ['MERN', 'Stripe', 'MongoDB', 'AI'],
    liveLink: 'https://thinkgpt-app.vercel.app/',
    githubLink: 'https://github.com/Naveen-Kumar48/Think-GPT',
    category: 'fullstack'
  },
  {
    id: 3,
    title: 'ProLink-Connect',
    description: 'Professional Networking Suite built with Next.js and SSR for SEO. Features dynamic PDF resume generator and real-time profile management.',
    image: 'https://private-user-images.githubusercontent.com/170291424/543379890-1ecb4873-1501-4fb3-8653-318360369bf5.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzI4NjczMjksIm5iZiI6MTc3Mjg2NzAyOSwicGF0aCI6Ii8xNzAyOTE0MjQvNTQzMzc5ODkwLTFlY2I0ODczLTE1MDEtNGZiMy04NjUzLTMxODM2MDM2OWJmNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMwN1QwNzAzNDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lZjQyMTVjMGM4Y2Q1NzViMmUzNzUwOGVkNzllMWZjMGE3MzBkZWNlNzJlNzBiZDMyZjA0M2VlMjlmMGNhZWU3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.ckg36mnroPhf4ROVGRUAl_xp08-3XU81ytrNd1l0tOE',
    tags: ['Next.js', 'SSR', 'MongoDB', 'Mongoose'],
    liveLink: 'https://prolink-network.vercel.app',
    githubLink: 'https://github.com/Naveen-Kumar48/Linkedin-Clone ',
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'E-Commerce Book Store',
    description: 'Scalable E-commerce Ecosystem with OTP verification, secure checkout, and an Admin Dashboard for inventory management.',
    image: '/Bookstore.png',
    tags: ['MERN', 'React Context', 'OTP', 'RBAC', 'Stripe'],
    liveLink: 'https://book-store-e-commerce-five.vercel.app/',
    githubLink: 'https://github.com/Naveen-Kumar48/Book-Store-E-commerce',
    category: 'fullstack'
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'JavaScript (ES6+)', icon: 'javascript', level: 90, category: 'frontend', description: 'Expert in modern JS features, async/await, and DOM manipulation.' },
  { name: 'Java', icon: 'coffee', level: 80, category: 'backend', description: 'Strong understanding of OOP concepts and enterprise application development.' },
  { name: 'C++', icon: 'code', level: 75, category: 'backend', description: 'Proficient in data structures, algorithms, and memory management.' },
  { name: 'Python', icon: 'terminal', level: 80, category: 'backend', description: 'Experience with scripting, automation, and basic data analysis.' },
  { name: 'SQL', icon: 'dataset', level: 85, category: 'database', description: 'Skilled in writing complex queries, joins, and database normalization.' },

  // Frontend
  { name: 'React.js', icon: 'code', level: 95, category: 'frontend', description: 'Deep knowledge of hooks, context API, and component lifecycle.' },
  { name: 'Next.js', icon: 'layers', level: 90, category: 'frontend', description: 'Proficient in SSR, SSG, and building SEO-friendly applications.' },
  { name: 'Redux', icon: 'data_object', level: 85, category: 'frontend', description: 'Experience managing complex application state with Redux Toolkit.' },
  { name: 'Tailwind CSS', icon: 'style', level: 95, category: 'frontend', description: 'Expert in building responsive, utility-first designs rapidly.' },
  { name: 'HTML5/CSS3', icon: 'html', level: 95, category: 'frontend', description: 'Solid foundation in semantic HTML and modern CSS layouts (Flexbox/Grid).' },

  // Backend
  { name: 'Node.js', icon: 'dns', level: 90, category: 'backend', description: 'Capable of building scalable server-side applications and REST APIs.' },
  { name: 'Express.js', icon: 'settings_ethernet', level: 90, category: 'backend', description: 'Extensive experience with middleware, routing, and error handling.' },
  { name: 'RESTful APIs', icon: 'api', level: 90, category: 'backend', description: 'Designing and implementing secure, stateless API architectures.' },
  { name: 'JWT Auth', icon: 'security', level: 90, category: 'backend', description: 'Implementing secure authentication and authorization flows.' },

  // Database
  { name: 'MongoDB', icon: 'storage', level: 90, category: 'database', description: 'Proficient in NoSQL schema design, aggregation pipelines, and Mongoose.' },
  { name: 'MySQL', icon: 'table_view', level: 85, category: 'database', description: 'Experience with relational database design and management.' },

  // Tools
  { name: 'Git/GitHub', icon: 'commit', level: 95, category: 'tools', description: 'Proficient in version control, branching strategies, and collaboration.' },
  { name: 'VS Code', icon: 'code', level: 95, category: 'tools', description: 'Advanced usage of extensions, debugging, and productivity shortcuts.' },
  { name: 'Postman', icon: 'send', level: 90, category: 'tools', description: 'Testing and documenting APIs effectively.' },
  { name: 'Vercel', icon: 'cloud_upload', level: 85, category: 'devops', description: 'Deploying and managing frontend applications with CI/CD.' },
  { name: 'Stripe API', icon: 'payments', level: 80, category: 'tools', description: 'Integrating payment gateways for secure transaction processing.' }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'Full Stack Developer Trainee (MERN)',
    company: 'Q-Spiders',
    period: 'Aug 2025 - Present',
    description: [
      'Engineered robust end-to-end web applications with scalable MERN architecture.',
      'Designed secure REST APIs implementing RBAC and middleware for protected routes.',
      'Optimized React component lifecycles and reduced API response times for better frontend performance.',
      'Collaborated on AI features and deployed production-ready modules with maintainable code.'
    ]
  }
];

export const ACADEMIC_ACTIVITIES: AcademicActivity[] = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Indira Gandhi National Open University (IGNOU)',
    period: '2023 - 2026',
    grade: 'A',
    icon: 'school',
    achievements: [
      'Gained deep foundational knowledge in Data Structures',
      'Developed strong proficiency in Database Management Systems.',

    ]
  },
  {
    id: 2,
    degree: 'Class XII (CBSE)',
    institution: 'Blooming Dale School ',
    period: '2022 - 2023',
    grade: 'A',
    icon: 'menu_book',
    achievements: []
  },
  {
    id: 3,
    degree: 'Class X (CBSE)',
    institution: 'Maharishi Vidya Mandir ',
    period: '2019 - 2020',
    grade: 'A',
    icon: 'menu_book',
    achievements: []
  }
];
