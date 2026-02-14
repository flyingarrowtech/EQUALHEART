import React from 'react';
import { Box, Container, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const benefits = [
    'Trusted by over 10,000+ happy couples worldwide',
    'Advanced AI matching algorithm for better compatibility',
    'All profiles verified for authenticity and safety',
    'Complete privacy and data security guaranteed',
    '98% success rate in finding perfect matches',
    'Dedicated relationship counselors available',
    'Free personality assessment and compatibility reports',
    'Active community with regular events and meetups',
];

const WhyChooseSection: React.FC = () => {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 6,
                        alignItems: 'center',
                    }}
                >
                    {/* Left: Image */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        sx={{
                            position: 'relative',
                            order: { xs: 2, md: 1 },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 4,
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -20,
                                    left: -20,
                                    right: 20,
                                    bottom: 20,
                                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                    borderRadius: 4,
                                    zIndex: -1,
                                },
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800"
                                alt="Happy Couple"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: '16px',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Right: Content */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        sx={{ order: { xs: 1, md: 2 } }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Why Choose EqualHeart?
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
                        >
                            We're not just another matrimonial platform. We're a community dedicated to helping you find your perfect life partner with advanced technology and personalized support.
                        </Typography>

                        <List sx={{ mb: 4 }}>
                            {benefits.map((benefit, index) => (
                                <ListItem
                                    key={index}
                                    component={motion.div}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    sx={{ px: 0, py: 1 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <CheckCircle sx={{ color: '#4caf50', fontSize: 28 }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={benefit}
                                        primaryTypographyProps={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                boxShadow: '0 8px 24px rgba(233, 30, 99, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                                    boxShadow: '0 12px 32px rgba(233, 30, 99, 0.5)',
                                },
                            }}
                        >
                            Get Started Now
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WhyChooseSection;
