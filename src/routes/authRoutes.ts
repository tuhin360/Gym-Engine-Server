import express from 'express';
import { authController } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Example: Only admins can get all users (to be implemented)
// router.get('/users', protect, authorize('admin'), authController.getAllUsers);

export default router;
