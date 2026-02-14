import { Server, Socket } from 'socket.io';

/**
 * Handles WebRTC signaling for Voice and Video calls
 */
export class SignalingService {
    static init(io: Server) {
        io.on('connection', (socket: Socket) => {
            // Signal to start a call
            socket.on('call-user', (data: { to: string, offer: any, from: string, type: 'voice' | 'video' }) => {
                console.log(`User ${data.from} calling ${data.to} (${data.type})`);
                io.to(data.to).emit('incoming-call', { from: data.from, offer: data.offer, type: data.type });
            });

            // Signal to answer a call
            socket.on('answer-call', (data: { to: string, answer: any }) => {
                io.to(data.to).emit('call-answered', { answer: data.answer });
            });

            // ICE Candidates for WebRTC connection
            socket.on('ice-candidate', (data: { to: string, candidate: any }) => {
                io.to(data.to).emit('ice-candidate', { candidate: data.candidate });
            });

            // End call
            socket.on('end-call', (data: { to: string }) => {
                io.to(data.to).emit('call-ended');
            });
        });
    }
}
