import { Router } from 'express';
import { getMonthlyPdfReport } from '../controllers/report.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/monthly-pdf', protect, getMonthlyPdfReport);

export default router;