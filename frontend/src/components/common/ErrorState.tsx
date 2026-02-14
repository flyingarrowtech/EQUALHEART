import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryLabel?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    title = 'Something Went Wrong',
    message = 'We encountered an error while loading this content. Please try again.',
    onRetry,
    retryLabel = 'Try Again',
}) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 10,
                px: 3,
                textAlign: 'center',
            }}
        >
            {/* Error Icon */}
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <ErrorOutline
                    sx={{
                        fontSize: 60,
                        color: '#f44336',
                    }}
                />
            </Box>

            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: 'text.primary',
                }}
            >
                {title}
            </Typography>

            {/* Message */}
            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    maxWidth: 400,
                    mb: onRetry ? 4 : 0,
                }}
            >
                {message}
            </Typography>

            {/* Retry Button */}
            {onRetry && (
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={onRetry}
                        startIcon={<Refresh />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                                boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                            },
                        }}
                    >
                        {retryLabel}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ErrorState;
