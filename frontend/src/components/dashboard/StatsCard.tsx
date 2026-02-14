import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
    Favorite,
    Star,
    Message,
    BookmarkBorder,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StatsCardProps {
    profileCompletion: number;
    stats: {
        likes: number;
        matches: number;
        messages: number;
        shortlist: number;
    };
}

const StatsCard: React.FC<StatsCardProps> = ({ profileCompletion, stats }) => {
    const statItems = [
        { label: 'Likes', value: stats.likes, icon: Favorite, color: '#e91e63' },
        { label: 'Matches', value: stats.matches, icon: Star, color: '#ff9800' },
        { label: 'Messages', value: stats.messages, icon: Message, color: '#4caf50' },
        { label: 'Shortlist', value: stats.shortlist, icon: BookmarkBorder, color: '#2196f3' },
    ];

    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: '100%',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Profile status
                </Typography>

                {/* Circular Progress */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                            width: 120,
                            height: 120,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: `conic-gradient(
                  #e91e63 0% ${profileCompletion}%,
                  #f0f0f0 ${profileCompletion}% 100%
                )`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '85%',
                                    height: '85%',
                                    borderRadius: '50%',
                                    bgcolor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 900,
                                        background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {profileCompletion}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Profile Completion
                    </Typography>
                </Box>

                {/* Stats Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                    }}
                >
                    {statItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Box
                                key={item.label}
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: `${item.color}10`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: `${item.color}20`,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <Icon sx={{ fontSize: 28, color: item.color, mb: 1 }} />
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 800, color: item.color, mb: 0.5 }}
                                >
                                    {item.value}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {item.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
