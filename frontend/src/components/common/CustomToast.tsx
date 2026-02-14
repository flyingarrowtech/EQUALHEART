import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import {
    CheckCircleOutline,
    ErrorOutline,
    InfoOutlined,
    WarningAmberOutlined,
    Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore, type Toast } from '../../store/useNotificationStore';

const getIcon = (type: string) => {
    switch (type) {
        case 'success': return <CheckCircleOutline sx={{ color: 'success.main' }} />;
        case 'error': return <ErrorOutline sx={{ color: 'error.main' }} />;
        case 'warning': return <WarningAmberOutlined sx={{ color: 'warning.main' }} />;
        default: return <InfoOutlined sx={{ color: 'info.main' }} />;
    }
};

const getGlowColor = (type: string) => {
    switch (type) {
        case 'success': return 'rgba(76, 175, 80, 0.2)';
        case 'error': return 'rgba(244, 67, 54, 0.2)';
        case 'warning': return 'rgba(255, 152, 0, 0.2)';
        default: return 'rgba(33, 150, 243, 0.2)';
    }
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
    const { removeToast } = useNotificationStore();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <Paper
                elevation={3}
                sx={{
                    minWidth: 300,
                    maxWidth: 450,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: 3,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: `0 8px 32px ${getGlowColor(toast.type)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        bgcolor: `${toast.type}.main`,
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getIcon(toast.type)}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                        {toast.message}
                    </Typography>
                </Box>
                <IconButton size="small" onClick={() => removeToast(toast.id)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Paper>
        </motion.div>
    );
};

const CustomToast: React.FC = () => {
    const { toasts } = useNotificationStore();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 24,
                right: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                zIndex: 9999,
                pointerEvents: 'none',
                '& > div': { pointerEvents: 'auto' }
            }}
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default CustomToast;
