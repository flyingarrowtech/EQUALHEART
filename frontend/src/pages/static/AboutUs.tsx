import React from 'react';
import { Container, Typography, Box, Paper, Button, useTheme, alpha } from '@mui/material';
import { Favorite, Security, Group, Public } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const stats = [
        { label: 'Happy Couples', value: '10k+' },
        { label: 'Verified Profiles', value: '100%' },
        { label: 'Years of Trust', value: '15+' },
        { label: 'Countries', value: '20+' },
    ];

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="About EqualHeart"
                subtitle="We are on a mission to bring hearts together and create everlasting bonds."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1920&q=80"
            />


            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
                {/* Mission & Vision */}
                <Box sx={{ mb: 8 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: 4,
                        }}
                    >
                        <Paper
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            elevation={0}
                            sx={{
                                p: 5,
                                height: '100%',
                                borderRadius: 4,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                color: 'white',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                <Favorite fontSize="large" sx={{ color: 'white' }} />
                            </Box>
                            <Typography variant="h4" fontWeight="800" gutterBottom>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" fontSize="1.1rem" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                                To create meaningful connections that last a lifetime. We believe that everyone deserves to find love, respect, and companionship, regardless of their background, culture, or beliefs. We are dedicated to providing a safe and secure platform for you to find your soulmate.
                            </Typography>
                        </Paper>

                        <Paper
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            elevation={0}
                            sx={{
                                p: 5,
                                height: '100%',
                                borderRadius: 4,
                                bgcolor: 'white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <Box sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                <Public fontSize="large" color="secondary" />
                            </Box>
                            <Typography variant="h4" fontWeight="800" gutterBottom color="text.primary">
                                Our Vision
                            </Typography>
                            <Typography variant="body1" fontSize="1.1rem" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                To be the most trusted and inclusive matrimonial platform globally, where technology meets tradition to foster genuine relationships. We envision a world where finding a life partner is a joyful, transparent, and successful journey for everyone.
                            </Typography>
                        </Paper>
                    </Box>
                </Box>

                {/* Stats Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        mb: 8,
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                            gap: 4,
                            alignItems: 'center',
                        }}
                    >
                        {stats.map((stat, index) => (
                            <Box key={index} textAlign="center">
                                <Typography variant="h3" fontWeight="900" color="primary" gutterBottom>
                                    {stat.value}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" fontWeight="600">
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>

                {/* Why Choose Us */}
                <Box mb={8}>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={1.5}>
                            WHY CHOOSE US
                        </Typography>
                        <Typography variant="h3" fontWeight="800" sx={{ mt: 1 }}>
                            Trust & Transparency First
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {[
                            { icon: <Security fontSize="large" />, title: '100% Verified Profiles', desc: 'Every profile goes through a rigorous manual verification process to ensure authenticity.' },
                            { icon: <Favorite fontSize="large" />, title: 'AI-Powered Matching', desc: 'Our smart algorithm considers compatibility, values, and preferences to find your best match.' },
                            { icon: <Public fontSize="large" />, title: 'Global Reach', desc: 'Connect with eligible singles from your community, whether they are in your city or across the globe.' },
                            { icon: <Group fontSize="large" />, title: 'Privacy Control', desc: 'You have strict control over who sees your photos and contact info. Your privacy is our priority.' },
                        ].map((item, index) => (
                            <Paper
                                key={index}
                                component={motion.div}
                                whileHover={{ y: -8 }}
                                elevation={0}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    height: '100%',
                                    borderRadius: 3,
                                    bgcolor: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Box sx={{ color: 'primary.main', mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.08), width: 70, height: 70, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {item.desc}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* CTA */}
                <Box sx={{ textAlign: 'center', py: 8, px: 2, borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <Typography variant="h4" fontWeight="800" gutterBottom>
                        Ready to Write Your Own Story?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                        Join thousands of happy couples who found their soulmate on EqualHeart.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/auth/register')}
                        sx={{ px: 5, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}
                    >
                        Get Started for Free
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUs;
