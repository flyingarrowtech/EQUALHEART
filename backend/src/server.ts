import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import connectDB from './config/db';
import { NotificationService } from './modules/user/notification.service';

const PORT = Number(process.env.PORT) || 5000;
const server = http.createServer(app);

// Initialize Socket.io via NotificationService
NotificationService.init(server);

console.log('Starting server...');

// Connect to Database
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
