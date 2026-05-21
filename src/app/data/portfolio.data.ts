import { Project, Skill, Experience, AcademicActivity } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'FlashMind',
    description: 'AI-Powered Learning Assistant SaaS platform that parses PDFs to generate flashcards, quizzes, and summaries. Features a contextual AI chatbot using Google GenAI SDK.',
    image: '/Flashacrd.webp',
    tags: ['React', 'Node.js', 'Google GenAI', 'Tailwind', 'Multer'],
    liveLink: 'https://flashmind-app-one.vercel.app/dashboard',
    githubLink: 'https://github.com/Naveen-Kumar48/AI-powered-Learning-Assistant-app',
    category: 'fullstack'
  },
  {
    id: 2,
    title: 'ThinkGPT',
    description: 'Multi-Modal AI Platform supporting text-to-image generation and conversational AI. Integrated Stripe Payment Gateway for subscriptions.',
    image: '/Thinkgptimg.webp',
    tags: ['MERN', 'Stripe', 'MongoDB', 'AI'],
    liveLink: 'https://thinkgpt-app.vercel.app/',
    githubLink: 'https://github.com/Naveen-Kumar48/Think-GPT',
    category: 'fullstack'
  },
  {
    id: 3,
    title: 'ProLink-Connect',
    description: 'Professional Networking Suite built with Next.js and SSR for SEO. Features dynamic PDF resume generator and real-time profile management.',
    image: '/Prolinkimg.webp',
    tags: ['Next.js', 'SSR', 'MongoDB', 'Mongoose'],
    liveLink: 'https://prolink-network.vercel.app',
    githubLink: 'https://github.com/Naveen-Kumar48/Linkedin-Clone',
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'E-Commerce Book Store',
    description: 'Scalable E-commerce Ecosystem with OTP verification, secure checkout, and an Admin Dashboard for inventory management.',
    image: '/Bookstore.webp',
    tags: ['MERN', 'React Context', 'OTP', 'RBAC', 'Stripe'],
    liveLink: 'https://book-store-e-commerce-five.vercel.app/',
    githubLink: 'https://github.com/Naveen-Kumar48/Book-Store-E-commerce',
    category: 'fullstack'
  },
  {
    id: 5,
    title: 'To-do List',
    description: 'A responsive and intuitive To-do List application for managing daily tasks efficiently. Includes features to add, edit, delete, and mark tasks as complete.',
    image: '/TodoImg.webp',
    tags: ['JavaScript', 'HTML', 'CSS'],
    liveLink: 'https://naveen-kumar48.github.io/To-do-List/',
    githubLink: 'https://github.com/Naveen-Kumar48/To-do-List',
    category: 'frontend'
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'JavaScript (ES6+)', icon: 'code', logoUrl: 'https://skillicons.dev/icons?i=js', level: 95, category: 'languages', description: 'Advanced modern JS features, asynchronous patterns, and DOM manipulation.' },
  { name: 'Java', icon: 'coffee', logoUrl: 'https://skillicons.dev/icons?i=java', level: 85, category: 'languages', description: 'Strong understanding of Object-Oriented principles and backend architecture.' },
  { name: 'C++', icon: 'code', logoUrl: 'https://skillicons.dev/icons?i=cpp', level: 80, category: 'languages', description: 'Experience in data structures, systems programming, and performance optimization.' },
  { name: 'SQL', icon: 'storage', logoUrl: 'https://skillicons.dev/icons?i=mysql', level: 90, category: 'languages', description: 'Fluent in complex queries, joins, and database design.' },

  // Frontend
  { name: 'React.js', icon: 'layers', logoUrl: 'https://skillicons.dev/icons?i=react', level: 95, category: 'frontend', description: 'Expert in hooks, context API, and high-performance component architecture.' },
  { name: 'Next.js', icon: 'grid_view', logoUrl: 'https://skillicons.dev/icons?i=nextjs', level: 90, category: 'frontend', description: 'Mastery of Server-Side Rendering (SSR) and SEO optimization hooks.' },
  { name: 'Redux', icon: 'data_object', logoUrl: 'https://skillicons.dev/icons?i=redux', level: 85, category: 'frontend', description: 'Streamlined state management for large-scale enterprise applications.' },
  { name: 'Tailwind CSS', icon: 'brush', logoUrl: 'https://skillicons.dev/icons?i=tailwind', level: 95, category: 'frontend', description: 'Rapid utility-first styling and pixel-perfect design systems.' },
  { name: 'HTML5', icon: 'html', logoUrl: 'https://skillicons.dev/icons?i=html', level: 95, category: 'frontend', description: 'Semantic, accessible, and high-quality web structures.' },
  { name: 'CSS3', icon: 'palette', logoUrl: 'https://skillicons.dev/icons?i=css', level: 90, category: 'frontend', description: 'Modern styling including Flexbox, Grid, and complex animations.' },

  // Backend
  { name: 'Node.js', icon: 'dns', logoUrl: 'https://skillicons.dev/icons?i=nodejs', level: 90, category: 'backend', description: 'Building scalable, high-concurrency server-side applications.' },
  { name: 'Express.js', icon: 'settings', logoUrl: 'https://skillicons.dev/icons?i=express', level: 90, category: 'backend', description: 'Robust routing, middleware architecture, and API security.' },
  { name: 'RESTful APIs', icon: 'api', logoUrl: 'https://skillicons.dev/icons?i=postman', level: 95, category: 'backend', description: 'Designing secure, stateless, and high-efficiency communication layers.' },
  { name: 'Middleware', icon: 'shuffle', logoUrl: 'https://skillicons.dev/icons?i=nginx', level: 85, category: 'backend', description: 'Custom interceptors for logging, auth, and error handling.' },

  // Databases
  { name: 'MongoDB (Mongoose)', icon: 'storage', logoUrl: 'https://skillicons.dev/icons?i=mongodb', level: 90, category: 'database', description: 'Experience in NoSQL modeling, aggregations, and performance tuning.' },
  { name: 'MySQL', icon: 'table_view', logoUrl: 'https://skillicons.dev/icons?i=mysql', level: 85, category: 'database', description: 'Relational database schema design and ACID compliance patterns.' },
  { name: 'Database Schema Design', icon: 'architecture', logoUrl: 'https://skillicons.dev/icons?i=prisma', level: 90, category: 'database', description: 'Engineering scalable data structures for complex enterprise systems.' },

  // Tools & Concepts
  { name: 'Git/GitHub', icon: 'commit', logoUrl: 'https://skillicons.dev/icons?i=github', level: 95, category: 'tools', description: 'Advanced version control, branching strategies, and CI/CD pipelines.' },
  { name: 'VS Code', icon: 'code', logoUrl: 'https://skillicons.dev/icons?i=vscode', level: 95, category: 'tools', description: 'Power-user in modern extensions and efficient development workflows.' },
  { name: 'NPM', icon: 'auto_awesome', logoUrl: 'https://skillicons.dev/icons?i=npm', level: 90, category: 'tools', description: 'Package management and ecosystem leverage.' },
  { name: 'Postman', icon: 'rocket', logoUrl: 'https://skillicons.dev/icons?i=postman', level: 90, category: 'tools', description: 'Automated API testing, documentation, and collaboration.' },
  { name: 'Vercel', icon: 'cloud_upload', logoUrl: 'https://skillicons.dev/icons?i=vercel', level: 90, category: 'tools', description: 'Cloud deployment, edge functions, and performance analytics.' },
  { name: 'Render', icon: 'cloud', logoUrl: 'https://skillicons.dev/icons?i=linux', level: 85, category: 'tools', description: 'Cloud application hosting and deployment.' },
  { name: 'Netlify', icon: 'cloud_done', logoUrl: 'https://skillicons.dev/icons?i=netlify', level: 90, category: 'tools', description: 'Serverless deployment and edge functions.' },
  { name: 'Google Analytics', icon: 'analytics', logoUrl: 'https://skillicons.dev/icons?i=gcp', level: 85, category: 'tools', description: 'Web traffic and engagement analysis.' },
  { name: 'Google Tag Manager', icon: 'tag', logoUrl: 'https://skillicons.dev/icons?i=gcp', level: 85, category: 'tools', description: 'Managing marketing tags and tracking.' },
  { name: 'Microsoft Clarity', icon: 'visibility', logoUrl: 'https://skillicons.dev/icons?i=azure', level: 85, category: 'tools', description: 'Behavioral analytics and heatmaps.' },
  { name: 'Search Console', icon: 'search', logoUrl: 'https://skillicons.dev/icons?i=gcp', level: 85, category: 'tools', description: 'SEO monitoring and indexing management.' },
];




export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'Intern – Web Developer',
    company: 'Diginature',
    period: 'May 2026 - Present',
    description: [
      'Engaged in structured internship program providing hands-on experience in real-world development projects in an on-site environment.',
      'Worked on both front-end and back-end development tasks, supporting live projects and learning through collaborative teamwork with experienced engineering and product teams.',
      'Contributed to dynamic web development initiatives, gaining practical exposure to professional development workflows and industry best practices.'
    ]
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Freelancer',
    period: 'January-April',
    description: [
      'I work as an independent web developer, delivering high-quality, scalable, and user-centric web solutions for clients across different domains. I have successfully collaborated with multiple clients, managing the complete project lifecycle—from initial consultation and requirement analysis to development, deployment, and ongoing support.',
      'My expertise lies in building modern, performance-optimized web applications using technologies like React and Next.js. I focus on creating responsive, SEO-friendly interfaces while ensuring clean architecture and maintainable code.',
      'I also handle deployment and continuous delivery workflows using platforms such as Vercel and Hostinger, ensuring seamless releases and reliable performance in production environments. Post-launch, I continue to support clients with enhancements, optimizations, and technical maintenance to ensure long-term success.'
    ]
  },
  {
    id: 3,
    role: 'Full Stack Developer Trainee (MERN)',
    company: 'Q-Spiders',
    period: 'Aug 2025 - April',
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
    period: '2023-2026',
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
    period: '2022-2023',
    grade: 'A',
    icon: 'menu_book',
    achievements: []
  },
  {
    id: 3,
    degree: 'Class X (CBSE)',
    institution: 'Maharishi Vidya Mandir ',
    period: '2019-2020',
    grade: 'A',
    icon: 'menu_book',
    achievements: []
  }
];
