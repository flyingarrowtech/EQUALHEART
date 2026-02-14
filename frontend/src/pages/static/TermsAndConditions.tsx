import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import GavelIcon from '@mui/icons-material/Gavel';
import CircleIcon from '@mui/icons-material/Circle';

const TermsAndConditions: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Terms and Conditions"
                subtitle="Please read these terms carefully before using our service."
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <GavelIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Terms of Use
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Updated: February 12, 2026
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ '& h5': { fontWeight: 'bold', mb: 2, mt: 4 }, '& p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                        <Typography variant="h5">1. Acceptance of Terms</Typography>
                        <Typography variant="body1">
                            By accessing or using EqualHeart, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                        </Typography>

                        <Typography variant="h5">2. Eligibility</Typography>
                        <Typography variant="body1">
                            You must be at least 18 years old to use our services. By using EqualHeart, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions. You must not be currently married or legally prohibited from marrying.
                        </Typography>

                        <Typography variant="h5">3. User Conduct</Typography>
                        <Typography variant="body1">
                            You agree to use the service in a manner consistent with any and all applicable laws and regulations. You will not:
                        </Typography>
                        <List dense>
                            {['Post any content that is offensive, defamatory, abusive, or obscene.', 'Harass, annoy, intimidate, or threaten any other user.', 'Impersonate any person or entity.', 'Use the service for any illegal or unauthorized purpose.'].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 24 }}>
                                        <CircleIcon sx={{ fontSize: 6, color: 'text.secondary' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">4. Subscription and Payments</Typography>
                        <Typography variant="body1">
                            Some features of the service may require a paid subscription. All payments are non-refundable, except as expressly provided in our Refund Policy. We reserve the right to change our subscription plans and pricing at any time.
                        </Typography>

                        <Typography variant="h5">5. Termination</Typography>
                        <Typography variant="body1">
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </Typography>

                        <Typography variant="h5">6. Liability Disclaimer</Typography>
                        <Typography variant="body1">
                            EqualHeart provides the service on an "as is" and "as available" basis. We do not guarantee the accuracy of user profiles or the success of any match. You are responsible for your interactions with other users.
                        </Typography>

                        <Typography variant="h5">7. Governing Law</Typography>
                        <Typography variant="body1">
                            These Terms shall be governed by and defined following the laws of India. EqualHeart and yourself irrevocably consent that the courts of Bangalore, India shall have exclusive jurisdiction to resolve any dispute.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default TermsAndConditions;
