import User, { IUser } from './user.schema';
import mongoose from 'mongoose';

export class BehaviorService {
    /**
     * Logs a user action (View, Like, Dislike, Message) for AI analysis
     */
    static async logAction(userId: string, targetId: string, action: 'View' | 'Like' | 'Dislike' | 'Message'): Promise<void> {
        await User.findByIdAndUpdate(userId, {
            $push: {
                behavioralLogs: {
                    action,
                    targetId: new mongoose.Types.ObjectId(targetId),
                    timestamp: new Date()
                }
            }
        });
    }

    /**
     * Predictive Analytics: Calculate compatibility based on behavioral patterns
     * This "Predictive" score is added to the basic matching score.
     */
    static async getPredictiveScore(user: IUser, partner: IUser): Promise<number> {
        let behavioralScore = 0;

        // 1. Reciprocal Verification (Have they interacted before?)
        const userInteractions = user.behavioralLogs.filter(log => log.targetId.toString() === partner._id.toString());
        const partnerInteractions = partner.behavioralLogs.filter(log => log.targetId.toString() === user._id.toString());

        if (userInteractions.some(l => l.action === 'Like')) behavioralScore += 10;
        if (partnerInteractions.some(l => l.action === 'Like')) behavioralScore += 10;

        // 2. Interest Similarity Analysis (Deals with 'Deeper Interests')
        // We look at the types of profiles the user 'Likes' and see if the partner fits that archetype
        const likedProfileIds = user.behavioralLogs.filter(l => l.action === 'Like').map(l => l.targetId);
        const likedProfiles = await User.find({ _id: { $in: likedProfileIds } });

        if (likedProfiles.length > 0) {
            // Check if partner matches the common religion/education of profiles the user likes
            const favoriteReligion = this.getMostFrequent(likedProfiles.map(p => p.religion));
            const favoriteEdu = this.getMostFrequent(likedProfiles.map(p => p.highestEducation));

            if (partner.religion === favoriteReligion) behavioralScore += 5;
            if (partner.highestEducation === favoriteEdu) behavioralScore += 5;
        }

        return behavioralScore;
    }

    private static getMostFrequent(arr: any[]) {
        if (arr.length === 0) return null;
        const counts = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    /**
     * AI-Driven Conversation Starters
     */
    static generateIceBreakers(user: IUser, partner: IUser): string[] {
        const iceBreakers: string[] = [
            `Hi ${partner.fullName.firstName}! noticed we both enjoy ${user.hobbies[0] || 'travelling'}.`,
            `Your profile is interesting! I see you work as a ${partner.occupation}. How do you find it?`,
            `What's your favorite thing about living in ${partner.city}?`
        ];

        // Specific based on commonalities
        const commonHobbies = user.hobbies.filter(h => partner.hobbies.includes(h));
        if (commonHobbies.length > 0) {
            iceBreakers.push(`It's rare to find someone else who likes ${commonHobbies[0]}!`);
        }

        return iceBreakers;
    }
}
