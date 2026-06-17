import { Router } from 'express';
import { createTransaction, getAllTransactions, updateTransaction, deleteTransaction } from '../controllers/transaction.controller.js';
import { filterTransactions, searchTransactions } from '../controllers/analytics.controller.js'; // New controllers imported
import { protect } from '../middleware/auth.middleware.js';
import { validateBody, transactionSchema } from '../middleware/validate.middleware.js';

const router = Router();
router.use(protect);

router.get('/filter', filterTransactions);
router.get('/search', searchTransactions);


router.post('/', validateBody(transactionSchema), createTransaction);
router.get('/', getAllTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;