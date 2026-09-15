import express, { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import type { Request, Response, NextFunction } from 'express';

const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error('🔥 MULTER FILE ERROR:', err);
      res.status(400).json({ message: err.message });
      return;
    }
    next();
  });
};

const router: Router = express.Router();

router.get('/', getProjects);
router.post('/', requireAdmin, handleUpload, createProject);
router.put('/:id', requireAdmin, handleUpload, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;