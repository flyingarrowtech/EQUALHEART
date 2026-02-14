import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../../components/common/ProfileCard';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import userApi from '../../api/userApi';

const Shortlisted: React.FC = () => {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchShortlisted = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.getShortlisted();
            if (response.success) {
                setProfiles(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch shortlisted users', err);
            setError('Failed to load your shortlisted profiles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShortlisted();
    }, []);

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Shortlisted Profiles"
                subtitle="Profiles you've saved for later. Connect when you're ready!"
                gradient
                backgroundImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80"
            />

            <Container maxWidth="xl" sx={{ mt: -6 }}>
                {loading ? (
                    <LoadingState type="skeleton-cards" count={4} />
                ) : error ? (
                    <ErrorState message={error} onRetry={fetchShortlisted} />
                ) : profiles.length === 0 ? (
                    <EmptyState
                        type="favorites"
                        title="No Shortlisted Profiles"
                        message="You haven't shortlisted anyone yet. Browse profiles and tap the star icon to save them here."
                        ctaButton={{
                            label: 'Browse Profiles',
                            onClick: () => (window.location.href = '/search'),
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {profiles.map((profile) => (
                            <Box key={profile._id}>
                                <ProfileCard profile={profile} />
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Shortlisted;
