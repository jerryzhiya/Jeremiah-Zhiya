import express, { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { isCloudinaryConfigured, upload } from '../middleware/uploadMiddleware.js';

const router: Router = express.Router();

// Public route to retrieve testimonials
router.get('/', getTestimonials);

// Image upload route (used by admin form on laptop/phone)
router.post('/upload', requireAdmin, (req, res, next) => {
  if (!isCloudinaryConfigured) {
    return res.status(500).json({
      error: 'Cloudinary is not configured on the server. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to the backend environment.',
    });
  }

  next();
}, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // req.file.path contains the public Cloudinary image URL
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error('Testimonial upload failed:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Admin CRUD routes
router.post('/', requireAdmin, createTestimonial);
router.put('/:id', requireAdmin, updateTestimonial);
router.delete('/:id', requireAdmin, deleteTestimonial);

export default router;