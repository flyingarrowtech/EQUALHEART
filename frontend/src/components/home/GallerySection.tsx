import React from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const photos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600',
];

const GallerySection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <SectionTitle
                    title="Happy Moments"
                    subtitle="Celebrating love stories from our community"
                    gradient
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 2,
                    }}
                >
                    {photos.map((photo, index) => (
                        <Box
                            key={index}
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            sx={{
                                position: 'relative',
                                paddingTop: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                                    '& img': {
                                        transform: 'scale(1.1)',
                                    },
                                    '&::after': {
                                        opacity: 0,
                                    },
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.3) 0%, rgba(156, 39, 176, 0.3) 100%)',
                                    opacity: 1,
                                    transition: 'opacity 0.3s ease',
                                },
                            }}
                        >
                            <img
                                src={photo}
                                alt={`Couple ${index + 1}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default GallerySection;
