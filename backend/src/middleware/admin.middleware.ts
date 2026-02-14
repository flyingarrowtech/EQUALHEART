import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protectAdmin = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
