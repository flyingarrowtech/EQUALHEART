import User, { IUser } from './user.schema';
import { BehaviorService } from './behavior.service';

export class UserService {
    static async getProfile(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }

    static async updateProfile(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        // Basic age calculation if DOB is updated
        if (updateData.dateOfBirth) {
            const dob = new Date(updateData.dateOfBirth);
            if (!isNaN(dob.getTime())) {
                const ageDifMs = Date.now() - dob.getTime();
                const ageDate = new Date(ageDifMs);
                updateData.age = Math.abs(ageDate.getUTCFullYear() - 1970);
                console.log(`Calculated age for ${updateData.dateOfBirth}: ${updateData.age}`);
            } else {
                console.warn(`Invalid dateOfBirth received: ${updateData.dateOfBirth}`);
                delete updateData.dateOfBirth;
            }
        }

        // Handle isDisabled and its related fields
        const isDisabledVal = updateData.isDisabled as unknown;
        if (isDisabledVal === false || isDisabledVal === 'false') {
            updateData.isDisabled = false;
            (updateData as any).disabilityType = null;
            (updateData as any).disabilityDescription = null;
        } else if (isDisabledVal === true || isDisabledVal === 'true') {
            updateData.isDisabled = true;
        }

        // Handle profileCompleted flag
        const profileCompletedVal = (updateData as any).profileCompleted;
        if (profileCompletedVal === true || profileCompletedVal === 'true') {
            updateData.profileCompleted = true;
        }

        // Clean up empty strings for fields that might have enums or should be null
        const fieldsToClean = ['disabilityType', 'maritalStatus', 'gender', 'residentialType', 'familyType', 'familyValues', 'dietaryHabits', 'smoking', 'drinking'];
        fieldsToClean.forEach(field => {
            if ((updateData as any)[field] === '') {
                delete (updateData as any)[field];
            }
        });

        // Prevent updating restricted fields
        const restrictedFields = ['_id', 'password', 'email', 'isVerified', 'role', 'kycStatus', 'createdAt', 'updatedAt', '__v', 'gamification'];
        restrictedFields.forEach(field => delete (updateData as any)[field]);

        console.log('Final updateData for Mongoose:', JSON.stringify(updateData, null, 2));

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true });

        // Auto-detect profile completion if not already marked
        if (updatedUser && !updatedUser.profileCompleted) {
            const hasRequiredFields =
                updatedUser.fullName?.firstName &&
                updatedUser.fullName?.lastName &&
                updatedUser.gender &&
                updatedUser.dateOfBirth &&
                updatedUser.maritalStatus &&
                updatedUser.religion &&
                updatedUser.country &&
                updatedUser.state &&
                updatedUser.city &&
                updatedUser.highestEducation &&
                updatedUser.occupation &&
                updatedUser.photos && updatedUser.photos.length > 0;

            if (hasRequiredFields) {
                console.log(`Auto-marking profile completion for user ${userId}`);
                updatedUser.profileCompleted = true;
                await updatedUser.save();
            }
        }

        return updatedUser;
    }

    static async searchProfiles(filters: any, userTier: string = 'Basic'): Promise<IUser[]> {
        const query: any = {
            isVerified: true,
            'privacySettings.profileVisibility': { $ne: 'OnlyMe' }
        };

        if (filters.gender) query.gender = filters.gender;
        if (filters.religion) query.religion = filters.religion;
        if (filters.maritalStatus) query.maritalStatus = filters.maritalStatus;
        if (filters.manglik) query.manglik = filters.manglik;
        if (filters.motherTongue) query.motherTongue = filters.motherTongue;
        if (filters.familyValues) query.familyValues = filters.familyValues;
        if (filters.height) query.height = filters.height; // Exact match for now as it is string

        // Age Range
        if (filters.minAge || filters.maxAge) {
            query.age = {};
            if (filters.minAge) query.age.$gte = Number(filters.minAge);
            if (filters.maxAge) query.age.$lte = Number(filters.maxAge);
        }

        // Location
        if (filters.country) query.country = filters.country;
        if (filters.state) query.state = filters.state;
        if (filters.city) query.city = filters.city;

        // Community & Caste
        if (filters.community) query.community = filters.community;
        if (filters.caste) query.caste = filters.caste;

        // Premium Filters Check
        const isPremium = ['Silver', 'Gold', 'Platinum'].includes(userTier);

        // Education & Occupation (Allow for basic, but maybe more granular is premium)
        if (filters.highestEducation) query.highestEducation = filters.highestEducation;
        if (filters.occupation) query.occupation = filters.occupation;

        // Income Range (Premium Filter)
        if (isPremium && (filters.minIncome || filters.maxIncome)) {
            query.annualIncome = {};
            if (filters.minIncome) query.annualIncome.$gte = Number(filters.minIncome);
            if (filters.maxIncome) query.annualIncome.$lte = Number(filters.maxIncome);
        }

        // Lifestyle (Premium Filter)
        if (isPremium) {
            if (filters.dietaryHabits) query.dietaryHabits = filters.dietaryHabits;
            if (filters.smoking) query.smoking = filters.smoking;
            if (filters.drinking) query.drinking = filters.drinking;
        }

        // Disability
        if (filters.isDisabled !== undefined) {
            query.isDisabled = filters.isDisabled === 'true';
            if (query.isDisabled && filters.disabilityType) {
                query.disabilityType = filters.disabilityType;
            }
        }

        return await User.find(query).limit(50).sort({ createdAt: -1 });
    }

    static async blockUser(userId: string, targetId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { $addToSet: { blockedUsers: targetId } });
    }

    static async reportUser(targetId: string, reporterId: string): Promise<void> {
        await User.findByIdAndUpdate(targetId, { $addToSet: { reportedBy: reporterId } });
    }

    static async shortlistUser(userId: string, targetId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { $addToSet: { shortlistedUsers: targetId } });
    }

    static async unshortlistUser(userId: string, targetId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { $pull: { shortlistedUsers: targetId } });
    }

    static async calculateMatches(user: IUser) {
        // Core AI matching algorithm (Weighted approach)
        const potentialMatches = await User.find({
            _id: { $ne: user._id, $nin: user.blockedUsers },
            gender: user.gender === 'Male' ? 'Female' : 'Male',
            isVerified: true,
            'privacySettings.profileVisibility': { $ne: 'OnlyMe' }
        }).limit(100);

        const matchesWithBehavior = await Promise.all(potentialMatches.map(async match => {
            let score = 0;

            // 1. Religion (Weight: 25)
            if (match.religion === user.religion) score += 25;

            // 2. Age (Weight: 20)
            const ageDiff = Math.abs((match.age || 0) - (user.age || 0));
            if (ageDiff <= 3) score += 20;
            else if (ageDiff <= 5) score += 10;

            // 3. Mother Tongue (Weight: 15)
            if (match.motherTongue === user.motherTongue) score += 15;

            // 4. Education (Weight: 10)
            const eduLevels: any = { 'PhD': 5, 'Master': 4, 'Bachelors': 3, 'Diploma': 2, 'High School': 1 };
            const mEdu = eduLevels[match.highestEducation || ''] || 0;
            const uEdu = eduLevels[user.highestEducation || ''] || 0;
            if (mEdu >= uEdu) score += 10;

            // 5. Income (Weight: 10)
            const mIncome = Number(match.annualIncome || 0);
            const uIncome = Number(user.annualIncome || 0);
            if (mIncome >= uIncome * 0.8) score += 10;

            // 6. Hobbies & Interests (Weight: 10)
            const commonHobbies = match.hobbies.filter(h => user.hobbies.includes(h));
            if (commonHobbies.length > 0) score += Math.min(commonHobbies.length * 2, 10);

            // 7. Family Values (Weight: 5)
            if (match.familyValues === user.familyValues) score += 5;

            // 8. Disability Compatibility (Weight: 5)
            if (user.isDisabled && match.isDisabled) {
                if (user.disabilityType === match.disabilityType) score += 5;
            } else if (!user.isDisabled && !match.isDisabled) {
                score += 5;
            }

            // 9. Location Compatibility (Weight: 15)
            if (match.country === user.country) {
                score += 5;
                if (match.state === user.state) {
                    score += 5;
                    if (match.city === user.city) {
                        score += 5;
                    }
                }
            }

            const behavioralScore = await BehaviorService.getPredictiveScore(user, match);
            const totalScore = score + behavioralScore;

            return { ...match.toObject(), matchingScore: totalScore };
        }));

        const filteredMatches = matchesWithBehavior.filter(m => (m.matchingScore || 0) > 20);
        return filteredMatches.sort((a: any, b: any) => (b.matchingScore || 0) - (a.matchingScore || 0));
    }

    static async addPhotos(userId: string, photos: any[]): Promise<IUser | null> {
        return await User.findByIdAndUpdate(
            userId,
            { $push: { photos: { $each: photos } } },
            { new: true }
        );
    }

    static async deletePhoto(userId: string, photoId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const photo = user.photos.find((p: any) => p._id.toString() === photoId);
        if (photo && photo.publicId) {
            try {
                const { v2: cloudinary } = require('cloudinary');
                // Ensure cloudinary is configured
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET
                });
                await cloudinary.uploader.destroy(photo.publicId);
                console.log(`Cloudinary asset destroyed: ${photo.publicId}`);
            } catch (error) {
                console.error('Failed to delete from Cloudinary:', error);
                // Continue with DB deletion even if Cloudinary fails
            }
        }

        return await User.findByIdAndUpdate(
            userId,
            { $pull: { photos: { _id: photoId } } },
            { new: true }
        );
    }

    static async setMainPhoto(userId: string, photoId: string): Promise<IUser | null> {
        // First reset all isMain to false
        await User.updateOne(
            { _id: userId },
            { $set: { "photos.$[].isMain": false } }
        );

        // Then set the specific photo as main
        return await User.findOneAndUpdate(
            { _id: userId, "photos._id": photoId },
            { $set: { "photos.$.isMain": true } },
            { new: true }
        );
    }

    static async verifyIdentity(userId: string, idType: string, idUrl: string): Promise<IUser | null> {
        // Mock blockchain hash generation
        const blockchainHash = require('crypto').createHash('sha256').update(`${userId}-${idType}-${Date.now()}`).digest('hex');

        return await User.findByIdAndUpdate(userId, {
            $set: {
                governmentIdProof: { type: idType, url: idUrl, isVerified: true },
                blockchainData: {
                    hash: blockchainHash,
                    verifiedAt: new Date(),
                    txId: `tx_${Math.random().toString(36).substr(2, 9)}`
                },
                isVerified: true // Set main verification flag
            },
            $inc: { 'gamification.points': 50 }, // Reward for verification
            $addToSet: { 'gamification.badges': 'Verified Identity' }
        }, { new: true });
    }

    static async logBehavior(userId: string, targetId: string, action: 'View' | 'Like' | 'Dislike' | 'Message'): Promise<void> {
        const user = await User.findById(userId);
        if (!user) return;

        // Enforce limits for 'Like' (Interest)
        if (action === 'Like') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let lastInterestDate = user.interactionStats.lastInterestSentAt;
            if (lastInterestDate) {
                lastInterestDate.setHours(0, 0, 0, 0);
            }

            // Reset counter if it's a new day
            if (!lastInterestDate || lastInterestDate.getTime() < today.getTime()) {
                user.interactionStats.interestsSentToday = 0;
            }

            if (user.membership.tier === 'Basic' && user.interactionStats.interestsSentToday >= user.interactionStats.interestsLimit) {
                throw new Error('Daily interest limit reached. Please upgrade to premium for unlimited interests.');
            }

            user.interactionStats.interestsSentToday += 1;
            user.interactionStats.lastInterestSentAt = new Date();
            await user.save();
        }

        await BehaviorService.logAction(userId, targetId, action);

        // Reward gamification for interaction
        if (action === 'Like' || action === 'Message') {
            await User.findByIdAndUpdate(userId, {
                $inc: { 'gamification.points': 5 }
            });
        }
    }

    static async recordVisit(userId: string, visitorId: string): Promise<void> {
        if (userId === visitorId) return;

        await User.findByIdAndUpdate(userId, {
            $push: {
                profileVisitors: {
                    $each: [{ visitorId: visitorId as any, visitedAt: new Date() }],
                    $slice: -50 // Keep only last 50 visitors
                }
            }
        });
    }

    static async getProfileVisitors(userId: string): Promise<any[]> {
        const user = await User.findById(userId)
            .populate('profileVisitors.visitorId', 'fullName gender age religion country photos');

        if (!user) return [];
        return user.profileVisitors.sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());
    }

    static async getShortlistedProfiles(userId: string): Promise<IUser[]> {
        const user = await User.findById(userId).populate('shortlistedUsers');
        return (user?.shortlistedUsers as unknown as IUser[]) || [];
    }

    static async getInterests(userId: string, type: 'sent' | 'received'): Promise<any[]> {
        if (type === 'sent') {
            const user = await User.findById(userId);
            if (!user) return [];

            const likedIds = user.behavioralLogs
                .filter((log: any) => log.action === 'Like')
                .map((log: any) => log.targetId);

            return await User.find({ _id: { $in: likedIds } });
        } else {
            // Received interests: logic is finding users who liked THIS user
            // We need to query Users where behavioralLogs has { targetId: userId, action: 'Like' }
            return await User.find({
                'behavioralLogs': {
                    $elemMatch: {
                        targetId: userId,
                        action: 'Like'
                    }
                }
            });
        }
    }

    static async acceptInterest(userId: string, interestId: string): Promise<void> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Find the user who sent the interest (the interestId is actually the sender's userId)
        const sender = await User.findById(interestId);
        if (!sender) throw new Error('Sender not found');

        // Add to matches for both users
        if (!user.matches) user.matches = [];
        if (!sender.matches) sender.matches = [];

        if (!user.matches.includes(sender._id as any)) {
            user.matches.push(sender._id as any);
        }
        if (!sender.matches.includes(user._id as any)) {
            sender.matches.push(user._id as any);
        }

        await user.save();
        await sender.save();

        // TODO: Send notification to sender
    }

    static async rejectInterest(userId: string, interestId: string): Promise<void> {
        // For now, we just don't add to matches
        // In a more sophisticated system, we might track rejections
        // TODO: Send notification to sender (optional)
    }

    static async unblockUser(userId: string, targetId: string): Promise<void> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Remove from blocked users
        if (user.blockedUsers) {
            user.blockedUsers = user.blockedUsers.filter(
                (id: any) => id.toString() !== targetId
            );
        }

        await user.save();
    }

    static async upgradeMembership(userId: string, tier: string, paymentMethod?: string, transactionId?: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Update membership tier
        user.membership.tier = tier as any;
        user.membership.startDate = new Date();

        // Set expiry based on tier (example: 1 month for all paid tiers)
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        user.membership.expiryDate = expiryDate;

        await user.save();
        return user;
    }

    static async getDashboardData(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Get recent matches (first 4)
        const matches = await this.calculateMatches(user);
        const newMatches = matches.slice(0, 4).map((m: any) => ({
            id: m._id,
            name: `${m.fullName.firstName} ${m.fullName.lastName}`,
            age: m.age,
            location: `${m.city}, ${m.state}`,
            profession: m.occupation,
            image: m.photos.find((p: any) => p.isMain)?.url || m.photos[0]?.url || 'https://via.placeholder.com/300',
            matchScore: m.matchingScore
        }));

        // Get received interests (first 3)
        const receivedInterests = await this.getInterests(userId, 'received');
        const recentInterests = receivedInterests.slice(0, 3).map((i: any) => ({
            id: i._id,
            name: `${i.fullName.firstName} ${i.fullName.lastName}`,
            age: i.age,
            profession: i.occupation,
            image: i.photos.find((p: any) => p.isMain)?.url || i.photos[0]?.url || 'https://via.placeholder.com/150'
        }));

        // Stats
        const stats = [
            { label: 'Profile Views', value: user.profileVisitors.length, icon: 'Visibility', color: '#4CAF50' },
            { label: 'Interests Sent', value: user.behavioralLogs.filter(l => l.action === 'Like').length, icon: 'Favorite', color: '#E91E63' },
            { label: 'Connections', value: user.matches.length, icon: 'Chat', color: '#2196F3' },
            { label: 'Shortlisted', value: user.shortlistedUsers.length, icon: 'Star', color: '#FFC107' },
        ];

        return {
            newMatches,
            stats,
            recentInterests,
            membership: {
                tier: user.membership.tier,
                expiryDate: user.membership.expiryDate,
                daysLeft: user.membership.expiryDate ? Math.ceil((user.membership.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0
            }
        };
    }
}
