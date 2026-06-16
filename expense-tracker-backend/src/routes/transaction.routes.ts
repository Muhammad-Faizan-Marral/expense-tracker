import { Router } from 'express';
import { 
  createTransaction, 
  getAllTransactions, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transaction.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateBody, transactionSchema } from '../middleware/validate.middleware.js'; // We previously created this schema

const router = Router();

// Sub routes protected hain by 'protect' jwt guard
router.use(protect);

router.post('/', validateBody(transactionSchema), createTransaction);
router.get('/', getAllTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;