import express from 'express';
import { userController } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const router = express.Router();

// All user management routes are PROTECTED and only for ADMINS
router.use(protect);
router.use(authorize('admin'));

router.get('/', userController.getAllUsers);
router.patch('/:id/role', userController.updateUserRole);

export default router;
