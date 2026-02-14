import React from 'react';
import {
    Box,
    Card,
    Typography,
    Avatar,
    Button,
    Chip,
    Stack,
} from '@mui/material';
import {
    LocationOn,
    Height,
    CalendarToday,
    Close,
    Check,
    Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface InterestRequestCardProps {
    request: any; // profile object
    type?: 'received' | 'sent';
    onAccept?: (id: string | number) => void;
    onReject?: (id: string | number) => void;
    onViewProfile?: (id: string | number) => void;
    showActions?: boolean;
}

const InterestRequestCard: React.FC<InterestRequestCardProps> = ({
    request,
    type = 'received',
    onAccept,
    onReject,
    onViewProfile,
    showActions,
}) => {
    const navigate = useNavigate();

    // Handle potential data structure variations
    const profile = request.fromUser || request.toUser || request;
    const status = request.status;
    const createdAt = request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A';

    // Handle mock data where _id might be missing
    const profileId = profile._id || profile.id;

    const handleViewProfile = () => {
        if (onViewProfile) {
            onViewProfile(profileId);
        } else {
            navigate(`/profile/${profileId}`);
        }
    };

    const showActionButtons = showActions !== undefined
        ? showActions
        : (type === 'received' && status === 'pending');

    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'flex-start', sm: 'center' },
            }}
        >
            {/* Avatar */}
            <Avatar
                src={profile.photos?.[0]?.url || profile.profilePicture}
                sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    borderRadius: 3,
                    cursor: 'pointer',
                }}
                onClick={handleViewProfile}
            />

            {/* Content */}
            <Box sx={{ flex: 1, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap' }}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                            onClick={handleViewProfile}
                        >
                            {profile.fullName?.firstName} {profile.fullName?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {profile.age} yrs • {profile.occupation || 'N/A'}
                        </Typography>
                    </Box>
                    <Chip
                        label={status || (type === 'sent' ? 'Sent' : 'Pending')}
                        size="small"
                        color={status === 'accepted' ? 'success' : status === 'rejected' ? 'error' : 'warning'}
                        variant="outlined"
                        sx={{ fontWeight: 600, mt: { xs: 1, sm: 0 } }}
                    />
                </Box>

                <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Height sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {profile.height || 'N/A'} cm
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {profile.city || profile.location?.city || 'City'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {createdAt}
                        </Typography>
                    </Box>
                </Stack>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                    {showActionButtons && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<Check />}
                                onClick={() => onAccept?.(request._id || request.id)}
                                sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<Close />}
                                onClick={() => onReject?.(request._id || request.id)}
                                sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
                            >
                                Decline
                            </Button>
                        </>
                    )}

                    <Button
                        variant="text"
                        size="small"
                        startIcon={<Person />}

                        onClick={handleViewProfile}
                        sx={{ ml: 'auto', fontWeight: 600 }}
                    >
                        View Profile
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default InterestRequestCard;
