import type { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const prisma = new PrismaClient();

export const loginAdmin: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Handle case-insensitive role check (supports both 'ADMIN' and 'admin')
    const userRole = user?.role?.toUpperCase();
    if (!user || userRole !== 'ADMIN') {
      res.status(401).json({ message: 'Invalid credentials or unauthorized access' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Include normalized uppercase role in JWT payload
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'ADMIN' },
      process.env.JWT_SECRET || 'secret_key_change_me',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);