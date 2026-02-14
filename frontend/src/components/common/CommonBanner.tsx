import React from 'react';
import { Box, Typography, Container, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';

interface CommonBannerProps {
    title: string;
    subtitle?: string;
}

const CommonBanner: React.FC<CommonBannerProps> = ({ title, subtitle }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                background: `linear-gradient(-45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 15s ease infinite',
                color: 'white',
                pt: { xs: 4, md: 8 },
                pb: { xs: 4, md: 6 },
                mb: 4,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
                '@keyframes gradientAnimation': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Breadcrumbs />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            mb: 1,
                            textShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            letterSpacing: '-1px',
                        }}
                    >
                        {title}
                    </Typography>
                </motion.div>

                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                opacity: 0.9,
                                fontWeight: 400,
                                maxWidth: '650px',
                                lineHeight: 1.6,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            {subtitle}
                        </Typography>
                    </motion.div>
                )}
            </Container>
        </Box>
    );
};

export default CommonBanner;
