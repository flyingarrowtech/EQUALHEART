import User, { IUser } from './user.schema';

export class GamificationService {
    /**
     * Awards points to a user for various activities
     */
    static async awardPoints(userId: string, points: number, reason: string): Promise<void> {
        await User.findByIdAndUpdate(userId, {
            $inc: { 'gamification.points': points }
        });
        console.log(`Awarded ${points} points to ${userId} for ${reason}`);
    }

    /**
     * Checks and awards badges based on milestones
     */
    static async checkAndAwardBadges(userId: string): Promise<string[]> {
        const user = await User.findById(userId);
        if (!user) return [];

        const newBadges: string[] = [];
        const currentBadges = new Set(user.gamification.badges);

        // 1. Point Milestones
        if (user.gamification.points >= 100 && !currentBadges.has('Rising Star')) {
            newBadges.push('Rising Star');
        }
        if (user.gamification.points >= 500 && !currentBadges.has('Super Member')) {
            newBadges.push('Super Member');
        }

        // 2. Profile Quality
        if (user.photos.length >= 3 && !currentBadges.has('Photo Enthusiast')) {
            newBadges.push('Photo Enthusiast');
        }

        // 3. Interaction Milestones
        const likesGiven = user.behavioralLogs.filter(l => l.action === 'Like').length;
        if (likesGiven >= 10 && !currentBadges.has('Active Seeker')) {
            newBadges.push('Active Seeker');
        }

        if (newBadges.length > 0) {
            await User.findByIdAndUpdate(userId, {
                $addToSet: { 'gamification.badges': { $each: newBadges } }
            });
        }

        return newBadges;
    }
}
