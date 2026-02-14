import { Router } from 'express';
import { AdminController } from './admin.controller';
import { protect } from '../../middleware/auth.middleware';
import { requireAdmin } from './admin.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.get('/stats', protect, requireAdmin, AdminController.getStats);
router.get('/users', protect, requireAdmin, AdminController.getUsers);
router.delete('/users/:userId', protect, requireAdmin, AdminController.deleteUser);

export default router;
