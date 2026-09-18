// backend/src/routes/authRoutes.ts
import express, { Router } from 'express';
import { loginAdmin } from '../controllers/authController.js';

const router: Router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin user & get JWT access token
 * @access  Public (Role checked internally by controller)
 */
router.post('/login', loginAdmin);

export default router;