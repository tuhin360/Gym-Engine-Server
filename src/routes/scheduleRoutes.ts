import express from 'express';
import { scheduleController } from '../controllers/scheduleController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const router = express.Router();

// Public Routes
router.get('/', scheduleController.getSchedules);

// Admin Only Routes
router.post('/', protect, authorize('admin'), scheduleController.createSchedule);
router.patch('/:id', protect, authorize('admin'), scheduleController.updateSchedule);
router.delete('/:id', protect, authorize('admin'), scheduleController.deleteSchedule);

export default router;
