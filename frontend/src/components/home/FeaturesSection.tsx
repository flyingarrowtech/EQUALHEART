import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import {
    VerifiedUser,
    Psychology,
    Lock,
    SupportAgent,
    Videocam,
    TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const features = [
    {
        icon: Psychology,
        title: 'AI-Powered Matching',
        description: 'Advanced algorithm finds your most compatible matches based on preferences and behavior',
        color: '#e91e63',
    },
    {
        icon: VerifiedUser,
        title: 'Verified Profiles',
        description: 'All profiles are verified to ensure authenticity and safety of our members',
        color: '#9c27b0',
    },
    {
        icon: Lock,
        title: 'Privacy & Security',
        description: 'Your data is encrypted and protected with industry-leading security measures',
        color: '#2196f3',
    },
    {
        icon: SupportAgent,
        title: '24/7 Support',
        description: 'Our dedicated team is always available to help you with any questions',
        color: '#ff9800',
    },
    {
        icon: Videocam,
        title: 'Video Calls',
        description: 'Connect face-to-face with matches through secure in-app video calls',
        color: '#4caf50',
    },
    {
        icon: TrendingUp,
        title: 'Success Stories',
        description: 'Join thousands of happy couples who found their perfect match with us',
        color: '#f44336',
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <SectionTitle
                    title="Why Choose EqualHeart"
                    subtitle="Discover the features that make us the best matrimonial platform"
                    gradient
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 4,
                    }}
                >
                    {features.map((feature, index) => (
                        <Box
                            key={feature.title}
                            component={motion.div}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'all 0.3s ease',
                                    border: '2px solid transparent',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 40px ${feature.color}30`,
                                        borderColor: feature.color,
                                        '& .feature-icon': {
                                            transform: 'scale(1.1) rotate(5deg)',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    {/* Icon */}
                                    <Box
                                        className="feature-icon"
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 4,
                                            background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            transition: 'transform 0.3s ease',
                                        }}
                                    >
                                        <feature.icon sx={{ fontSize: 40, color: feature.color }} />
                                    </Box>

                                    {/* Title */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {feature.description}
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

export default FeaturesSection;
