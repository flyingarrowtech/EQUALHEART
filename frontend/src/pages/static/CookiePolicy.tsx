import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import CookieIcon from '@mui/icons-material/Cookie';
import CircleIcon from '@mui/icons-material/Circle';

const CookiePolicy: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Cookie Policy"
                subtitle="Understanding how we use cookies to improve your experience."
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <CookieIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Cookie Policy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Updated: February 12, 2026
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ '& h5': { fontWeight: 'bold', mb: 2, mt: 4 }, '& p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                        <Typography variant="h5">1. What Are Cookies?</Typography>
                        <Typography variant="body1">
                            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They help us provide you with a better, faster, and safer experience by remembering your preferences and understanding how you use our service.
                        </Typography>

                        <Typography variant="h5">2. How We Use Cookies</Typography>
                        <Typography variant="body1">
                            We use cookies for the following purposes:
                        </Typography>
                        <List dense>
                            {['Authentication: To keep you signed in to your account.', 'Preferences: To remember your settings, such as language and region.', 'Analytics: To understand how you use our platform and identify areas for improvement.', 'Advertising: To provide relevant content and measuring ad performance.'].map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 24 }}>
                                        <CircleIcon sx={{ fontSize: 6, color: 'text.secondary' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="h5">3. Types of Cookies We Use</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: 'text.primary' }}>Essential Cookies</Typography>
                        <Typography variant="body1">
                            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: 'text.primary' }}>Performance Cookies</Typography>
                        <Typography variant="body1">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: 'text.primary' }}>Functionality Cookies</Typography>
                        <Typography variant="body1">
                            These cookies enable the website to provide enhanced functionality and personalization, such as remembering your specific choices.
                        </Typography>

                        <Typography variant="h5">4. Managing Cookies</Typography>
                        <Typography variant="body1">
                            You can control and manage cookies in various ways. Most browsers allow you to refuse or accept cookies through their settings. You can also delete cookies that have already been set. Please note that blocking all cookies may impact your experience on our website.
                        </Typography>

                        <Typography variant="h5">5. Contact Us</Typography>
                        <Typography variant="body1">
                            If you have any questions about our use of cookies, please contact us at privacy@equalheart.com.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CookiePolicy;
