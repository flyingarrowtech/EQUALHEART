import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { protectAdmin } from '../middleware/admin.middleware';
import { getStats, getUsers, verifyUser, deleteUser, getReports } from '../controllers/admin.controller';

const router = express.Router();

router.use(protect); // All admin routes require login
router.use(protectAdmin); // All admin routes require admin role

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/verify', verifyUser);
router.delete('/users/:id', deleteUser);
router.get('/reports', getReports);

export default router;
