import { Router } from 'express';
import { getSpendingAnalysis } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/analyze', protect, getSpendingAnalysis);

export default router;