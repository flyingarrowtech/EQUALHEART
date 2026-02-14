import User, { IUser } from '../user/user.schema';
import crypto from 'crypto';
import sendEmail from '../../utils/sendEmail';

export class AuthService {
    static async register(userData: Partial<IUser>): Promise<IUser> {
        const { email, mobileNumber } = userData;

        // Check for existing user by email (mobileNumber is now optional)
        const existingUser = await User.findOne({
            $or: [
                { email },
                ...(mobileNumber ? [{ mobileNumber }] : [])
            ]
        });

        if (existingUser) {
            throw new Error('User with this email or mobile number already exists');
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Generate Verification Token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const isVerified = false;

        console.log('\n🔐 ========== REGISTRATION DETAILS ==========');
        console.log(`Email: ${email}`);
        console.log(`OTP: ${otp}`);
        console.log(`Token: ${verificationToken}`);
        console.log('============================================\n');

        // Calculate age if dob is provided
        let age: number | undefined;
        if (userData.dateOfBirth) {
            const birthDate = new Date(userData.dateOfBirth);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }

        // Set default values for optional fields
        const user = await User.create({
            ...userData,
            age,
            profileCreatedFor: userData.profileCreatedFor || 'Self', // Default to 'Self'
            isVerified,
            otp,
            otpExpiresAt,
            emailVerificationToken: verificationToken,
            emailVerificationTokenExpiresAt: verificationTokenExpiresAt,
        });

        // Send email
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
        await sendEmail({
            email: user.email,
            subject: 'Verify your EqualHeart Account',
            message: `Your OTP for account verification is ${otp}. It will expire in 10 minutes.\n\nAlternatively, you can verify your account by clicking the link below:\n${verificationUrl}`,
        });

        return user;
    }

    static async verifyEmail(token: string): Promise<IUser> {
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationTokenExpiresAt: { $gt: new Date() }
        });

        if (!user) {
            throw new Error('Invalid or expired verification link');
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpiresAt = undefined;
        await user.save();

        return user;
    }

    static async verifyOtp(email: string, otp: string): Promise<IUser> {
        const user = await User.findOne({ email }).select('+otp +otpExpiresAt');
        if (!user) throw new Error('User not found');

        if (user.otp !== otp || (user.otpExpiresAt && user.otpExpiresAt < new Date())) {
            throw new Error('Invalid or expired OTP');
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        return user;
    }

    static async login(email: string, password?: string): Promise<IUser> {
        if (!password) throw new Error('Password is required');

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid email or password');
        }

        if (!user.isVerified) {
            throw new Error('Please verify your account first');
        }

        return user;
    }

    static async resendOtp(email: string): Promise<void> {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendEmail({
            email: user.email,
            subject: 'Your New OTP - EqualHeart',
            message: `Your new OTP for account verification is ${otp}. It will expire in 10 minutes.`,
        });
    }

    static async sendMobileOtp(mobileNumber: string): Promise<void> {
        const user = await User.findOne({ mobileNumber });
        if (!user) throw new Error('User not found with this mobile number');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.mobileOtp = otp;
        user.mobileOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        // In production, integrate with SMS provider (Twilio/MSG91)
        console.log(`[MOBILE OTP] Sent to ${mobileNumber}: ${otp}`);
    }

    static async loginWithMobile(mobileNumber: string, otp: string): Promise<IUser> {
        const user = await User.findOne({ mobileNumber }).select('+mobileOtp +mobileOtpExpiresAt');
        if (!user) throw new Error('User not found');

        if (user.mobileOtp !== otp || (user.mobileOtpExpiresAt && user.mobileOtpExpiresAt < new Date())) {
            throw new Error('Invalid or expired OTP');
        }

        user.mobileOtp = undefined;
        user.mobileOtpExpiresAt = undefined;
        await user.save();

        return user;
    }
    static async googleAuth(googleProfile: any): Promise<IUser> {
        const { email, given_name, family_name, sub: googleId } = googleProfile;

        let user = await User.findOne({
            $or: [
                { 'socialAuth.id': googleId, 'socialAuth.provider': 'Google' },
                { email }
            ]
        });

        if (!user) {
            // Create new user
            user = await User.create({
                email,
                fullName: {
                    firstName: given_name,
                    lastName: family_name || ''
                },
                socialAuth: [{ provider: 'Google', id: googleId }],
                isVerified: true,
                profileCreatedFor: 'Self'
            });
        } else {
            // if user exists but doesn't have this social auth linked
            const hasGoogle = user.socialAuth?.some(auth => auth.provider === 'Google' && auth.id === googleId);
            if (!hasGoogle) {
                if (!user.socialAuth) user.socialAuth = [];
                user.socialAuth.push({ provider: 'Google', id: googleId });
                user.isVerified = true;
                await user.save();
            }
        }

        return user;
    }
}
