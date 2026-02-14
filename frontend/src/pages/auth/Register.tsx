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

// Validation Schema
const registerSchema = z.object({
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

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        setLoading(true);

        try {
            const payload = {
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
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
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
                        maxWidth: 500,
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: '#e8f5e9',
                            color: '#4caf50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}
                    >
                        <PersonAdd sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                        Account Created!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        We've sent a verification email to your inbox. Please verify your email to activate your account.
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/login')}
                        sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            fontWeight: 700,
                        }}
                    >
                        Continue to Login
                    </Button>
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
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.98)',
            }}
        >
            {/* Left Side - Image/Branding */}
            <Box
                sx={{
                    flex: { md: 1 },
                    bgcolor: '#fce4ec',
                    p: 5,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component={motion.div}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                    sx={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
                    }}
                />
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                    Join EqualHeart
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
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
                            />
                        </Box>

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
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Transgender">Transgender</MenuItem>
                        </TextField>

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
                                                    '&.Mui-checked': { color: '#e91e63' },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" color={errors.termsAccepted ? 'error' : 'textSecondary'}>
                                                I accept the{' '}
                                                <MuiLink component={Link} to="/terms" sx={{ color: '#e91e63' }}>
                                                    Terms of Service
                                                </MuiLink>{' '}
                                                and{' '}
                                                <MuiLink component={Link} to="/privacy" sx={{ color: '#e91e63' }}>
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
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
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
                        onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: '#e0e0e0',
                            color: 'text.primary',
                            '&:hover': { borderColor: '#e91e63', bgcolor: 'rgba(233, 30, 99, 0.05)' },
                        }}
                    >
                        Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`)}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: '#e0e0e0',
                            color: 'text.primary',
                            '&:hover': { borderColor: '#e91e63', bgcolor: 'rgba(233, 30, 99, 0.05)' },
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
                                color: '#e91e63',
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
