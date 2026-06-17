import { Router } from 'express';
import { getDashboardStats, getCategoryAnalytics, getMonthlyAnalytics, getLastXDaysAnalytics } from '../controllers/analytics.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/categories', getCategoryAnalytics);
router.get('/monthly', getMonthlyAnalytics);
router.get('/last-days', getLastXDaysAnalytics);

export default router;