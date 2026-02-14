import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { SignalingService } from './signaling.service';

export class NotificationService {
    private static io: Server;
    private static userSockets = new Map<string, string>(); // userId -> socketId

    static init(server: HttpServer) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL || 'http://localhost:5173',
                credentials: true
            }
        });

        // Initialize Signaling for calls
        SignalingService.init(this.io);

        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            socket.on('register', (userId: string) => {
                this.userSockets.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ${socket.id}`);
            });

            socket.on('disconnect', () => {
                // Find and remove the user mapping
                for (const [userId, socketId] of this.userSockets.entries()) {
                    if (socketId === socket.id) {
                        this.userSockets.delete(userId);
                        break;
                    }
                }
                console.log('User disconnected:', socket.id);
            });
        });
    }

    static sendNotification(userId: string, type: 'MATCH' | 'MESSAGE' | 'VIEW', data: any) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.io.to(socketId).emit('notification', { type, data, timestamp: new Date() });
        }
    }

    static broadcastMatch(userId1: string, userId2: string) {
        this.sendNotification(userId1, 'MATCH', { partnerId: userId2, message: 'You have a new match!' });
        this.sendNotification(userId2, 'MATCH', { partnerId: userId1, message: 'You have a new match!' });
    }
}
