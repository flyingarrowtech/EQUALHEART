import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const RefundPolicy: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Refund Policy"
                subtitle="Transparent and fair refund terms for our premium services."
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <MoneyOffIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Refund Policy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Updated: February 12, 2026
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ '& h5': { fontWeight: 'bold', mb: 2, mt: 4 }, '& p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                        <Typography variant="h5">1. Overview</Typography>
                        <Typography variant="body1">
                            At EqualHeart, we strive to provide the best service possible. This policy outlines the terms under which refunds may be granted for our premium subscriptions. We believe in being fair to both our customers and our business.
                        </Typography>

                        <Typography variant="h5">2. Refund Eligibility</Typography>
                        <Typography variant="body1">
                            You may be eligible for a refund if you meet specific criteria. We review all requests on a case-by-case basis.
                        </Typography>
                        <List dense>
                            {[
                                'You request a refund within 7 days of the initial purchase.',
                                'You have not utilized premium features (e.g., sending messages, viewing contact info) significantly.',
                                'Technical issues prevented you from using the service, and we could not resolve them.',
                                'You were charged incorrectly or multiple times due to a billing error.'
                            ].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleOutlineIcon color="success" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">3. Non-Refundable Situations</Typography>
                        <List dense>
                            {[
                                'Requests made after 7 days from the date of purchase.',
                                'If you have successfully found a match or simply changed your mind after using the service.',
                                'If your account was terminated for violating our Terms & Conditions.',
                                'Recurring subscription renewals where you failed to cancel before the billing date.'
                            ].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <HighlightOffIcon color="error" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">4. How to Request a Refund</Typography>
                        <Typography variant="body1">
                            To request a refund, please contact our support team at refunds@equalheart.com within the eligible period. Please include your:
                        </Typography>
                        <List dense sx={{ pl: 2 }}>
                            <ListItem><ListItemText primary="• Full Name and Registered Email ID" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} /></ListItem>
                            <ListItem><ListItemText primary="• Transaction ID / Receipt" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} /></ListItem>
                            <ListItem><ListItemText primary="• Reason for the refund request" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} /></ListItem>
                        </List>

                        <Typography variant="h5">5. Processing Time</Typography>
                        <Typography variant="body1">
                            Once approved, refunds are processed within 5-7 business days. The time it takes for the amount to reflect in your account depends on your bank or payment provider.
                        </Typography>

                        <Typography variant="h5">6. Subscription Cancellation</Typography>
                        <Typography variant="body1">
                            You can cancel your subscription at any time to avoid future charges. Your premium benefits will continue until the end of the current billing cycle.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default RefundPolicy;
