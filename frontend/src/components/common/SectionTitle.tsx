import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    gradient?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    align = 'center',
    gradient = false,
}) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ textAlign: align, mb: 6 }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                    ...(gradient && {
                        background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }),
                }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.secondary',
                        maxWidth: 600,
                        mx: align === 'center' ? 'auto' : 0,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default SectionTitle;
