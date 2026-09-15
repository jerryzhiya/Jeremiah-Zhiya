import type { Request, Response, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prisma.js';
import { Prisma } from '@prisma/client';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(projects);
  }
);

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug as string;

    if (!slug) {
      res.status(400);
      throw new Error('Please provide a valid project slug');
    }

    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    res.status(200).json(project);
  }
);

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private / Admin
export const createProject: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { title, slug, description, category, techStack, liveUrl, githubUrl, featured } = req.body;

    if (!title || !slug || !description || !category) {
      res.status(400);
      throw new Error('Title, slug, description, and category are required');
    }

    const existingProject = await prisma.project.findUnique({
      where: { slug: slug as string },
    });

    if (existingProject) {
      res.status(409);
      throw new Error('A project with this slug already exists');
    }

    let parsedTechStack: string[] = [];
    if (typeof techStack === 'string' && techStack.trim() !== '') {
      parsedTechStack = techStack.split(',').map((tech) => tech.trim()).filter(Boolean);
    } else if (Array.isArray(techStack)) {
      parsedTechStack = techStack;
    }

    // Cloudinary returns the full hosted URL in req.file.path
    let imageUrl: string | null = req.body.imageUrl || null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    try {
      const project = await prisma.project.create({
        data: {
          title,
          slug,
          description,
          category,
          techStack: parsedTechStack,
          liveUrl: liveUrl || null,
          githubUrl: githubUrl || null,
          imageUrl,
          featured: featured === 'true' || featured === true,
        },
      });

      res.status(201).json(project);
    } catch (error: any) {
      console.error('🔥 Error creating project:', error);
      res.status(500).json({ message: error.message || 'Failed to create project' });
    }
  }
);

// @desc    Update an existing project
// @route   PUT /api/projects/:id
// @access  Private / Admin
export const updateProject: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400);
      throw new Error('Please provide a valid project ID');
    }

    const { title, slug, description, category, techStack, liveUrl, githubUrl, featured } = req.body;

    let parsedTechStack: string[] | undefined;
    if (typeof techStack === 'string') {
      parsedTechStack = techStack.split(',').map((tech) => tech.trim()).filter(Boolean);
    } else if (Array.isArray(techStack)) {
      parsedTechStack = techStack;
    }

    // Cloudinary returns the full hosted URL in req.file.path
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    }

    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(slug && { slug }),
          ...(description && { description }),
          ...(category && { category: category as any }),
          ...(parsedTechStack !== undefined && { techStack: parsedTechStack }),
          ...(liveUrl !== undefined && { liveUrl: liveUrl || null }),
          ...(githubUrl !== undefined && { githubUrl: githubUrl || null }),
          ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
          ...(featured !== undefined && { featured: featured === 'true' || featured === true }),
        },
      });

      res.status(200).json(updatedProject);
    } catch (error: any) {
      console.error('🔥 Detailed Error Updating Project:', error);
      res.status(500).json({ 
        message: 'Failed to update project', 
        error: error.message || error 
      });
    }
  }
);
// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private / Admin
export const deleteProject: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400);
      throw new Error('Please provide a valid project ID');
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Project removed successfully' });
  }
);