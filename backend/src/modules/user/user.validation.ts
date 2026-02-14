import { z } from 'zod';

export const updateProfileSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(2).optional(),
        lastName: z.string().min(2).optional(),
    }).optional(),
    gender: z.enum(['Male', 'Female', 'Transgender']).optional(),
    dateOfBirth: z.string().optional(),
    maritalStatus: z.string().optional(),
    religion: z.string().optional(),
    motherTongue: z.string().optional(),
    community: z.string().optional(),
    caste: z.string().optional(),
    height: z.string().optional(),
    weight: z.number().optional(),
    bloodGroup: z.string().optional(),
    highestEducation: z.string().optional(),
    occupation: z.string().optional(),
    annualIncome: z.number().optional(),
    workLocation: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    hobbies: z.array(z.string()).optional(),
    aboutMe: z.string().max(1000).optional(),
});

export const uploadPhotosSchema = z.object({
    // Multer handles the files, but we can validate metadata if needed
});

export const logBehaviorSchema = z.object({
    targetId: z.string(),
    action: z.enum(['View', 'Like', 'Dislike', 'Message']),
});

export const upgradeMembershipSchema = z.object({
    tier: z.enum(['Basic', 'Silver', 'Gold', 'Platinum']),
    paymentMethod: z.string().optional(),
    transactionId: z.string().optional(),
});
