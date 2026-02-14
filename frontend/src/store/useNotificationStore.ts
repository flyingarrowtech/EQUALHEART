import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
}

interface ConfirmState {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

interface NotificationStore {
    toasts: Toast[];
    confirm: ConfirmState;
    showToast: (message: string, type: NotificationType, duration?: number) => void;
    removeToast: (id: string) => void;
    showConfirm: (options: Omit<ConfirmState, 'isOpen'>) => void;
    hideConfirm: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    toasts: [],
    confirm: {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    },
    showToast: (message, type, duration = 4000) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }],
        }));
        if (duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id),
                }));
            }, duration);
        }
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
    showConfirm: (options) =>
        set({
            confirm: { ...options, isOpen: true },
        }),
    hideConfirm: () =>
        set((state) => ({
            confirm: { ...state.confirm, isOpen: false },
        })),
}));
