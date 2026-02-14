import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore';

const SocialSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        const userStr = searchParams.get('user');

        if (accessToken && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                setAuth(user, accessToken); // Note: You might need to handle refresh token storage too if your store supports it
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to parse user data', error);
                navigate('/login?error=social_login_failed');
            }
        } else {
            navigate('/login?error=no_token');
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
            }}
        >
            <CircularProgress color="inherit" size={60} />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
                Completing secure login...
            </Typography>
        </Box>
    );
};

export default SocialSuccess;
