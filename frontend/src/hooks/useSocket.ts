import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';

export const useSocket = (onNotification?: (data: any) => void) => {
    const socketRef = useRef<Socket | null>(null);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.id) {
            const socket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket']
            });

            socketRef.current = socket;

            socket.on('connect', () => {
                console.log('Connected to socket server');
                // Register user with their ID
                socket.emit('register', user.id);
            });

            socket.on('notification', (data) => {
                console.log('New notification received:', data);
                if (onNotification) {
                    onNotification(data);
                }
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [user?.id, onNotification]);

    return socketRef.current;
};
