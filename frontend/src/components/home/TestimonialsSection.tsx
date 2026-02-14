import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        location: 'Mumbai, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=12',
        text: 'EqualHeart helped me find my soulmate! The AI matching was incredibly accurate. Highly recommend to anyone looking for a life partner.',
        verified: true,
    },
    {
        name: 'Priya Sharma',
        location: 'Delhi, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=45',
        text: 'Best matrimonial platform I have used. The profiles are genuine, and the support team is very helpful. Found my perfect match within 3 months!',
        verified: true,
    },
    {
        name: 'Amit Patel',
        location: 'Ahmedabad, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=33',
        text: 'The verification process gave me confidence. I met my wife here, and we couldn\'t be happier. Thank you, EqualHeart!',
        verified: true,
    },
    {
        name: 'Sneha Reddy',
        location: 'Hyderabad, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=47',
        text: 'Amazing experience! The platform is user-friendly, and the matches were very compatible. Found my life partner in just 2 months.',
        verified: true,
    },
    {
        name: 'Vikram Singh',
        location: 'Jaipur, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=15',
        text: 'Professional service with genuine profiles. The privacy features are excellent. Highly satisfied with my experience.',
        verified: true,
    },
    {
        name: 'Anjali Mehta',
        location: 'Pune, India',
        rating: 5,
        photo: 'https://i.pravatar.cc/150?img=48',
        text: 'EqualHeart exceeded my expectations. The quality of matches and the overall experience was outstanding. Found my perfect partner!',
        verified: true,
    },
];

const TestimonialsSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <SectionTitle
                    title="What Our Members Say"
                    subtitle="Hear from thousands of happy couples who found love with us"
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
                        gap: 3,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <Box
                            key={index}
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
                                        boxShadow: '0 12px 40px rgba(233, 30, 99, 0.2)',
                                        borderColor: '#e91e63',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    {/* Rating */}
                                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

                                    {/* Testimonial Text */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            fontStyle: 'italic',
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            minHeight: 100,
                                        }}
                                    >
                                        "{testimonial.text}"
                                    </Typography>

                                    {/* User Info */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            src={testimonial.photo}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {testimonial.name}
                                                </Typography>
                                                {testimonial.verified && (
                                                    <VerifiedUser sx={{ color: '#4caf50', fontSize: 20 }} />
                                                )}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;
