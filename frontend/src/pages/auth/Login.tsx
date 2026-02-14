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
import { useNotificationStore } from '../../store/useNotificationStore';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const { showToast } = useNotificationStore();

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
            showToast('Welcome back! Login successful.', 'success');
            navigate('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        if (provider === 'google') {
            try {
                const response = await api.get('/auth/google/url');
                window.location.href = response.data.url;
            } catch (err) {
                setError('Failed to initialize Google login');
            }
        } else {
            // Facebook still uses the old link for now or we could implement it manually too
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
        }
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
                backdropFilter: 'blur(20px)',
                bgcolor: 'background.glassCard', // Strict Token
                border: 1,
                borderColor: 'background.glassBorder', // Strict Token
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
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
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Strict Token
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
                    sx={{
                        mb: 2.5,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.glassInput', // Strict Token
                            backdropFilter: 'blur(5px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'background.glassCard',
                            },
                            '&.Mui-focused': {
                                bgcolor: 'background.paper',
                            }
                        }
                    }}
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
                    sx={{
                        mb: 1.5,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.glassInput', // Strict Token
                            backdropFilter: 'blur(5px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'background.glassCard',
                            },
                            '&.Mui-focused': {
                                bgcolor: 'background.paper',
                            }
                        }
                    }}
                />

                <Box sx={{ textAlign: 'right', mb: 3 }}>
                    <MuiLink
                        component={Link}
                        to="/auth/forgot-password"
                        sx={{
                            color: 'primary.main', // Strict Token
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
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Strict Token
                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                        '&:hover': {
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                            boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                        },
                        '&:disabled': {
                            background: 'action.disabledBackground',
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
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: (theme) => `${theme.palette.primary.main}0D`, // 5% opacity
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
                    disabled={true}
                    sx={{
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: 'divider',
                        color: 'text.disabled',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: 'divider',
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
                            color: 'primary.main', // Strict Token
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
