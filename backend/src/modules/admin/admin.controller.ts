import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
    static async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await AdminService.getStats();
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const skip = (page - 1) * limit;

            const filters = {
                role: req.query.role,
                isVerified: req.query.isVerified === 'true' ? true : req.query.isVerified === 'false' ? false : undefined,
                gender: req.query.gender,
                membershipTier: req.query.membershipTier
            };

            const result = await AdminService.getUsers(limit, skip, filters);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            const result = await AdminService.deleteUser(userId);
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error: any) {
            next(error);
        }
    }
}
