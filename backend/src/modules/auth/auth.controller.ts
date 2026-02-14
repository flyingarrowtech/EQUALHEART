import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import generateTokens from '../../utils/generateTokens';
import jwt from 'jsonwebtoken';
import { GoogleAuth } from '../../utils/googleAuth';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.register(req.body);

            res.status(201).json({
                success: true,
                message: 'Registration successful. Please check your email for the 6-digit OTP to verify your account.',
                data: { email: user.email }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.body;
            const user = await AuthService.verifyEmail(token);

            const accessToken = generateTokens(res, user._id.toString());

            res.status(200).json({
                success: true,
                message: 'Email verified successfully',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        isVerified: user.isVerified
                    },
                    accessToken
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            const user = await AuthService.verifyOtp(email, otp);

            const accessToken = generateTokens(res, user._id.toString());

            res.status(200).json({
                success: true,
                message: 'Email verified successfully',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName
                    },
                    accessToken
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);

            const accessToken = generateTokens(res, user._id.toString());

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName
                    },
                    accessToken
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken');
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } catch (error: any) {
            next(error);
        }
    }

    static async resendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await AuthService.resendOtp(email);
            res.status(200).json({ success: true, message: 'OTP resent successfully' });
        } catch (error: any) {
            next(error);
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'secret') as any;
            const accessToken = generateTokens(res, decoded.userId);

            res.status(200).json({ success: true, data: { accessToken } });
        } catch (error: any) {
            next(error);
        }
    }

    static async sendMobileOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { mobileNumber } = req.body;
            if (!mobileNumber) return res.status(400).json({ success: false, message: 'Mobile number is required' });

            await AuthService.sendMobileOtp(mobileNumber);
            res.status(200).json({ success: true, message: 'OTP sent to mobile number' });
        } catch (error: any) {
            next(error);
        }
    }

    static async loginWithMobile(req: Request, res: Response, next: NextFunction) {
        try {
            const { mobileNumber, otp } = req.body;
            if (!mobileNumber || !otp) return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });

            const user = await AuthService.loginWithMobile(mobileNumber, otp);
            const accessToken = generateTokens(res, user._id.toString());

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName
                    },
                    accessToken
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async getGoogleAuthUrl(req: Request, res: Response) {
        try {
            const url = GoogleAuth.getAuthUrl();
            res.status(200).json({ success: true, url });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.body;
            if (!code) return res.status(400).json({ success: false, message: 'Auth code is required' });

            const tokens = await GoogleAuth.getTokens(code);
            const userInfo = await GoogleAuth.getUserInfo(tokens.id_token);

            const user = await AuthService.googleAuth(userInfo);
            const accessToken = generateTokens(res, user._id.toString());

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        isVerified: user.isVerified
                    },
                    accessToken
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

}
