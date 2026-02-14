import React from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    Avatar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
        >
            <Container maxWidth="sm">
                <Card elevation={8} sx={{ borderRadius: 4 }}>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                            <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', mb: 2 }}>
                                <LockOutlined sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Admin Login
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sign in to access the admin panel
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                margin="normal"
                                required
                                autoFocus
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                required
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 600 }}
                            >
                                Sign In
                            </Button>
                        </form>

                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                            © 2024 EqualHeart Matrimonial. All rights reserved.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;
