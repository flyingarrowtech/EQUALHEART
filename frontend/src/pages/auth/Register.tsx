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
    MenuItem,
    Checkbox,
    FormControlLabel,
    Link as MuiLink,
    Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Visibility,
    VisibilityOff,
    PersonAdd,
    Email,
    Lock,
    Person,
    Phone,
    Cake,
    Google as GoogleIcon,
    Facebook as FacebookIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../../hooks/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';

// Validation Schema
const registerSchema = z.object({
    profileCreatedFor: z.enum(['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'], {
        errorMap: () => ({ message: 'Please select who this profile is for' }),
    }),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    gender: z.enum(['Male', 'Female', 'Transgender'], {
        errorMap: () => ({ message: 'Please select gender' }),
    }),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    mobileNumber: z.string().min(10, 'Valid mobile number is required'),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { setAuth } = useAuthStore();
    const { showToast } = useNotificationStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            profileCreatedFor: '' as any,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '' as any,
            dateOfBirth: '',
            mobileNumber: '',
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        setLoading(true);

        try {
            const payload = {
                profileCreatedFor: data.profileCreatedFor,
                email: data.email,
                password: data.password,
                fullName: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                mobileNumber: data.mobileNumber,
            };

            await api.post('/auth/register', payload);
            setUserEmail(data.email);
            setSuccess(true);
            showToast('Account created! Please verify your email.', 'success');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length < 6) {
            const msg = 'Please enter a valid 6-digit OTP';
            setError(msg);
            showToast(msg, 'warning');
            return;
        }

        setError(null);
        setVerifying(true);
        try {
            const response = await api.post('/auth/verify-otp', { email: userEmail, otp });
            const { user, accessToken } = response.data.data;
            setAuth(user, accessToken);
            showToast('Email verified! Welcome to EqualHeart.', 'success');
            navigate('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'OTP verification failed';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await api.post('/auth/resend-otp', { email: userEmail });
            setError(null);
            showToast('OTP resend to your email', 'info');
        } catch (err: any) {
            showToast('Failed to resend OTP', 'error');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await api.get('/auth/google/url');
            window.location.href = response.data.url;
        } catch (err) {
            showToast('Failed to initialize Google login', 'error');
        }
    };

    if (success) {
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
                        maxWidth: 450,
                        width: '100%',
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                        Verify Your Email
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        We've sent a 6-digit OTP to <b>{userEmail}</b>. Please enter it below to verify your account.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem' } }}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleVerifyOtp}
                        disabled={verifying}
                        startIcon={verifying ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {verifying ? 'Verifying...' : 'Verify OTP'}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Didn't receive code?
                        </Typography>
                        <MuiLink
                            component="button"
                            onClick={handleResendOtp}
                            sx={{ color: '#e91e63', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', p: 0 }}
                        >
                            Resend OTP
                        </MuiLink>
                    </Box>

                    <MuiLink
                        component="button"
                        onClick={() => setSuccess(false)}
                        sx={{ mt: 3, color: 'text.secondary', display: 'block', margin: '24px auto 0', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        Change Email
                    </MuiLink>
                </Paper>
            </Box>
        );
    }

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            elevation={24}
            sx={{
                maxWidth: 900,
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                backdropFilter: 'blur(20px)',
                bgcolor: 'background.glassCard', // Strict Token
                border: 1,
                borderColor: 'background.glassBorder', // Strict Token
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}
        >
            {/* Left Side - Image/Branding */}
            <Box
                sx={{
                    flex: { md: 1 },
                    bgcolor: (theme) => `${theme.palette.primary.main}26`, // 15% opacity converted to hex alpha ~26
                    backdropFilter: 'blur(10px)',
                    p: 5,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'primary.main', // Strict Token
                    position: 'relative',
                    overflow: 'hidden',
                    borderRight: 1,
                    borderColor: 'background.glassBorder' // Strict Token
                }}
            >
                <Box
                    component={motion.div}
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    sx={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: (theme) => `radial-gradient(circle, ${theme.palette.primary.main}1A 0%, transparent 60%)`, // 10% opacity
                    }}
                />
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
                    Join EqualHeart
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.6, fontWeight: 500 }}>
                    Start your journey to find your perfect life partner today.
                </Typography>
            </Box>

            {/* Right Side - Form */}
            <Box sx={{ flex: { md: 1.5 }, p: { xs: 3, sm: 5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Fill in your details to get started
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            {...register('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'background.glassInput', // Strict Token
                                    backdropFilter: 'blur(5px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'background.glassCard' },
                                    '&.Mui-focused': { bgcolor: 'background.paper' }
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...register('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'background.glassInput', // Strict Token
                                    backdropFilter: 'blur(5px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'background.glassCard' },
                                    '&.Mui-focused': { bgcolor: 'background.paper' }
                                }
                            }}
                        />

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.glassInput', // Strict Token
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'background.glassCard' },
                                        '&.Mui-focused': { bgcolor: 'background.paper' }
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <TextField
                                fullWidth
                                select
                                label="Profile Created For"
                                {...register('profileCreatedFor')}
                                error={!!errors.profileCreatedFor}
                                helperText={errors.profileCreatedFor?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ color: 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.glassInput', // Strict Token
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'background.glassCard' },
                                        '&.Mui-focused': { bgcolor: 'background.paper' }
                                    }
                                }}
                            >
                                {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'].map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                {...register('gender')}
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ color: 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.glassInput', // Strict Token
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'background.glassCard' },
                                        '&.Mui-focused': { bgcolor: 'background.paper' }
                                    }
                                }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Transgender">Transgender</MenuItem>
                            </TextField>
                        </Box>

                        <TextField
                            fullWidth
                            type="date"
                            label="Date of Birth"
                            InputLabelProps={{ shrink: true }}
                            {...register('dateOfBirth')}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Cake sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'background.glassInput', // Strict Token
                                    backdropFilter: 'blur(5px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'background.glassCard' },
                                    '&.Mui-focused': { bgcolor: 'background.paper' }
                                }
                            }}
                        />

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                {...register('mobileNumber')}
                                error={!!errors.mobileNumber}
                                helperText={errors.mobileNumber?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone sx={{ color: 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.glassInput', // Strict Token
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'background.glassCard' },
                                        '&.Mui-focused': { bgcolor: 'background.paper' }
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.glassInput', // Strict Token
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'background.glassCard' },
                                        '&.Mui-focused': { bgcolor: 'background.paper' }
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <Controller
                                name="termsAccepted"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                                sx={{
                                                    color: errors.termsAccepted ? 'error.main' : 'primary.main',
                                                    '&.Mui-checked': { color: 'primary.main' }, // Strict Token
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" color={errors.termsAccepted ? 'error' : 'textSecondary'}>
                                                I accept the{' '}
                                                <MuiLink component={Link} to="/terms" sx={{ color: 'primary.main' }}>
                                                    Terms of Service
                                                </MuiLink>{' '}
                                                and{' '}
                                                <MuiLink component={Link} to="/privacy" sx={{ color: 'primary.main' }}>
                                                    Privacy Policy
                                                </MuiLink>
                                            </Typography>
                                        }
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: 3,
                            fontSize: '1rem',
                            fontWeight: 700,
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Strict Token
                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                            '&:hover': {
                                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                            },
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        OR SIGN UP WITH
                    </Typography>
                </Divider>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: (theme) => `${theme.palette.primary.main}0D` // 5% opacity
                            },
                        }}
                    >
                        Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        disabled={true}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: 'divider',
                            color: 'text.disabled',
                            '&:hover': { borderColor: 'divider' },
                        }}
                    >
                        Facebook
                    </Button>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <MuiLink
                            component={Link}
                            to="/login"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 700,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Sign In
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default Register;
