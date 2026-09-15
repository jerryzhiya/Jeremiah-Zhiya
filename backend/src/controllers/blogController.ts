import type { Request, Response, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prisma.js';

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: true,
      },
    });

    res.status(200).json(blogs);
  }
);

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug as string;

    if (!slug) {
      res.status(400);
      throw new Error('Please provide a valid blog slug');
    }

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.status(200).json(blog);
  }
);
// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private / Admin
export const createBlog: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { title, slug, content, summary, readTime, tags, published } = req.body;

    if (!title || !slug || !content || !summary) {
      res.status(400);
      throw new Error('Title, slug, content, and summary are required fields');
    }

    const existingBlog = await prisma.blogPost.findUnique({
      where: { slug: slug as string },
    });

    if (existingBlog) {
      res.status(409);
      throw new Error('A blog post with this slug already exists');
    }

    // Cloudinary returns the full secure URL in req.file.path
    let imageUrl: string | null = req.body.imageUrl || null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    let parsedTags: string[] = [];
    if (typeof tags === 'string' && tags.trim() !== '') {
      parsedTags = tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        summary,
        imageUrl,
        readTime: readTime || '5 min read',
        tags: parsedTags,
        published: published === 'true' || published === true,
      },
    });

    res.status(201).json(blog);
  }
);

// @desc    Update an existing blog post
// @route   PUT /api/blogs/:id
// @access  Private / Admin
export const updateBlogPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const { title, slug, summary, content, tags, readTime, published } = req.body;

    if (!id) {
      res.status(400);
      throw new Error('Please provide a valid blog ID');
    }

    let parsedTags: string[] | undefined;
    if (typeof tags === 'string') {
      parsedTags = tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    // Cloudinary returns the full secure URL in req.file.path
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    }

    try {
      const updatedPost = await prisma.blogPost.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(slug && { slug }),
          ...(summary && { summary }),
          ...(content && { content }),
          ...(parsedTags && { tags: parsedTags }),
          ...(readTime && { readTime }),
          ...(imageUrl !== undefined && { imageUrl }),
          ...(published !== undefined && { published: published === 'true' || published === true }),
        },
      });

      res.status(200).json(updatedPost);
    } catch (error: any) {
      console.error('🔥 Error updating blog post:', error);
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  }
);

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private / Admin
export const deleteBlog: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400);
      throw new Error('Please provide a valid blog ID');
    }

    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Blog post removed successfully' });
  }
);

// @desc    Increment likes for a blog post
// @route   POST /api/blogs/:slug/like
// @access  Public
export const likeBlogPost: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug as string;

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const updatedBlog = await prisma.blogPost.update({
      where: { slug },
      data: {
        likes: { increment: 1 },
      },
    });

    res.status(200).json({ success: true, likes: updatedBlog.likes });
  }
);

// @desc    Get comments for a specific blog post
// @route   GET /api/blogs/:slug/comments
// @access  Public
export const getBlogComments: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug as string;

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.status(200).json(blog.comments);
  }
);

// @desc    Add a comment to a blog post
// @route   POST /api/blogs/:slug/comments
// @access  Public
export const addBlogComment: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug as string;
    const { author, content } = req.body;

    if (!author || !content) {
      res.status(400);
      throw new Error('Author name and comment content are required');
    }

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const comment = await prisma.comment.create({
      data: {
        author,
        content,
        blogPostId: blog.id,
      },
    });

    res.status(201).json(comment);
  }
);