import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { ErrorOutline, CheckCircle } from '@mui/icons-material';
import api from '../../hooks/api';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }

        const verifyToken = async () => {
            try {
                await api.post('/auth/verify-email', { token });
                setStatus('success');
                setMessage('Your email has been successfully verified! You can now log in.');
            } catch (err: any) {
                setStatus('error');
                setMessage(err.response?.data?.message || 'Verification failed. The link may have expired.');
            }
        };

        verifyToken();
    }, [token]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)',
                p: 2,
            }}
        >
            <Paper
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                elevation={24}
                sx={{
                    p: 5,
                    textAlign: 'center',
                    borderRadius: 4,
                    maxWidth: 480,
                    width: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        bgcolor:
                            status === 'verifying'
                                ? '#e3f2fd'
                                : status === 'success'
                                    ? '#e8f5e9'
                                    : '#ffebee',
                        color:
                            status === 'verifying'
                                ? '#2196f3'
                                : status === 'success'
                                    ? '#4caf50'
                                    : '#f44336',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        animation: status === 'verifying' ? 'pulse 2s infinite' : 'none',
                        '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' },
                            '100%': { transform: 'scale(1)' },
                        },
                    }}
                >
                    {status === 'verifying' ? (
                        <CircularProgress size={40} color="inherit" />
                    ) : status === 'success' ? (
                        <CheckCircle sx={{ fontSize: 50 }} />
                    ) : (
                        <ErrorOutline sx={{ fontSize: 50 }} />
                    )}
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                    {status === 'verifying'
                        ? 'Verifying...'
                        : status === 'success'
                            ? 'Email Verified!'
                            : 'Verification Failed'}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    {message}
                </Typography>

                {status !== 'verifying' && (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/login')}
                        size="large"
                        sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                            },
                        }}
                    >
                        {status === 'success' ? 'Continue to Login' : 'Back to Login'}
                    </Button>
                )}
            </Paper>
        </Box>
    );
};

export default VerifyEmail;
