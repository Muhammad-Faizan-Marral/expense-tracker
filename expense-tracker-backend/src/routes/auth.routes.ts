import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateBody, registerSchema, loginSchema } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;