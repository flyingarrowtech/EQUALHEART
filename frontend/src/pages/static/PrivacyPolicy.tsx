import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PrivacyPolicy: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Privacy Policy"
                subtitle="We are committed to protecting your privacy and personal data."
            />

            <Container maxWidth="md" sx={{ mt: -6, zIndex: 100 , position:'relative'}}>
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Privacy Policy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Updated: February 12, 2026
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ '& h5': { fontWeight: 'bold', mb: 2, mt: 4 }, '& p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                        <Typography variant="h5">1. Introduction</Typography>
                        <Typography variant="body1">
                            Welcome to EqualHeart. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and share your information when you use our services. By using our platform, you consent to the data practices described in this policy.
                        </Typography>

                        <Typography variant="h5">2. Information We Collect</Typography>
                        <Typography variant="body1">
                            We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This includes:
                        </Typography>
                        <List dense>
                            {['Personal details (Name, Date of Birth, Gender)', 'Contact information (Email, Phone Number)', 'Profile information (Photos, Education, Career, Interests)', 'Identity verification documents'].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">3. How We Use Your Information</Typography>
                        <Typography variant="body1">
                            We use your information to provide, maintain, and improve our services, including:
                        </Typography>
                        <List dense>
                            {['Facilitating matches and connections based on your preferences', 'Verifying your identity to ensure a safe and secure platform', 'Sending you notifications, updates, and promotional offers', 'Analyzing user behavior to improve our matchmaking algorithms'].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">4. Data Security</Typography>
                        <Typography variant="body1">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption protocols and secure storage solutions. However, no method of transmission over the Internet is 100% secure.
                        </Typography>

                        <Typography variant="h5">5. Your Rights</Typography>
                        <Typography variant="body1">
                            You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request a copy of your data in a structured, machine-readable format.
                        </Typography>

                        <Typography variant="h5">6. Contact Us</Typography>
                        <Typography variant="body1">
                            If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@equalheart.com.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
