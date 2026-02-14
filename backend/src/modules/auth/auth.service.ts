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

        // Check if we're in development mode without SMTP configured
        const isDevelopmentWithoutSMTP = !process.env.SMTP_HOST || !process.env.SMTP_USER;

        let otp: string | undefined;
        let otpExpiresAt: Date | undefined;
        let isVerified = false;

        if (isDevelopmentWithoutSMTP) {
            // In development without SMTP, auto-verify the user
            isVerified = true;
            console.log('\n🔓 ========== AUTO-VERIFIED (Development Mode) ==========');
            console.log(`Email: ${email}`);
            console.log(`User has been automatically verified for development.`);
            console.log(`You can login immediately without email verification.`);
            console.log('========================================================\n');
        } else {
            // In production or with SMTP configured, use OTP verification
            otp = Math.floor(100000 + Math.random() * 900000).toString();
            otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        }

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
        });

        // Only send email if SMTP is configured
        if (!isDevelopmentWithoutSMTP && otp) {
            await sendEmail({
                email: user.email,
                subject: 'Verify your EqualHeart Account',
                message: `Your OTP for account verification is ${otp}. It will expire in 10 minutes.`,
            });
        }

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
    static async generateEmailVerificationToken(userId: string): Promise<string> {
        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        await User.findByIdAndUpdate(userId, {
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        return token;
    }

    static async sendVerificationEmail(user: IUser, token: string) {
        const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email?token=${token}`;

        await sendEmail({
            email: user.email,
            subject: 'Verify your EqualHeart Account',
            message: `Please verify your email by clicking on the following link: ${verificationUrl}\n\nThis link will expire in 24 hours.`
        });
    }

    static async verifyEmail(token: string): Promise<IUser> {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpiresAt: { $gt: new Date() }
        });

        if (!user) throw new Error('Invalid or expired verification token');

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpiresAt = undefined;
        await user.save();

        return user;
    }
}
