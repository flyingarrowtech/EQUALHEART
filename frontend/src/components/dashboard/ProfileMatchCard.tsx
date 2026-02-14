import React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Chip } from '@mui/material';
import { LocationOn, Work } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ProfileMatchCardProps {
    profile: {
        id: number;
        name: string;
        age: number;
        location: string;
        profession?: string;
        image: string;
        matchScore?: number;
    };
    onClick?: () => void;
}

const ProfileMatchCard: React.FC<ProfileMatchCardProps> = ({ profile, onClick }) => {
    return (
        <Card
            component={motion.div}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
            onClick={onClick}
            sx={{
                minWidth: 200,
                maxWidth: 200,
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Avatar
                    src={profile.image}
                    sx={{
                        width: '100%',
                        height: 240,
                        borderRadius: '12px 12px 0 0',
                    }}
                    variant="square"
                />
                {profile.matchScore && (
                    <Chip
                        label={`${profile.matchScore}% Match`}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: '#4caf50',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                        }}
                    />
                )}
            </Box>

            <CardContent sx={{ p: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1rem',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {profile.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontSize: '0.85rem' }}
                >
                    {profile.age} years
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {profile.location}
                    </Typography>
                </Box>

                {profile.profession && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Work sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {profile.profession}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileMatchCard;
