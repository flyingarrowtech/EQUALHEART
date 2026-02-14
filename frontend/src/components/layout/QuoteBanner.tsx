import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

const quotes = [
    "Where hearts meet, love begins ❤️",
    "Your perfect match is just a click away 💕",
    "Building beautiful relationships, one match at a time ✨",
    "Love knows no boundaries, find yours here 💑",
    "Creating connections that last a lifetime 💖",
];

const QuoteBanner: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #D81B60 0%, #8E24AA 100%)'
                    : 'linear-gradient(90deg, #EC407A 0%, #AB47BC 100%)',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #D81B60 0%, #8E24AA 100%)'
                    : 'linear-gradient(90deg, #EC407A 0%, #AB47BC 100%)',
                py: 1,
                overflow: 'hidden',
                position: 'relative',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    minHeight: '32px',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 16, color: 'white', animation: 'pulse 2s infinite' }} />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontWeight: 500,
                                textAlign: 'center',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                letterSpacing: '0.5px',
                            }}
                        >
                            {quotes[currentQuote]}
                        </Typography>
                    </motion.div>
                </AnimatePresence>
                <FavoriteIcon sx={{ fontSize: 16, color: 'white', animation: 'pulse 2s infinite' }} />
            </Box>

            {/* Add keyframe animation */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                            opacity: 1;
                        }
                        50% {
                            transform: scale(1.1);
                            opacity: 0.8;
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default QuoteBanner;
