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
  icon: string; // Material icon fallback
  logoUrl?: string; // URL for real official SVG logo (e.g. Simple Icons)
  level: number; // 0-100
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools';
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
