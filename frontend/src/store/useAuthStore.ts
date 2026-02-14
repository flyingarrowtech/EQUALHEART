import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../hooks/api';

interface User {
    id: string;
    email: string;
    fullName: { firstName: string; lastName: string };
    membership: {
        tier: 'Basic' | 'Silver' | 'Gold' | 'Platinum';
        expiryDate?: string;
    };
    photoUrl?: string;
    isVerified?: boolean;
    governmentIdProof?: {
        type: string;
        url: string;
        isVerified: boolean;
    };
    notifications?: number;
    role: 'user' | 'admin';
    photos?: {
        url: string;
        isMain: boolean;
        _id?: string;
    }[];
    profileCompleted: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
    setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
    setToken: (accessToken: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            checkAuth: async () => {
                const token = get().accessToken;
                if (!token) {
                    set({ isAuthenticated: false, user: null });
                    return;
                }
                try {
                    const response = await api.get('/user/profile');
                    if (response.data.success) {
                        set({ user: response.data.data, isAuthenticated: true });
                    }
                } catch (error) {
                    set({ isAuthenticated: false, accessToken: null, user: null });
                }
            },

            setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken: refreshToken || null, isAuthenticated: true }),
            setToken: (accessToken) => set({ accessToken, isAuthenticated: true }),
            setUser: (user) => set({ user }),
            logout: () => set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
