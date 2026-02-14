import { Router } from 'express';
import passport from 'passport';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { registerSchema, loginSchema, verifyOtpSchema } from './auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/verify-otp', validate(verifyOtpSchema), AuthController.verifyOtp);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/resend-otp', AuthController.resendOtp);
router.post('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);
router.post('/refresh', AuthController.refresh); // Support both GET and POST for compatibility

router.post('/mobile-login', AuthController.loginWithMobile);
router.post('/send-mobile-otp', AuthController.sendMobileOtp);

// Social Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), AuthController.socialLoginSuccess);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/login' }), AuthController.socialLoginSuccess);

export default router;
