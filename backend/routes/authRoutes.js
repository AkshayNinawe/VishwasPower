import express from 'express';
import { register, login, allUsers, validateToken } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', allUsers);
router.get('/validate-token', protect, validateToken);

export default router;
