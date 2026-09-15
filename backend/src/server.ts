import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// Ensure uploads folder exists on server start
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Define explicit allowed origins (NO trailing slashes)
const allowedOrigins = [
  'https://jeremiah-zhiya.vercel.app',
  'http://localhost:3000',
  process.env.CLIENT_URL?.replace(/\/$/, ''), // Strips trailing slash if present
].filter(Boolean);

// Dynamic CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Health check route
app.get('/', (_req, res) => {
  res.json({ message: 'API is running' });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler & Terminal Logger
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('====================================');
  console.error('🔥 SERVER ERROR LOGGED TO TERMINAL:');
  console.error(err);
  console.error('====================================');

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});