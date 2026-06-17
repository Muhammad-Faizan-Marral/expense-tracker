import { Router } from 'express';
import { getPieChartData, getBarChartData, getLineChartData } from '../controllers/charts.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Secure entire charts endpoints block using global route guard
router.use(protect);

router.get('/pie', getPieChartData);
router.get('/bar', getBarChartData);
router.get('/line', getLineChartData);

export default router;