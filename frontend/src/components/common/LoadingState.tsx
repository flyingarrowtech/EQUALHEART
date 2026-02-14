import React from 'react';
import { Box, CircularProgress, Skeleton, Card, CardContent } from '@mui/material';

interface LoadingStateProps {
    type?: 'spinner' | 'skeleton-cards' | 'skeleton-list' | 'skeleton-profile';
    count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ type = 'spinner', count = 3 }) => {
    if (type === 'spinner') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 10,
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{
                        color: '#e91e63',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
            </Box>
        );
    }

    if (type === 'skeleton-cards') {
        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 3,
                }}
            >
                {Array.from({ length: count }).map((_, index) => (
                    <Card key={index} sx={{ borderRadius: 3 }}>
                        <Skeleton variant="rectangular" height={240} sx={{ borderRadius: '12px 12px 0 0' }} />
                        <CardContent>
                            <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                            <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="70%" height={20} />
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    }

    if (type === 'skeleton-list') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Array.from({ length: count }).map((_, index) => (
                    <Card key={index} sx={{ borderRadius: 3, p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Skeleton variant="circular" width={60} height={60} />
                            <Box sx={{ flex: 1 }}>
                                <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1 }} />
                                <Skeleton variant="text" width="60%" height={20} />
                                <Skeleton variant="text" width="50%" height={20} />
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        );
    }

    if (type === 'skeleton-profile') {
        return (
            <Box>
                {/* Header */}
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3, mb: 3 }} />

                {/* Content Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                    <Box>
                        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 3 }} />
                        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
                    </Box>
                    <Box>
                        <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3, mb: 3 }} />
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
};

export default LoadingState;
