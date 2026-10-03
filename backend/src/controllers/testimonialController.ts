import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all testimonials (Public)
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// Create a new testimonial (Admin Protected)
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, role, content, avatarUrl, rating, isFeatured } = req.body;
    const newTestimonial = await prisma.testimonial.create({
      data: { name, role, content, avatarUrl, rating: Number(rating) || 5, isFeatured },
    });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

// Update testimonial (Admin Protected)
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID provided' });
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

// Delete testimonial (Admin Protected)
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID provided' });
    }

    await prisma.testimonial.delete({ where: { id } });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};