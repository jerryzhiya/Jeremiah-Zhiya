import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'SCHOOL_SYSTEM' | 'CLIENT_WORK' | 'ORGANIZATION';
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string; // 👈 Added optional image URL
  featured: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  readTime: string;
  tags: string[];
  imageUrl?: string; 
  likes?: number;
  comments?: Comment[] | number
  published: boolean;
  createdAt: string;
}

// Named 'getBlogPosts' to match the imports used across your frontend pages
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog'); // 👈 Fixed endpoint (/blog instead of /blogs)
  return response.data;
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/${slug}`); // 👈 Fixed endpoint (/blog instead of /blogs)
  return response.data;
};