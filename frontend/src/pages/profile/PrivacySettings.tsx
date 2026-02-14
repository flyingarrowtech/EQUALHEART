import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, Switch,
    Divider, Button, List,
    ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, Alert, CircularProgress, alpha
} from '@mui/material';
import { Delete as DeleteIcon, Security as SecurityIcon, VerifiedUser, Lock, Visibility } from '@mui/icons-material';
import userApi from '../../api/userApi';
import PageHeader from '../../components/common/PageHeader';

const PrivacySettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<any>({
        profileVisibility: 'Public',
        phoneVisibility: 'Request',
    });
    const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userApi.getProfile();
                const user = response.data;
                setSettings(user.privacySettings);
                setBlockedUsers(user.blockedUsers || []);
            } catch (err) {
                console.error('Failed to load settings', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggle = async (field: string, value: any) => {
        setSaving(true);
        try {
            const newSettings = { ...settings, [field]: value };
            await userApi.updateProfile({ privacySettings: newSettings });
            setSettings(newSettings);
            setMessage({ type: 'success', text: 'Privacy settings updated' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update settings' });
        } finally {
            setSaving(false);
        }
    };

    const handleUnblock = async (userId: string) => {
        try {
            await userApi.unblockUser(userId);
            setBlockedUsers(prev => prev.filter(u => u._id !== userId));
            setMessage({ type: 'success', text: 'User unblocked' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to unblock' });
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f3f0' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Privacy & Security"
                subtitle="Manage your visibility and security settings."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1614064641938-3e858a915f32?w=1920&q=80"
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Box sx={{
                            p: 1.5,
                            borderRadius: '50%',
                            bgcolor: alpha('#2196f3', 0.1),
                            color: 'primary.main',
                            mr: 2,
                            display: 'flex'
                        }}>
                            <SecurityIcon fontSize="large" />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>Security Controls</Typography>
                            <Typography variant="body2" color="text.secondary">Customize how others see your profile and contact you.</Typography>
                        </Box>
                    </Box>

                    {message && <Alert severity={message.type} sx={{ mb: 3, borderRadius: 2 }} onClose={() => setMessage(null)}>{message.text}</Alert>}

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Visibility fontSize="small" color="action" /> Profile Visibility
                        </Typography>
                        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <List disablePadding>
                                <ListItem sx={{ p: 2 }}>
                                    <ListItemText
                                        primary={<Typography fontWeight={600}>Show profile to all members</Typography>}
                                        secondary="Only registered and logged-in members can see your details."
                                    />
                                    <Switch
                                        checked={settings.profileVisibility === 'Members'}
                                        onChange={(e) => handleToggle('profileVisibility', e.target.checked ? 'Members' : 'Public')}
                                        disabled={saving}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ p: 2 }}>
                                    <ListItemText
                                        primary={<Typography fontWeight={600}>Private Profile (Only Me)</Typography>}
                                        secondary="Hide your profile from search results and recommendations."
                                    />
                                    <Switch
                                        checked={settings.profileVisibility === 'OnlyMe'}
                                        onChange={(e) => handleToggle('profileVisibility', e.target.checked ? 'OnlyMe' : 'Members')}
                                        disabled={saving}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Lock fontSize="small" color="action" /> Communication Privacy
                        </Typography>
                        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <List disablePadding>
                                <ListItem sx={{ p: 2 }}>
                                    <ListItemText
                                        primary={<Typography fontWeight={600}>Hide Phone Number</Typography>}
                                        secondary="Require users to request permission before seeing your number."
                                    />
                                    <Switch
                                        checked={settings.phoneVisibility === 'Request'}
                                        onChange={(e) => handleToggle('phoneVisibility', e.target.checked ? 'Request' : 'Public')}
                                        disabled={saving}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Box>

                    <Box>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VerifiedUser fontSize="small" color="action" /> Blocked Users
                        </Typography>
                        {blockedUsers.length === 0 ? (
                            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 2, bgcolor: '#fafafa' }}>
                                <Typography variant="body2" color="text.secondary">You haven't blocked any users yet.</Typography>
                            </Paper>
                        ) : (
                            <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                                <List disablePadding>
                                    {blockedUsers.map((user, index) => (
                                        <React.Fragment key={user._id}>
                                            <ListItem sx={{ p: 2 }}>
                                                <ListItemText primary={user.fullName?.firstName || 'User'} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" onClick={() => handleUnblock(user._id)} color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {index < blockedUsers.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Box>

                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={() => window.history.back()} size="large" sx={{ borderRadius: 3 }}>
                            Back to Profile
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default PrivacySettings;
