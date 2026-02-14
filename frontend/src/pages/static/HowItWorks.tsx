import React from 'react';
import { Container, Typography, Box, Paper, Button, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PageHeader from '../../components/common/PageHeader';

const steps = [
    {
        icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
        title: 'Create Account',
        description: 'Sign up in minutes. It\'s free, quick, and easy to get started.',
        color: '#e91e63'
    },
    {
        icon: <EditIcon sx={{ fontSize: 40 }} />,
        title: 'Build Profile',
        description: 'Share your story, preferences, and photos to help us find matches.',
        color: '#9c27b0'
    },
    {
        icon: <SearchIcon sx={{ fontSize: 40 }} />,
        title: 'Find Matches',
        description: 'Browse AI-curated profiles and get daily personalized recommendations.',
        color: '#3f51b5'
    },
    {
        icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
        title: 'Connect & Love',
        description: 'Chat, connect, and start your journey towards a happy marriage.',
        color: '#f44336'
    }
];

const HowItWorks: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="How It Works"
                subtitle="Your journey to finding the perfect partner starts here."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6 }}>
                <Box sx={{ mb: 8 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                            gap: 4,
                        }}
                    >
                        {steps.map((step, index) => (
                            <Paper
                                key={index}
                                component={motion.div}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    borderRadius: 4,
                                    position: 'relative',
                                    overflow: 'visible',
                                    bgcolor: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -20,
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        bgcolor: step.color,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {index + 1}
                                </Box>

                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        bgcolor: alpha(step.color, 0.1),
                                        color: step.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3,
                                        mt: 2
                                    }}
                                >
                                    {step.icon}
                                </Box>

                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {step.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Feature Highlight */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 8 },
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        textAlign: 'center',
                        mb: 6,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                            POWERED BY INTELLIGENCE
                        </Typography>
                        <Typography variant="h3" fontWeight="900" gutterBottom sx={{ mt: 1, mb: 3 }}>
                            Why Choose EqualHeart?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 6, maxWidth: 700, mx: 'auto', opacity: 0.9, fontWeight: 400 }}>
                            We verify every profile to ensure a safe environment. Our intelligent matching system considers your personality, values, and lifestyle to suggest the most compatible partners.
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 4,
                            }}
                        >
                            {[
                                { number: '10k+', label: 'Active Users' },
                                { number: '5k+', label: 'Success Stories' },
                                { number: '100%', label: 'Verified Profiles' },
                            ].map((stat, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: { xs: 'calc(50% - 16px)', md: 'auto' },
                                        minWidth: { md: 200 },
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography variant="h3" fontWeight="bold">
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Abstract Shapes for BG */}
                    <Box sx={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Paper>

                <Box textAlign="center" py={4}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                            px: 6,
                            py: 1.8,
                            borderRadius: 50,
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            boxShadow: '0 8px 30px rgba(233, 30, 99, 0.4)',
                        }}
                    >
                        Start Your Journey Free
                    </Button>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        No credit card required for registration.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default HowItWorks;
