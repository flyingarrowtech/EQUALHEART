import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import {
    PersonAdd,
    Search,
    Favorite,
    EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const steps = [
    {
        number: '01',
        icon: PersonAdd,
        title: 'Create Profile',
        description: 'Sign up and create your detailed profile with photos and preferences',
        color: '#e91e63',
    },
    {
        number: '02',
        icon: Search,
        title: 'Search Matches',
        description: 'Browse through verified profiles matching your preferences',
        color: '#9c27b0',
    },
    {
        number: '03',
        icon: Favorite,
        title: 'Connect',
        description: 'Send interests and start conversations with potential matches',
        color: '#ff9800',
    },
    {
        number: '04',
        icon: EmojiEvents,
        title: 'Find Love',
        description: 'Meet your perfect match and start your journey together',
        color: '#4caf50',
    },
];

const HowItWorksSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <SectionTitle
                    title="How It Works"
                    subtitle="Find your perfect match in 4 simple steps"
                    gradient
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 3,
                        position: 'relative',
                    }}
                >
                    {/* Connection Line (Desktop only) */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            position: 'absolute',
                            top: 80,
                            left: '12.5%',
                            right: '12.5%',
                            height: 2,
                            background: 'linear-gradient(90deg, #e91e63 0%, #9c27b0 50%, #ff9800 75%, #4caf50 100%)',
                            opacity: 0.3,
                            zIndex: 0,
                        }}
                    />

                    {steps.map((step, index) => (
                        <Box
                            key={step.number}
                            component={motion.div}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            sx={{ position: 'relative', zIndex: 1 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'all 0.3s ease',
                                    border: '2px solid transparent',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 40px ${step.color}30`,
                                        borderColor: step.color,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    {/* Number Badge */}
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3,
                                            boxShadow: `0 8px 24px ${step.color}40`,
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{ color: 'white', fontWeight: 800 }}
                                        >
                                            {step.number}
                                        </Typography>
                                    </Box>

                                    {/* Icon */}
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: `${step.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3,
                                        }}
                                    >
                                        <step.icon sx={{ fontSize: 40, color: step.color }} />
                                    </Box>

                                    {/* Title */}
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 2, color: step.color }}
                                    >
                                        {step.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body2" color="text.secondary">
                                        {step.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default HowItWorksSection;
