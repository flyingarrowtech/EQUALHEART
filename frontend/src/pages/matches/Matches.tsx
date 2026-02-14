import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import ProfileCard from '../../components/common/ProfileCard';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import userApi from '../../api/userApi';
import { useNotificationStore } from '../../store/useNotificationStore';

const Matches: React.FC = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useNotificationStore();

    const fetchMatches = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.getMatches();
            if (response.success) {
                setMatches(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch matches', err);
            const msg = 'Failed to load your matches. Please try again.';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Daily Recommendations"
                subtitle="Handpicked matches based on your preferences and behavior."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=80"
            />

            <Container maxWidth="xl" sx={{ mt: -6 }}>
                {loading ? (
                    <LoadingState type="skeleton-cards" count={8} />
                ) : error ? (
                    <ErrorState message={error} onRetry={fetchMatches} />
                ) : matches.length === 0 ? (
                    <EmptyState
                        type="search"
                        title="No Matches Found"
                        message="We couldn't find any new matches for you today. Try updating your partner preferences to see more results."
                        ctaButton={{
                            label: 'Update Preferences',
                            onClick: () => (window.location.href = '/profile/preferences'),
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
                        {matches.map((profile) => (
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

export default Matches;
