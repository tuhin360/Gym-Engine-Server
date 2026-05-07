import express from 'express';
import { classController } from '../controllers/classController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const router = express.Router();

// Public Routes
router.get('/', classController.getClasses);
router.get('/featured', classController.getFeaturedClasses);

// Admin Only Routes
router.post('/', protect, authorize('admin'), classController.createClass);
router.patch('/:id', protect, authorize('admin'), classController.updateClass);
router.delete('/:id', protect, authorize('admin'), classController.deleteClass);

export default router;
