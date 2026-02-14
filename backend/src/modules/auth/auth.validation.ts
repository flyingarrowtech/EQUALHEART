import { z } from 'zod';

// Simplified registration schema - only essential fields required
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    fullName: z.object({
        firstName: z.string().min(2, 'First name must be at least 2 characters'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    }),
    gender: z.enum(['Male', 'Female', 'Transgender']),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    mobileNumber: z.string().optional(), // Optional field
    age: z.number().optional(), // Calculated on frontend
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is required'),
});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, 'OTP must be 6 digits'),
});
