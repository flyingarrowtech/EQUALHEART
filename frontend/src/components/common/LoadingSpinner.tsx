import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', fullScreen = false }) => {
    const sizeMap = {
        small: 40,
        medium: 60,
        large: 80,
    };

    const iconSize = sizeMap[size];

    const containerSx: any = fullScreen
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 9999,
        }
        : {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
        };

    return (
        <Box sx={containerSx}>
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                sx={{ position: 'relative' }}
            >
                <CircularProgress
                    size={iconSize}
                    thickness={4}
                    sx={{
                        color: 'transparent',
                        '& .MuiCircularProgress-circle': {
                            stroke: 'url(#gradient)',
                        },
                    }}
                />
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e91e63" />
                            <stop offset="100%" stopColor="#9c27b0" />
                        </linearGradient>
                    </defs>
                </svg>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <FavoriteIcon
                        sx={{
                            fontSize: iconSize * 0.5,
                            color: '#e91e63',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingSpinner;
