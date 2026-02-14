import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Stack,
    Divider,
    Tooltip
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    AccessTime as TimeIcon,
    LocationOn as LocationIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import userApi from '../../api/userApi';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import PageHeader from '../../components/common/PageHeader';

interface Visitor {
    _id: string;
    visitorId: {
        _id: string;
        fullName: { firstName: string; lastName: string };
        age: number;
        city: string;
        occupation: string;
        highestEducation: string;
        photos: Array<{ url: string; isMain: boolean }>;
    };
    visitedAt: string;
}

const Visitors: React.FC = () => {
    const theme = useTheme();
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await userApi.getVisitors();
                setVisitors(response.data || []);
            } catch (err: any) {
                console.error('Failed to fetch visitors', err);
                setError('Failed to load visitors. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchVisitors();
    }, []);

    const getTimeAgo = (date: string) => {
        const now = new Date();
        const visitDate = new Date(date);
        const diffMs = now.getTime() - visitDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return visitDate.toLocaleDateString();
    };

    if (loading) return <LoadingState type="skeleton-list" />;
    if (error) return <ErrorState message={error} />;

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Profile Visitors"
                subtitle="See who has viewed your profile recently"
                gradient
                backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 4 },
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    {visitors.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <VisibilityIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                No visitors yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                When someone views your profile, they'll appear here
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" fontWeight={700}>
                                    Recent Visitors ({visitors.length})
                                </Typography>
                            </Box>
                            <Divider />
                            {visitors.map((visitor, index) => (
                                <motion.div
                                    key={visitor._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            bgcolor: 'background.paper',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                transform: 'translateY(-2px)',
                                                borderColor: 'primary.main'
                                            }
                                        }}
                                        onClick={() => window.location.href = `/profile/${visitor.visitorId._id}`}
                                    >
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Avatar
                                                src={visitor.visitorId.photos?.find(p => p.isMain)?.url ?
                                                    `${import.meta.env.VITE_API_URL}${visitor.visitorId.photos.find(p => p.isMain)?.url}` :
                                                    undefined
                                                }
                                                sx={{
                                                    width: { xs: 60, md: 80 },
                                                    height: { xs: 60, md: 80 },
                                                    bgcolor: 'primary.main',
                                                    fontSize: '1.5rem'
                                                }}
                                            >
                                                {visitor.visitorId.fullName.firstName.charAt(0)}
                                            </Avatar>

                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                                                    {visitor.visitorId.fullName.firstName} {visitor.visitorId.fullName.lastName}
                                                </Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                                                    <Chip
                                                        icon={<FavoriteIcon fontSize="small" />}
                                                        label={`${visitor.visitorId.age} yrs`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                    {visitor.visitorId.city && (
                                                        <Chip
                                                            icon={<LocationIcon fontSize="small" />}
                                                            label={visitor.visitorId.city}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </Stack>
                                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                                    {visitor.visitorId.occupation && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <WorkIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {visitor.visitorId.occupation}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    {visitor.visitorId.highestEducation && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <SchoolIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {visitor.visitorId.highestEducation}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>

                                            <Box sx={{ textAlign: 'right' }}>
                                                <Tooltip title={new Date(visitor.visitedAt).toLocaleString()}>
                                                    <Chip
                                                        icon={<TimeIcon fontSize="small" />}
                                                        label={getTimeAgo(visitor.visitedAt)}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                            color: 'primary.main',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            ))}
                        </Stack>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default Visitors;
