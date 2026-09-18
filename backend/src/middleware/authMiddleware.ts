import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  adminId?: string;
  role?: string;
}

interface JwtPayload {
  id: string;
  email?: string;
  role?: string;
}

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Extract token from Authorization header (Format: Bearer <token>)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : null;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Access token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret_key_change_me'
    ) as JwtPayload;

    // Reject non-admin tokens (handles case-insensitive role check)
    const normalizedRole = decoded.role?.toUpperCase();
    if (normalizedRole !== 'ADMIN') {
      res.status(403).json({ message: 'Forbidden: Admin access required' });
      return;
    }

    // Attach decoded details to request object for downstream controllers
    req.adminId = decoded.id;
    req.role = normalizedRole;
    
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired access token' });
    return;
  }
};