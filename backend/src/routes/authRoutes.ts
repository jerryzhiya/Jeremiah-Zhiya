// backend/src/routes/authRoutes.ts
import express, { Router } from 'express';
import { loginAdmin } from '../controllers/authController.js';

const router: Router = express.Router();
router.post('/login', loginAdmin);

export default router;