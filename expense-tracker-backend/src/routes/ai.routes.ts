import { Router } from 'express';
import { getSpendingAnalysis } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Route protected ha secure middleware kay sath
router.post('/analyze', protect, getSpendingAnalysis);

export default router;