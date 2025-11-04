export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PersonalInfo {
  _id: string;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  order: number;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  order: number;
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
  order: number;
}
