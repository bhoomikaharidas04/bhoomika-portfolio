export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'engineering' | 'bi' | 'analytics' | 'tools' | 'ai' | 'core' | 'tool' | 'framework';
  proficiency: string; // e.g. "Advanced Working Proficiency", "Working Proficiency"
  level?: number;
  levelLabel?: string;
  experienceYears?: string;
  description: string;
  color: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  folderIcon: string;
  color: string;
  summary: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  businessImpact: string;
  architectureFlow?: string[];
  architectureDiagram?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  isAdditional?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  organizationType: string;
  location: string;
  period: string;
  badgeColor: string;
  summary: string;
  bulletPoints: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  location: string;
  period: string;
  coursework: string[];
}

export interface SocialLink {
  platform: 'email' | 'github' | 'linkedin' | 'portfolio';
  label: string;
  handle: string;
  url: string;
  iconName: string;
  actionText: string;
}
