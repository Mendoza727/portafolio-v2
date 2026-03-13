// ─── Project ────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  year: number;
}

// ─── Experience ─────────────────────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

// ─── Skill ──────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "devops" | "tools" | "mobile" | "ai";
  icon?: string;
}

export interface SkillCategory {
  label: string;
  value: Skill["category"];
  skills: Skill[];
}

// ─── Service ────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name
}

// ─── GitHub ─────────────────────────────────────────────────────────────────
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface GithubProfile {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog?: string;
  location?: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  text: string;
}

// ─── Contact form ────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
