import express from 'express';
import { analyticsController } from '../controllers/analyticsController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const router = express.Router();

// Analytics is only for Admins
router.get('/', protect, authorize('admin'), analyticsController.getDashboardStats);

export default router;
