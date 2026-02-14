import api from '../hooks/api';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ProfileUpdateData {
    fullName?: { firstName: string; middleName?: string; lastName: string };
    dateOfBirth?: string;
    gender?: 'Male' | 'Female' | 'Transgender';
    mobileNumber?: string;
    officePhoneNumber?: string;
    religion?: string;
    caste?: string;
    subCaste?: string;
    maritalStatus?: string;
    height?: string;
    weight?: number;
    bodyType?: string;
    complexion?: string;
    physicalStatus?: string;
    eatingHabits?: string;
    drinkingHabits?: string;
    smokingHabits?: string;
    motherTongue?: string;
    languagesKnown?: string[];
    hobbies?: string[];
    interests?: string[];
    education?: string;
    educationDetails?: string;
    occupation?: string;
    employedIn?: string;
    annualIncome?: number;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
    };
    familyDetails?: {
        fatherName?: string;
        fatherOccupation?: string;
        motherName?: string;
        motherOccupation?: string;
        brothers?: number;
        sisters?: number;
        familyType?: string;
        familyValues?: string;
        familyStatus?: string;
        familyIncome?: number;
    };
    partnerPreferences?: {
        ageRange?: { min: number; max: number };
        heightRange?: { min: string; max: string };
        maritalStatus?: string[];
        religion?: string[];
        caste?: string[];
        education?: string[];
        occupation?: string[];
        country?: string[];
        state?: string[];
        city?: string[];
    };
    privacySettings?: {
        profileVisibility?: 'Public' | 'MembersOnly' | 'Premium';
        photoVisibility?: 'Public' | 'MembersOnly' | 'Premium' | 'OnlyMe';
        phoneVisibility?: 'Public' | 'MembersOnly' | 'Request' | 'OnlyMe';
        horoscopeVisibility?: 'Public' | 'MembersOnly' | 'Request' | 'OnlyMe';
    };
    aboutMe?: string;
}

export interface SearchFilters {
    ageMin?: number;
    ageMax?: number;
    heightMin?: number;
    heightMax?: number;
    religion?: string;
    caste?: string;
    maritalStatus?: string;
    education?: string;
    occupation?: string;
    country?: string;
    state?: string;
    city?: string;
    gender?: string;
}

export interface Interest {
    _id: string;
    from: any;
    to: any;
    status: 'Pending' | 'Accepted' | 'Rejected';
    message?: string;
    createdAt: string;
}

// ============================================================================
// PROFILE MANAGEMENT
// ============================================================================

/**
 * Get the current user's profile
 */
export const getProfile = async () => {
    const response = await api.get('/user/profile');
    return response.data;
};

/**
 * Get a public profile by user ID
 */
export const getPublicProfile = async (userId: string) => {
    const response = await api.get(`/user/profile/${userId}`);
    return response.data;
};

/**
 * Update the current user's profile
 */
export const updateProfile = async (data: ProfileUpdateData) => {
    const response = await api.patch('/user/profile', data);
    return response.data;
};

/**
 * Search for profiles based on filters
 */
export const searchProfiles = async (filters: SearchFilters) => {
    const response = await api.get('/user/search', { params: filters });
    return response.data;
};

// ============================================================================
// MATCHING & DISCOVERY
// ============================================================================

/**
 * Get compatibility matches for the current user
 */
export const getMatches = async () => {
    const response = await api.get('/user/matches');
    return response.data;
};

/**
 * Get profile visitors (Premium feature)
 */
export const getVisitors = async () => {
    const response = await api.get('/user/visitors');
    return response.data;
};

/**
 * Get shortlisted profiles
 */
export const getShortlisted = async () => {
    const response = await api.get('/user/shortlisted');
    return response.data;
};

/**
 * Toggle shortlist status for a user
 */
export const toggleShortlist = async (userId: string) => {
    const response = await api.post(`/user/shortlist/${userId}`);
    return response.data;
};

// ============================================================================
// INTERESTS
// ============================================================================

/**
 * Get interests (sent or received)
 */
export const getInterests = async (type: 'sent' | 'received' = 'received') => {
    const response = await api.get(`/user/interests?type=${type}`);
    return response.data;
};

/**
 * Accept an interest
 */
export const acceptInterest = async (interestId: string) => {
    const response = await api.post(`/user/interests/${interestId}/accept`);
    return response.data;
};

/**
 * Reject an interest
 */
export const rejectInterest = async (interestId: string) => {
    const response = await api.post(`/user/interests/${interestId}/reject`);
    return response.data;
};

// ============================================================================
// USER INTERACTIONS
// ============================================================================

/**
 * Block a user
 */
export const blockUser = async (userId: string) => {
    const response = await api.post(`/user/block/${userId}`);
    return response.data;
};

/**
 * Unblock a user
 */
export const unblockUser = async (userId: string) => {
    const response = await api.post(`/user/unblock/${userId}`);
    return response.data;
};

/**
 * Report a user
 */
export const reportUser = async (userId: string) => {
    const response = await api.post(`/user/report/${userId}`);
    return response.data;
};

/**
 * Log user behavior for analytics and recommendations
 */
export const logBehavior = async (targetId: string, action: string) => {
    const response = await api.post('/user/log-behavior', { targetId, action });
    return response.data;
};

/**
 * Get ice breakers (conversation starters) for a user
 */
export const getIceBreakers = async (userId: string) => {
    const response = await api.get(`/user/ice-breakers/${userId}`);
    return response.data;
};

// ============================================================================
// PHOTO MANAGEMENT
// ============================================================================

/**
 * Upload photos
 */
export const uploadPhotos = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('photos', file);
    });

    const response = await api.post('/user/photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Delete a photo
 */
export const deletePhoto = async (photoId: string) => {
    const response = await api.delete(`/user/photos/${photoId}`);
    return response.data;
};

/**
 * Set a photo as the main profile photo
 */
export const setMainPhoto = async (photoId: string) => {
    const response = await api.patch(`/user/photos/${photoId}/main`);
    return response.data;
};

// ============================================================================
// VERIFICATION & MEMBERSHIP
// ============================================================================

/**
 * Upload identity document for verification
 */
export const verifyIdentity = async (idType: string, file: File) => {
    const formData = new FormData();
    formData.append('idProof', file);
    formData.append('idType', idType);

    const response = await api.post('/user/verify-identity', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Upgrade membership tier
 */
export const upgradeMembership = async (
    tier: 'Silver' | 'Gold' | 'Platinum',
    paymentMethod: string,
    transactionId: string
) => {
    const response = await api.post('/user/membership/upgrade', {
        tier,
        paymentMethod,
        transactionId,
    });
    return response.data;
};

// ============================================================================
// EXPORT ALL
// ============================================================================

const userApi = {
    // Profile
    getProfile,
    getPublicProfile,
    updateProfile,
    searchProfiles,

    // Matching & Discovery
    getMatches,
    getVisitors,
    getShortlisted,
    toggleShortlist,

    // Interests
    getInterests,
    acceptInterest,
    rejectInterest,

    // User Interactions
    blockUser,
    unblockUser,
    reportUser,
    logBehavior,
    getIceBreakers,

    // Photos
    uploadPhotos,
    deletePhoto,
    setMainPhoto,

    // Verification & Membership
    verifyIdentity,
    upgradeMembership,
};

export default userApi;
