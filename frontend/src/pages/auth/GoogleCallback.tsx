import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../hooks/api';

const GoogleCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [error, setError] = React.useState<string | null>(null);
    const hasCalled = React.useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');

        if (code && !hasCalled.current) {
            hasCalled.current = true;
            const handleCallback = async () => {
                try {
                    const response = await api.post('/auth/google/callback', { code });
                    const { user, accessToken } = response.data.data;
                    setAuth(user, accessToken);
                    navigate('/dashboard');
                } catch (err: any) {
                    console.error('Google login failed', err);
                    setError(err.response?.data?.message || 'Google login failed');
                    setTimeout(() => navigate('/login'), 3000);
                }
            };
            handleCallback();
        } else if (!code) {
            navigate('/login');
        }
    }, [searchParams, navigate, setAuth]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                color: 'white',
                p: 3
            }}
        >
            {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>{error}. Redirecting to login...</Alert>
            ) : (
                <>
                    <CircularProgress color="inherit" size={60} />
                    <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
                        Verifying Google login...
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default GoogleCallback;
