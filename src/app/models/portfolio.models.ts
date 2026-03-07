export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
  category: 'frontend' | 'backend' | 'fullstack';
}

export interface Skill {
  name: string;
  icon: string; // Material icon name or custom SVG path if we were using SVGs, but we'll use text/mat-icon
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'devops';
  description?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface AcademicActivity {
  id: number;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  achievements: string[];
  icon: string;
}
