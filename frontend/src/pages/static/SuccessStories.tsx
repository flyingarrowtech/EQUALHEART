import React from 'react';
import { Container, Typography, Box, Paper, Chip, Card, Button } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PageHeader from '../../components/common/PageHeader';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const successStories = [
    {
        names: 'Priya & Rahul',
        location: 'Mumbai, India',
        date: 'December 2023',
        story: 'We met on EqualHeart and instantly connected over our love for travel and food. After 6 months of getting to know each other, we knew we were meant to be together. Thank you EqualHeart for bringing us together!',
        image: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?w=400&q=80'
    },
    {
        names: 'Ananya & Vikram',
        location: 'Bangalore, India',
        date: 'October 2023',
        story: 'EqualHeart\'s AI matching was spot on! We had so much in common - from our career goals to our family values. We\'re now happily married and expecting our first child!',
        image: 'https://images.unsplash.com/photo-1596707328178-0cb93bda0076?w=400&q=80'
    },
    {
        names: 'Sneha & Arjun',
        location: 'Delhi, India',
        date: 'August 2023',
        story: 'After years of unsuccessful searching, we found each other on EqualHeart. The verification process made us feel safe, and the platform made it easy to connect. We couldn\'t be happier!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
    },
    {
        names: 'Divya & Karthik',
        location: 'Chennai, India',
        date: 'June 2023',
        story: 'Long-distance seemed impossible until we met on EqualHeart. The platform helped us stay connected and build a strong foundation. Now we\'re living together and loving every moment!',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80'
    },
    {
        names: 'Riya & Aditya',
        location: 'Pune, India',
        date: 'May 2023',
        story: 'We were both skeptical about online matrimony, but EqualHeart changed our minds. The detailed profiles and genuine users made all the difference. We found our perfect match!',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
    },
    {
        names: 'Meera & Rohan',
        location: 'Hyderabad, India',
        date: 'March 2023',
        story: 'EqualHeart brought together two families, not just two people. The platform\'s focus on compatibility and values helped us find not just a partner, but a soulmate. Forever grateful!',
        image: 'https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&q=80'
    }
];

const SuccessStories: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Success Stories"
                subtitle="Real people. Real love. Read heartwarming stories from our couples."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
                {/* Stats */}
                <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 4, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                            gap: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {[
                            { number: '5,000+', label: 'Happy Couples' },
                            { number: '50+', label: 'Countries' },
                            { number: '98%', label: 'Success Rate' }
                        ].map((stat, index) => (
                            <Box key={index} textAlign="center">
                                <Typography variant="h3" fontWeight="900" color="primary">
                                    {stat.number}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>

                {/* Stories Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 4,
                    }}
                >
                    {successStories.map((story, index) => (
                        <Card
                            key={index}
                            component={motion.div}
                            whileHover={{ y: -5 }}
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <Box sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 250, sm: 'auto' }, position: 'relative' }}>
                                <Box
                                    component="img"
                                    src={story.image}
                                    alt={story.names}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">{story.names}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                        <Chip icon={<LocationOnIcon sx={{ fontSize: 14 }} />} label={story.location} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                        <Chip icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />} label={story.date} size="small" color="primary" variant="outlined" sx={{ borderRadius: 1 }} />
                                    </Box>
                                </Box>

                                <Box sx={{ position: 'relative', flex: 1 }}>
                                    <FormatQuoteIcon sx={{ position: 'absolute', top: -5, left: -5, opacity: 0.1, fontSize: 40 }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                                        "{story.story}"
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>

                {/* Footer CTA */}
                <Box textAlign="center" mt={8}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Create Your Own Love Story
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Join today and let us help you find your soulmate.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ px: 6, py: 1.5, borderRadius: 50, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Start Your Journey
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default SuccessStories;
