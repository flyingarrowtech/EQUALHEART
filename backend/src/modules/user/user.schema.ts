import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    mobileNumber: string;
    password?: string;
    isVerified: boolean;
    role: 'user' | 'admin';
    otp?: string;
    otpExpiresAt?: Date;

    emailVerificationToken?: string;
    emailVerificationTokenExpiresAt?: Date;

    // specific OTPs
    mobileOtp?: string;
    mobileOtpExpiresAt?: Date;

    kycStatus: 'Pending' | 'Verified' | 'Rejected' | 'None';
    profileCompleted: boolean;

    // Basic Account Information
    profileCreatedFor: 'Self' | 'Son' | 'Daughter' | 'Brother' | 'Sister' | 'Friend' | 'Relative';

    // Personal Details
    fullName: {
        firstName: string;
        lastName: string;
    };
    gender: 'Male' | 'Female' | 'Transgender';
    dateOfBirth: Date;
    age: number;
    height: string;
    maritalStatus: 'Never Married' | 'Divorced' | 'Widowed' | 'Separated';
    motherTongue: string;
    religion: string;
    community?: string;
    caste?: string;
    subCaste?: string;
    nakshatram?: string;
    rashi?: string;
    manglik: 'Yes' | 'No';
    bodyType: string;
    complexion: string;

    // Disability
    isDisabled: boolean;
    disabilityType?: string;
    disabilityDescription?: string;
    accessibilityNeeds?: string;

    // Background & Location
    country: string;
    state: string;
    city: string;
    citizenship: string;
    nativePlace?: string;
    residentialType: 'Own' | 'Rented';
    nriStatus: boolean;

    // Education & Professional
    highestEducation: string;
    collegeName?: string;
    professionalQualification?: string;
    occupation: string;
    annualIncome: number;
    officeAddress?: string;
    officePhoneNumber?: string;

    // Family
    fatherName: string;
    fatherOccupation: string;
    gotra?: string;
    motherName: string;
    motherOccupation: string;
    numberOfSiblings: {
        brothers: { married: number; unmarried: number };
        sisters: { married: number; unmarried: number };
    };
    familyType: 'Joint Family' | 'Nuclear Family';
    familyValues: 'Traditional' | 'Modern' | 'Moderate';
    familyFinancialStatus: string;

    // Lifestyle
    hobbies: string[];
    interests: string[];
    aboutMe: string;
    partnerPreferences: {
        ageRange?: { min: number; max: number };
        heightRange?: { min: string; max: string };
        religions?: string[];
        educations?: string[];
        occupations?: string[];
        locations?: string[];
    };
    dietaryHabits: 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian';
    smoking: 'Yes' | 'No' | 'Occasionally';
    drinking: 'Yes' | 'No' | 'Occasionally';

    // Social Authentication
    socialAuth?: {
        provider: 'Google' | 'Facebook';
        id: string;
    }[];

    // Privacy & Security Settings
    privacySettings: {
        profileVisibility: 'Public' | 'Members' | 'OnlyMe';
        phoneVisibility: 'Public' | 'Request' | 'OnlyMe';
        contactVisibility: 'Public' | 'PremiumOnly' | 'OnlyMe';
    };

    // Membership & Premium
    membership: {
        tier: 'Basic' | 'Silver' | 'Gold' | 'Platinum';
        startDate?: Date;
        expiryDate?: Date;
    };

    interactionStats: {
        interestsSentToday: number;
        lastInterestSentAt?: Date;
        interestsLimit: number;
    };

    profileVisitors: {
        visitorId: mongoose.Types.ObjectId;
        visitedAt: Date;
    }[];

    // User Status & Interactions
    blockedUsers: mongoose.Types.ObjectId[];
    shortlistedUsers: mongoose.Types.ObjectId[];
    reportedBy: mongoose.Types.ObjectId[];
    matches: mongoose.Types.ObjectId[];
    matchingScore?: number; // Calculated field for AI matching

    // Photos & Verification
    photos: {
        url: string;
        isMain: boolean;
        isVerified: boolean;
        publicId?: string;
        metadata?: {
            thumbnailUrl?: string;
            watermarkedUrl?: string;
        };
    }[];
    governmentIdProof?: {
        type: string;
        url: string;
        isVerified: boolean;
    };

    // Advanced Ecosystem Features (Page 2)
    behavioralLogs: {
        action: 'View' | 'Like' | 'Dislike' | 'Message';
        targetId: mongoose.Types.ObjectId;
        timestamp: Date;
    }[];

    blockchainData?: {
        hash: string;
        verifiedAt: Date;
        txId?: string;
    };

    gamification: {
        points: number;
        badges: string[];
    };

    comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, unique: true, sparse: true },
    password: { type: String, select: false },
    isVerified: { type: Boolean, default: false }, // Overall profile verification
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    kycStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected', 'None'], default: 'None' },
    profileCompleted: { type: Boolean, default: false },

    otp: { type: String, select: false },
    otpExpiresAt: { type: Date, select: false },

    emailVerificationToken: { type: String, select: false },
    emailVerificationTokenExpiresAt: { type: Date, select: false },

    // Mobile OTP (Optional/Future use)
    mobileOtp: { type: String, select: false },
    mobileOtpExpiresAt: { type: Date, select: false },

    socialAuth: [{
        provider: { type: String, enum: ['Google', 'Facebook'] },
        id: { type: String }
    }],

    privacySettings: {
        profileVisibility: { type: String, enum: ['Public', 'Members', 'OnlyMe'], default: 'Public' },
        phoneVisibility: { type: String, enum: ['Public', 'Request', 'OnlyMe'], default: 'Request' },
        contactVisibility: { type: String, enum: ['Public', 'PremiumOnly', 'OnlyMe'], default: 'PremiumOnly' }
    },

    membership: {
        tier: { type: String, enum: ['Basic', 'Silver', 'Gold', 'Platinum'], default: 'Basic' },
        startDate: { type: Date },
        expiryDate: { type: Date }
    },

    interactionStats: {
        interestsSentToday: { type: Number, default: 0 },
        lastInterestSentAt: { type: Date },
        interestsLimit: { type: Number, default: 5 } // Default limit for basic users
    },

    profileVisitors: [{
        visitorId: { type: Schema.Types.ObjectId, ref: 'User' },
        visitedAt: { type: Date, default: Date.now }
    }],

    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shortlistedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reportedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matchingScore: { type: Number, default: 0 },

    profileCreatedFor: { type: String, enum: ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'] },

    fullName: {
        firstName: { type: String },
        lastName: { type: String }
    },
    gender: { type: String, enum: ['Male', 'Female', 'Transgender'] },
    dateOfBirth: { type: Date },
    age: { type: Number },
    height: { type: String },
    maritalStatus: { type: String, enum: ['Never Married', 'Divorced', 'Widowed', 'Separated'] },
    motherTongue: { type: String },
    religion: { type: String },
    community: { type: String },
    caste: { type: String },
    subCaste: { type: String },
    nakshatram: { type: String },
    rashi: { type: String },
    manglik: { type: String, enum: ['Yes', 'No'] },
    bodyType: { type: String },
    complexion: { type: String },

    isDisabled: { type: Boolean, default: false },
    disabilityType: {
        type: String,
        enum: [
            'Blindness', 'Low-vision', 'Leprosy Cured Persons', 'Hearing Impairment',
            'Locomotor Disability', 'Dwarfism', 'Intellectual Disability', 'Mental Illness',
            'Autism Spectrum Disorder', 'Cerebral Palsy', 'Muscular Dystrophy',
            'Chronic Neurological Conditions', 'Specific Learning Disabilities',
            'Multiple Sclerosis', 'Speech and Language Disability', 'Thalassemia',
            'Hemophilia', 'Sickle Cell Disease', 'Multiple Disabilities',
            'Acid Attack Victim', 'Parkinson\'s Disease'
        ]
    },
    disabilityDescription: { type: String },
    accessibilityNeeds: { type: String },

    country: { type: String },
    state: { type: String },
    city: { type: String },
    citizenship: { type: String },
    nativePlace: { type: String },
    residentialType: { type: String, enum: ['Own', 'Rented'] },
    nriStatus: { type: Boolean, default: false },

    highestEducation: { type: String },
    collegeName: { type: String },
    professionalQualification: { type: String },
    occupation: { type: String },
    annualIncome: { type: Number },
    officeAddress: { type: String },
    officePhoneNumber: { type: String },

    fatherName: { type: String },
    fatherOccupation: { type: String },
    gotra: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    numberOfSiblings: {
        brothers: {
            married: { type: Number, default: 0 },
            unmarried: { type: Number, default: 0 }
        },
        sisters: {
            married: { type: Number, default: 0 },
            unmarried: { type: Number, default: 0 }
        }
    },
    familyType: { type: String, enum: ['Joint Family', 'Nuclear Family'] },
    familyValues: { type: String, enum: ['Traditional', 'Modern', 'Moderate'] },
    familyFinancialStatus: { type: String },

    hobbies: [{ type: String }],
    interests: [{ type: String }],
    aboutMe: { type: String },
    partnerPreferences: {
        ageRange: {
            min: { type: Number },
            max: { type: Number }
        },
        heightRange: {
            min: { type: String },
            max: { type: String }
        },
        religions: [{ type: String }],
        educations: [{ type: String }],
        occupations: [{ type: String }],
        locations: [{ type: String }]
    },
    dietaryHabits: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian'] },
    smoking: { type: String, enum: ['Yes', 'No', 'Occasionally'] },
    drinking: { type: String, enum: ['Yes', 'No', 'Occasionally'] },

    photos: [{
        url: { type: String },
        isMain: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        publicId: { type: String },
        metadata: {
            thumbnailUrl: { type: String },
            watermarkedUrl: { type: String }
        }
    }],
    governmentIdProof: {
        type: { type: String },
        url: { type: String },
        isVerified: { type: Boolean, default: false }
    },

    // behavioral tracking for AI
    behavioralLogs: [{
        action: { type: String, enum: ['View', 'Like', 'Dislike', 'Message'] },
        targetId: { type: Schema.Types.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now }
    }],

    // Blockchain record
    blockchainData: {
        hash: { type: String },
        verifiedAt: { type: Date },
        txId: { type: String }
    },

    // Engagement features
    gamification: {
        points: { type: Number, default: 0 },
        badges: [{ type: String }]
    }
}, { timestamps: true });

UserSchema.pre('save', async function (this: any) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password!, 10);
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
};

export default mongoose.model<IUser>('User', UserSchema);
