import express, { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js'; // Import your upload middleware

const router: Router = express.Router();

// Public route to retrieve testimonials
router.get('/', getTestimonials);

// Image upload route (used by admin form on laptop/phone)
router.post('/upload', requireAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // req.file.path contains the public Cloudinary image URL
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Admin CRUD routes
router.post('/', requireAdmin, createTestimonial);
router.put('/:id', requireAdmin, updateTestimonial);
router.delete('/:id', requireAdmin, deleteTestimonial);

export default router;