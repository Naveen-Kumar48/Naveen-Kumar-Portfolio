import { Project, Skill, Experience, AcademicActivity } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'FlashMind',
    description: 'AI-Powered Learning Assistant SaaS platform that parses PDFs to generate flashcards, quizzes, and summaries. Features a contextual AI chatbot using Google GenAI SDK.',
    image: 'https://picsum.photos/seed/flashmind/800/600',
    tags: ['React', 'Node.js', 'Google GenAI', 'Tailwind', 'Multer'],
    liveLink: '#',
    githubLink: 'https://github.com/Naveen-Kumar48',
    category: 'fullstack'
  },
  {
    id: 2,
    title: 'ThinkGPT',
    description: 'Multi-Modal AI Platform supporting text-to-image generation and conversational AI. Integrated Stripe Payment Gateway for subscriptions.',
    image: 'https://picsum.photos/seed/thinkgpt/800/600',
    tags: ['MERN', 'Stripe', 'MongoDB', 'AI'],
    liveLink: '#',
    githubLink: 'https://github.com/Naveen-Kumar48',
    category: 'fullstack'
  },
  {
    id: 3,
    title: 'ProLink',
    description: 'Professional Networking Suite built with Next.js and SSR for SEO. Features dynamic PDF resume generator and real-time profile management.',
    image: 'https://picsum.photos/seed/prolink/800/600',
    tags: ['Next.js', 'SSR', 'MongoDB', 'Mongoose'],
    liveLink: '#',
    githubLink: 'https://github.com/Naveen-Kumar48',
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'Secure Book Store',
    description: 'Scalable E-commerce Ecosystem with OTP verification, secure checkout, and an Admin Dashboard for inventory management.',
    image: 'https://picsum.photos/seed/bookstore/800/600',
    tags: ['MERN', 'React Context', 'OTP', 'RBAC'],
    liveLink: '#',
    githubLink: 'https://github.com/Naveen-Kumar48',
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
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Example University of Technology',
    period: '2021 - 2025',
    grade: '8.5 CGPA',
    icon: 'school',
    achievements: [
      'Specialized in Artificial Intelligence and Machine Learning.',
      'Led the university coding club and organized 3 hackathons.',
      'Published a research paper on "AI in Education" in a national conference.',
      'Completed a capstone project on "Smart Campus Navigation System".'
    ]
  },
  {
    id: 2,
    degree: 'Higher Secondary Education (Science)',
    institution: 'Example Public School',
    period: '2019 - 2021',
    grade: '92%',
    icon: 'menu_book',
    achievements: [
      'Top 1% in Mathematics and Computer Science.',
      'Participated in National Science Olympiad.',
      'Member of the school debate team.'
    ]
  }
];
