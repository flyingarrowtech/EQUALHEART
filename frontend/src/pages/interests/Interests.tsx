import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Tabs,
    Tab,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Favorite, Send } from '@mui/icons-material';

import PageHeader from '../../components/common/PageHeader';
import InterestRequestCard from '../../components/dashboard/InterestRequestCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import userApi from '../../api/userApi';

const Interests: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [receivedInterests, setReceivedInterests] = useState<any[]>([]);
    const [sentInterests, setSentInterests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchInterests = async () => {
        setLoading(true);
        try {
            const [receivedRes, sentRes] = await Promise.all([
                userApi.getInterests('received'),
                userApi.getInterests('sent'),
            ]);

            if (receivedRes.success) setReceivedInterests(receivedRes.data);
            if (sentRes.success) setSentInterests(sentRes.data);
        } catch (err: any) {
            console.error('Failed to fetch interests', err);
            setError('Failed to load interests. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterests();
    }, []);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleAccept = async (interestId: string | number) => {
        try {
            await userApi.acceptInterest(String(interestId));
            // Refresh list or remove item locally
            setReceivedInterests(prev => prev.filter(i => i._id !== interestId));
        } catch (err) {
            console.error(err);
            alert('Failed to accept interest');
        }
    };

    const handleReject = async (interestId: string | number) => {
        try {
            await userApi.rejectInterest(String(interestId));
            setReceivedInterests(prev => prev.filter(i => i._id !== interestId));
        } catch (err) {
            console.error(err);
            alert('Failed to reject interest');
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Interests & Requests"
                subtitle="Manage your incoming interest requests and track the ones you've sent."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6 }}>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        minHeight: 500
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant={isMobile ? 'fullWidth' : 'standard'}
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                '& .MuiTab-root': {
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    pb: 2,
                                },
                            }}
                        >
                            <Tab
                                icon={<Favorite />}
                                iconPosition="start"
                                label={`Received Requests (${receivedInterests.length})`}
                            />
                            <Tab
                                icon={<Send />}
                                iconPosition="start"
                                label={`Sent Requests (${sentInterests.length})`}
                            />
                        </Tabs>
                    </Box>

                    <Box sx={{ p: { xs: 2, md: 4 } }}>
                        {loading ? (
                            <LoadingState type="skeleton-list" count={5} />
                        ) : error ? (
                            <ErrorState message={error} onRetry={fetchInterests} />
                        ) : (
                            <AnimatePresence mode="wait">
                                {tabValue === 0 && (
                                    <motion.div
                                        key="received"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {receivedInterests.length === 0 ? (
                                            <EmptyState
                                                type="favorites" // Using favorites icon as proxy
                                                title="No Requests Yet"
                                                message="You haven't received any interest requests yet. Complete your profile to improve visibility!"
                                                ctaButton={{ label: 'Update Profile', onClick: () => window.location.href = '/profile' }}
                                            />
                                        ) : (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                {receivedInterests.map((interest) => (
                                                    <Box key={interest._id}>
                                                        <InterestRequestCard
                                                            request={interest}
                                                            type="received"
                                                            onAccept={handleAccept}
                                                            onReject={handleReject}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </motion.div>
                                )}

                                {tabValue === 1 && (
                                    <motion.div
                                        key="sent"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {sentInterests.length === 0 ? (
                                            <EmptyState
                                                type="general"
                                                title="No Sent Requests"
                                                message="You haven't expressed interest in anyone yet. Start searching for your perfect match!"
                                                ctaButton={{ label: 'Start Searching', onClick: () => window.location.href = '/search' }}
                                            />
                                        ) : (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                {sentInterests.map((interest) => (
                                                    <Box key={interest._id}>
                                                        <InterestRequestCard
                                                            request={interest}
                                                            type="sent"
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Interests;
