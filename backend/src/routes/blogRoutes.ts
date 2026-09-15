import express, { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlogPost,
  deleteBlog,
  likeBlogPost,
  getBlogComments,
  addBlogComment,
} from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router: Router = express.Router();

// Base routes
router.get('/', getBlogs);
router.post('/', requireAdmin, upload.single('coverImage'), createBlog);

// Slug & ID routes (Note: Place specific sub-routes like /comments and /like BEFORE or along with /:slug)
router.get('/:slug', getBlogBySlug);
router.put('/:id', requireAdmin, upload.single('coverImage'), updateBlogPost);
router.delete('/:id', requireAdmin, deleteBlog);

// Engagement routes
router.post('/:slug/like', likeBlogPost);
router.get('/:slug/comments', getBlogComments);
router.post('/:slug/comments', addBlogComment);

export default router;