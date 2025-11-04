import axios from 'axios';
import type { Project, ContactMessage, PersonalInfo, Skill, Experience, Education } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// Contact
export const sendContactMessage = async (message: ContactMessage): Promise<{ message: string }> => {
  const response = await api.post('/contact', message);
  return response.data;
};

// Admin Auth
export const adminLogin = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await api.post('/admin/login', { email, password });
  return response.data;
};

// Content API

// Personal Info
export const getPersonalInfo = async (): Promise<PersonalInfo> => {
  const response = await api.get('/content/personal-info');
  return response.data;
};

export const updatePersonalInfo = async (data: Partial<PersonalInfo>): Promise<PersonalInfo> => {
  const response = await api.put('/content/personal-info', data);
  return response.data;
};

// Skills
export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await api.get('/content/skills');
  return response.data;
};

export const createSkill = async (skill: Omit<Skill, '_id'>): Promise<Skill> => {
  const response = await api.post('/content/skills', skill);
  return response.data;
};

export const updateSkill = async (id: string, skill: Partial<Skill>): Promise<Skill> => {
  const response = await api.put(`/content/skills/${id}`, skill);
  return response.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/content/skills/${id}`);
};

// Experience
export const getAllExperience = async (): Promise<Experience[]> => {
  const response = await api.get('/content/experience');
  return response.data;
};

export const createExperience = async (experience: Omit<Experience, '_id'>): Promise<Experience> => {
  const response = await api.post('/content/experience', experience);
  return response.data;
};

export const updateExperience = async (id: string, experience: Partial<Experience>): Promise<Experience> => {
  const response = await api.put(`/content/experience/${id}`, experience);
  return response.data;
};

export const deleteExperience = async (id: string): Promise<void> => {
  await api.delete(`/content/experience/${id}`);
};

// Education
export const getAllEducation = async (): Promise<Education[]> => {
  const response = await api.get('/content/education');
  return response.data;
};

export const createEducation = async (education: Omit<Education, '_id'>): Promise<Education> => {
  const response = await api.post('/content/education', education);
  return response.data;
};

export const updateEducation = async (id: string, education: Partial<Education>): Promise<Education> => {
  const response = await api.put(`/content/education/${id}`, education);
  return response.data;
};

export const deleteEducation = async (id: string): Promise<void> => {
  await api.delete(`/content/education/${id}`);
};

// Seed
export const seedDatabase = async (): Promise<{ message: string }> => {
  const response = await api.post('/content/seed');
  return response.data;
};

export default api;
