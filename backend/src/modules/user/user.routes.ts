import { Router } from 'express';
import { UserController } from './user.controller';
import { protect } from '../../middleware/auth.middleware';
import { upload, processPhotos } from '../../middleware/upload';
import { validate } from '../../middleware/validate';
import { updateProfileSchema, logBehaviorSchema, upgradeMembershipSchema } from './user.validation';

const router = Router();

router.get('/dashboard', protect, UserController.getDashboardData);
router.get('/profile', protect, UserController.getProfile);
router.get('/profile/:id', protect, UserController.getPublicProfile);
router.patch('/profile', protect, validate(updateProfileSchema), UserController.updateProfile);
router.get('/search', protect, UserController.searchProfiles);
router.get('/matches', protect, UserController.getMatches);
router.get('/visitors', protect, UserController.getVisitors);
router.get('/shortlisted', protect, UserController.getShortlisted);
router.get('/interests', protect, UserController.getInterests);
router.post('/interests/:id/accept', protect, UserController.acceptInterest);
router.post('/interests/:id/reject', protect, UserController.rejectInterest);
router.post('/membership/upgrade', protect, validate(upgradeMembershipSchema), UserController.upgradeMembership);
router.post('/block/:id', protect, UserController.blockUser);
router.post('/unblock/:id', protect, UserController.unblockUser);
router.post('/report/:id', protect, UserController.reportUser);
router.post('/shortlist/:id', protect, UserController.toggleShortlist);
router.post('/photos', protect, upload.array('photos', 5), processPhotos, UserController.uploadPhotos);
router.delete('/photos/:photoId', protect, UserController.deletePhoto);
router.patch('/photos/:photoId/main', protect, UserController.setMainPhoto);
router.post('/log-behavior', protect, validate(logBehaviorSchema), UserController.logBehavior);
router.get('/ice-breakers/:id', protect, UserController.getIceBreakers);
router.post('/verify-identity', protect, upload.single('idProof'), UserController.verifyIdentity);

export default router;
