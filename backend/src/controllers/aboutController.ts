import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js'; // Adjust path to your prisma client file

interface AboutRequestBody {
  name: string;
  title: string;
  location: string;
  bio: string;
  secondaryBio?: string;
}

// GET /api/about
export const getAbout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const about = await prisma.about.findFirst();

    if (!about) {
      return res.status(404).json({ message: 'About profile not found' });
    }

    return res.status(200).json(about);
  } catch (error: any) {
    console.error('❌ Error fetching About profile:', error);
    return res.status(500).json({ 
      message: 'Server Error', 
      error: error.message || error 
    });
  }
};

// PUT /api/about
export const updateAbout = async (req: Request<{}, {}, AboutRequestBody>, res: Response): Promise<Response> => {
  try {
    const { name, title, location, bio, secondaryBio } = req.body;

    const existingAbout = await prisma.about.findFirst();

    // Convert undefined to null so Prisma accepts optional fields cleanly
    const payload = {
      name,
      title,
      location,
      bio,
      secondaryBio: secondaryBio ?? null,
    };

    let updatedAbout;

    if (existingAbout) {
      updatedAbout = await prisma.about.update({
        where: { id: existingAbout.id },
        data: payload,
      });
    } else {
      updatedAbout = await prisma.about.create({
        data: payload,
      });
    }

    return res.status(200).json(updatedAbout);
  } catch (error: any) {
    console.error('❌ Error updating About profile:', {
      error: error.message || error,
      stack: error.stack,
      body: req.body,
    });

    return res.status(500).json({ 
      message: 'Failed to update About profile', 
      error: error.message || error 
    });
  }
};