import express from 'express';
import { register, login, allUsers } from '../controller/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', allUsers)

export default router;