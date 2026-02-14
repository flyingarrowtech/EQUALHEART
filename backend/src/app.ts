import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import adminRoutes from './modules/admin/admin.routes';

const app: Application = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Fix for Google OAuth redirecting to backend port
app.get('/auth/google/callback', (req: Request, res: Response) => {
    const query = new URLSearchParams(req.query as any).toString();
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/google/callback?${query}`);
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'EqualHeart API is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error Stack:', err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

export default app;
