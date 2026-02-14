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
import { useNotificationStore } from '../../store/useNotificationStore';

const Interests: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tabValue, setTabValue] = useState(0);
    const [receivedInterests, setReceivedInterests] = useState<any[]>([]);
    const [sentInterests, setSentInterests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { showToast, showConfirm } = useNotificationStore();

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
            const msg = 'Failed to load interests. Please try again.';
            setError(msg);
            showToast(msg, 'error');
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
            showToast('Interest request accepted!', 'success');
            setReceivedInterests(prev => prev.filter(i => i._id !== interestId));
        } catch (err) {
            console.error(err);
            showToast('Failed to accept interest', 'error');
        }
    };

    const handleReject = (interestId: string | number) => {
        showConfirm({
            title: 'Reject Interest?',
            message: 'Are you sure you want to reject this interest request? This action cannot be undone.',
            confirmText: 'Reject',
            cancelText: 'Keep',
            onConfirm: async () => {
                try {
                    await userApi.rejectInterest(String(interestId));
                    showToast('Interest request rejected', 'info');
                    setReceivedInterests(prev => prev.filter(i => i._id !== interestId));
                } catch (err) {
                    console.error(err);
                    showToast('Failed to reject interest', 'error');
                }
            },
            onCancel: () => { }
        });
    };

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Interests & Requests"
                subtitle="Manage your incoming interest requests and track the ones you've sent."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 1 }}>
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
