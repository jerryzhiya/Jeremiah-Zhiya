import express, { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';

const router: Router = express.Router();

router.get('/', getAbout);
router.put('/', updateAbout);

export default router;