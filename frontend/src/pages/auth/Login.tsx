import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Divider,
    Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
    Visibility,
    VisibilityOff,
    Login as LoginIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Favorite as FavoriteIcon,
    Google as GoogleIcon,
    Facebook as FacebookIcon,
} from '@mui/icons-material';
import api from '../../hooks/api';
import { useAuthStore } from '../../store/useAuthStore';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { user, accessToken } = response.data.data;
            setAuth(user, accessToken);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
    };

    return (
        <Paper
            elevation={24}
            sx={{
                maxWidth: 480,
                width: '100%',
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.98)',
            }}
        >
            {/* Logo & Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                        mb: 2,
                        boxShadow: '0 8px 24px rgba(233, 30, 99, 0.3)',
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                    Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Sign in to find your perfect match
                </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2.5 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    disabled={loading}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 1.5 }}
                />

                <Box sx={{ textAlign: 'right', mb: 3 }}>
                    <MuiLink
                        component={Link}
                        to="/auth/forgot-password"
                        sx={{
                            color: '#e91e63',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Forgot Password?
                    </MuiLink>
                </Box>

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                    sx={{
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                            boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                        },
                        '&:disabled': {
                            background: '#e0e0e0',
                        },
                    }}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    OR
                </Typography>
            </Divider>

            {/* Social Login */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                    sx={{
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: '#e0e0e0',
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#e91e63',
                            bgcolor: 'rgba(233, 30, 99, 0.05)',
                        },
                    }}
                >
                    Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={loading}
                    sx={{
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: '#e0e0e0',
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#e91e63',
                            bgcolor: 'rgba(233, 30, 99, 0.05)',
                        },
                    }}
                >
                    Facebook
                </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <MuiLink
                        component={Link}
                        to="/register"
                        sx={{
                            color: '#e91e63',
                            fontWeight: 700,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Sign Up
                    </MuiLink>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;
