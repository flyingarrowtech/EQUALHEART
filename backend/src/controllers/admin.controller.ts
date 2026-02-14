import { Request, Response } from 'express';
import User from '../modules/user/user.schema';

export const getStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const verifiedUsers = await User.countDocuments({ isVerified: true });
        const premiumUsers = await User.countDocuments({ 'membership.tier': { $ne: 'Basic' } });
        const reportedUsers = await User.countDocuments({ reportedBy: { $exists: true, $not: { $size: 0 } } });

        // Get new signups in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newSignups = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        res.json({
            totalUsers,
            verifiedUsers,
            premiumUsers,
            reportedUsers,
            newSignups
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find({})
            .select('-password')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments({});

        res.json({
            users,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isVerified = true;
            user.kycStatus = 'Verified';
            await user.save();
            res.json({ message: 'User verified successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getReports = async (req: Request, res: Response) => {
    try {
        // Find users who have been reported
        const reportedUsers = await User.find({ reportedBy: { $exists: true, $not: { $size: 0 } } })
            .select('fullName email reportedBy')
            .populate('reportedBy', 'fullName email');

        res.json(reportedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
