import { Request, Response, NextFunction } from 'express';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAuth = (req as any).user as { userId: string } | undefined;
        if (!userAuth?.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Import User model to check role
        const { default: User } = await import('../user/user.schema');
        const user = await User.findById(userAuth.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Admin access required'
            });
        }

        next();
    } catch (error: any) {
        next(error);
    }
};
