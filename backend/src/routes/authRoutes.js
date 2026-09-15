// backend/src/routes/authRoutes.ts
import express, { Router } from 'express';
import { loginAdmin } from '../controllers/authController.js';
const router = express.Router();
router.post('/login', loginAdmin);
export default router;
//# sourceMappingURL=authRoutes.js.map