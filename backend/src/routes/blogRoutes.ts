import express, { Router } from 'express';
import { getBlogs, createBlog, updateBlogPost, deleteBlog } from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router: Router = express.Router();

router.get('/', getBlogs);
router.post('/', requireAdmin, upload.single('coverImage'), createBlog);
router.put('/:id', requireAdmin, upload.single('coverImage'), updateBlogPost);
router.delete('/:id', requireAdmin, deleteBlog);

export default router;