import React from 'react';
import { Box, Container, Typography, Card, CardContent, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward, Favorite } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const stories = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        names: 'Rahul & Priya',
        location: 'Mumbai, India',
        date: 'Married on Dec 15, 2023',
        story: 'We found each other on EqualHeart and instantly connected. After months of conversations and meetings, we knew we were meant to be together. Thank you for helping us find our perfect match!',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
        names: 'Amit & Sneha',
        location: 'Delhi, India',
        date: 'Married on Jan 20, 2024',
        story: 'EqualHeart made our search so easy! The AI matching was spot-on, and we connected immediately. We are now happily married and grateful for this wonderful platform.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
        names: 'Vikram & Anjali',
        location: 'Bangalore, India',
        date: 'Married on Feb 14, 2024',
        story: 'After trying many platforms, we finally found each other here. The verified profiles gave us confidence, and the rest is history. Highly recommend EqualHeart!',
    },
];

const SuccessStoriesSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    React.useEffect(() => {
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentStory = stories[currentIndex];

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg" sx={{ mt: -6 }}>
                <SectionTitle
                    title="Success Stories"
                    subtitle="Real couples who found their perfect match with us"
                    gradient
                />

                <Box sx={{
                    position: 'relative', maxWidth: 900, mx: 'auto'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStory.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                    }}
                                >
                                    {/* Image */}
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            height: { xs: 300, md: 400 },
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={currentStory.image}
                                            alt={currentStory.names}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 20,
                                                right: 20,
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Favorite sx={{ color: '#e91e63', fontSize: 32 }} />
                                        </Box>
                                    </Box>

                                    {/* Content */}
                                    <CardContent sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 800,
                                                mb: 1,
                                                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            {currentStory.names}
                                        </Typography>

                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                            {currentStory.location}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#4caf50',
                                                fontWeight: 600,
                                                mb: 3,
                                                display: 'block',
                                            }}
                                        >
                                            {currentStory.date}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontStyle: 'italic',
                                                lineHeight: 1.8,
                                                color: 'text.secondary',
                                                mb: 3,
                                                fontSize: '1.05rem',
                                            }}
                                        >
                                            "{currentStory.story}"
                                        </Typography>

                                        {/* Dots Indicator */}
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {stories.map((_, index) => (
                                                <Box
                                                    key={index}
                                                    onClick={() => setCurrentIndex(index)}
                                                    sx={{
                                                        width: index === currentIndex ? 32 : 8,
                                                        height: 8,
                                                        borderRadius: 4,
                                                        bgcolor: index === currentIndex ? '#e91e63' : '#e0e0e0',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Box>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: { xs: 10, md: -60 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            '&:hover': {
                                bgcolor: '#e91e63',
                                color: 'white',
                            },
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: { xs: 10, md: -60 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            '&:hover': {
                                bgcolor: '#e91e63',
                                color: 'white',
                            },
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default SuccessStoriesSection;
