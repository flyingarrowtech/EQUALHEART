import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                py: { xs: 10, md: 15 },
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: { md: 'fixed' },
                    opacity: 0.15,
                },
            }}
        >
            <Container maxWidth="md">
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        Ready to Find Your Perfect Match?
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 6,
                            opacity: 0.95,
                            fontWeight: 400,
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            maxWidth: 700,
                            mx: 'auto',
                        }}
                    >
                        Join thousands of happy couples who found their life partner with EqualHeart. Start your journey to love today!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={() => navigate('/register')}
                            sx={{
                                px: 6,
                                py: 2.5,
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                borderRadius: 3,
                                bgcolor: 'white',
                                color: '#e91e63',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                                '&:hover': {
                                    bgcolor: '#f5f5f5',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Create Free Profile
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/search')}
                            sx={{
                                px: 6,
                                py: 2.5,
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                borderRadius: 3,
                                borderColor: 'white',
                                color: 'white',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    transform: 'translateY(-4px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Browse Profiles
                        </Button>
                    </Box>

                    {/* Trust Indicators */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: { xs: 3, sm: 6 },
                            mt: 8,
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { label: 'Trusted by 10,000+ Couples' },
                            { label: '98% Success Rate' },
                            { label: '100% Verified Profiles' },
                        ].map((item) => (
                            <Box key={item.label} sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        opacity: 0.95,
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                    }}
                                >
                                    ✓ {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CTASection;
