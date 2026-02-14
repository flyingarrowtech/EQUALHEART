import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateTokens = (res: Response, userId: string) => {
    const accessToken = jwt.sign(
        { userId },
        (process.env.ACCESS_TOKEN_SECRET as string) || 'secret',
        { expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || '15m') as any }
    );

    const refreshToken = jwt.sign(
        { userId },
        (process.env.REFRESH_TOKEN_SECRET as string) || 'secret',
        { expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || '7d') as any }
    );

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return accessToken;
};

export default generateTokens;
