import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    useTheme
} from '@mui/material';
import { Close as CloseIcon, HelpOutline } from '@mui/icons-material';
import { useNotificationStore } from '../../store/useNotificationStore';

const CustomConfirm: React.FC = () => {
    const { confirm, hideConfirm } = useNotificationStore();
    const theme = useTheme();

    const handleConfirm = () => {
        confirm.onConfirm();
        hideConfirm();
    };

    const handleCancel = () => {
        confirm.onCancel();
        hideConfirm();
    };

    return (
        <Dialog
            open={confirm.isOpen}
            onClose={handleCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    p: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                    backgroundImage: 'none'
                }
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <IconButton
                    onClick={handleCancel}
                    sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle sx={{ textAlign: 'center', pb: 0, pt: 4 }}>
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            margin: '0 auto 16px',
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            boxShadow: '0 8px 16px rgba(233, 30, 99, 0.3)'
                        }}
                    >
                        <HelpOutline sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" fontWeight={800} sx={{ color: 'text.primary' }}>
                        {confirm.title || 'Confirm Action'}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ textAlign: 'center', pt: 2 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.8 }}>
                        {confirm.message}
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 4, pt: 2, px: 4 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            borderWidth: 2,
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': { borderWidth: 2, borderColor: 'text.primary' }
                        }}
                    >
                        {confirm.cancelText || 'Cancel'}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleConfirm}
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            boxShadow: '0 8px 16px rgba(156, 39, 176, 0.25)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        {confirm.confirmText || 'Confirm'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default CustomConfirm;
