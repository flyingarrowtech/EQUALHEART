import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button,
    Chip,
    Stack,
    Tooltip,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    LocationOn,
    Cake,
    Height,
    Work,
    School,
    VerifiedUser,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
    profile: any;
    onShortlist?: (id: string) => void;
    isShortlisted?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    profile,
    onShortlist,
    isShortlisted = false,
}) => {
    const navigate = useNavigate();

    return (
        <Card
            component={motion.div}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Image Section */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="280"
                    image={
                        profile.profilePicture ||
                        profile.photos?.find((p: any) => p.isMain)?.url ||
                        profile.photos?.[0]?.url ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60'
                    }
                    alt={profile.fullName ? `${profile.fullName.firstName} ${profile.fullName.lastName}` : 'Profile'}
                    sx={{ objectFit: 'cover' }}
                />

                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    }}
                />

                {/* Shortlist Button */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onShortlist && onShortlist(profile._id);
                    }}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    {isShortlisted ? (
                        <Favorite sx={{ color: '#e91e63' }} />
                    ) : (
                        <FavoriteBorder sx={{ color: '#e91e63' }} />
                    )}
                </IconButton>

                {/* Verified Badge */}
                {profile.isVerified && (
                    <Tooltip title="Verified Profile">
                        <Chip
                            icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                            label="Verified"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                bgcolor: '#4caf50',
                                color: 'white',
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: 'white' },
                            }}
                        />
                    </Tooltip>
                )}

                {/* Basic Info Overlay */}
                <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, color: 'white' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {profile.fullName?.firstName} {profile.fullName?.lastName}, {profile.age}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
                        <LocationOn sx={{ fontSize: 16 }} />
                        <Typography variant="body2" noWrap>
                            {profile.location?.city || 'City'}, {profile.location?.country || 'Country'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Stack spacing={1.5} sx={{ mb: 2 }}>
                    {/* Key Details Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Height sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {profile.height || 'N/A'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Cake sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {profile.religion || 'Religion'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {profile.education?.[0]?.degree || 'Education'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Work sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {profile.occupation || 'Profession'}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/profile/${profile._id}`)}
                    sx={{
                        borderRadius: 2,
                        borderColor: '#e91e63',
                        color: '#e91e63',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#c2185b',
                            bgcolor: 'rgba(233, 30, 99, 0.05)',
                        },
                    }}
                >
                    View Full Profile
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
