import User from '../user/user.schema';

export class AdminService {
    static async getStats() {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isVerified: true });
        const premiumUsers = await User.countDocuments({
            'membership.tier': { $in: ['Silver', 'Gold', 'Platinum'] }
        });

        // Count total matches (each match is counted twice, so divide by 2)
        const usersWithMatches = await User.find({ matches: { $exists: true, $ne: [] } });
        const totalMatches = usersWithMatches.reduce((sum, user) => {
            const matchesCount = (user as any).matches?.length || 0;
            return sum + matchesCount;
        }, 0) / 2;

        // Gender distribution
        const maleUsers = await User.countDocuments({ gender: 'Male' });
        const femaleUsers = await User.countDocuments({ gender: 'Female' });

        // Recent registrations (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentRegistrations = await User.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        return {
            totalUsers,
            activeUsers,
            premiumUsers,
            totalMatches: Math.floor(totalMatches),
            genderDistribution: {
                male: maleUsers,
                female: femaleUsers
            },
            recentRegistrations
        };
    }

    static async getUsers(limit: number = 10, skip: number = 0, filters: any = {}) {
        const query: any = {};

        if (filters.role) query.role = filters.role;
        if (filters.isVerified !== undefined) query.isVerified = filters.isVerified;
        if (filters.gender) query.gender = filters.gender;
        if (filters.membershipTier) query['membership.tier'] = filters.membershipTier;

        const users = await User.find(query)
            .select('-password -emailOtp -mobileOtp')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        return {
            users,
            total,
            page: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(total / limit)
        };
    }

    static async deleteUser(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Soft delete by setting a deletedAt field (if schema supports it)
        // Or hard delete
        await User.findByIdAndDelete(userId);

        return { message: 'User deleted successfully' };
    }
}
