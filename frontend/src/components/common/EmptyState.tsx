import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
    SearchOff,
    FavoriteBorder,
    MessageOutlined,
    PersonOutline,
    InboxOutlined,
} from '@mui/icons-material';

interface EmptyStateProps {
    type?: 'search' | 'favorites' | 'messages' | 'profiles' | 'general';
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    ctaButton?: {
        label: string;
        onClick: () => void;
    };
}

const iconMap = {
    search: SearchOff,
    favorites: FavoriteBorder,
    messages: MessageOutlined,
    profiles: PersonOutline,
    general: InboxOutlined,
};

const defaultMessages = {
    search: {
        title: 'No Results Found',
        message: 'Try adjusting your search filters or criteria',
    },
    favorites: {
        title: 'No Favorites Yet',
        message: 'Start adding profiles to your favorites list',
    },
    messages: {
        title: 'No Messages',
        message: 'Start a conversation with your matches',
    },
    profiles: {
        title: 'No Profiles',
        message: 'Check back later for new profiles',
    },
    general: {
        title: 'Nothing Here',
        message: 'There is no content to display',
    },
};

const EmptyState: React.FC<EmptyStateProps> = ({
    type = 'general',
    title,
    message,
    icon,
    ctaButton,
}) => {
    const Icon = icon ? null : iconMap[type];
    const defaultContent = defaultMessages[type];

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
            {/* Icon */}
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                {icon || (Icon && (
                    <Icon
                        sx={{
                            fontSize: 60,
                            color: '#e91e63',
                            opacity: 0.7,
                        }}
                    />
                ))}
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
                {title || defaultContent.title}
            </Typography>

            {/* Message */}
            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    maxWidth: 400,
                    mb: ctaButton ? 4 : 0,
                }}
            >
                {message || defaultContent.message}
            </Typography>

            {/* CTA Button */}
            {ctaButton && (
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={ctaButton.onClick}
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
                        {ctaButton.label}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default EmptyState;
