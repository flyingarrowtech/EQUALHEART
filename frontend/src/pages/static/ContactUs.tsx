import React from 'react';
import { Container, Typography, Box, Paper, TextField, Button, alpha, useTheme } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';

const ContactUs: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Get in Touch"
                subtitle="Have questions or feedback? We'd love to hear from you."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f142fcb93315?w=1920&q=80"
            />

            
            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 4 }}>
                    {/* Contact Info Column */}
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {[
                                { icon: <Email />, title: 'Email Us', info: 'support@equalheart.com', sub: 'We reply within 24 hours', color: 'primary' },
                                { icon: <Phone />, title: 'Call Us', info: '+1 (555) 123-4567', sub: 'Mon-Fri, 9am - 6pm EST', color: 'secondary' },
                                { icon: <LocationOn />, title: 'Visit Us', info: '123 Matchmaking Lane', sub: 'Silicon Valley, CA 94025', color: 'success' }
                            ].map((item, index) => (
                                <Paper key={index} elevation={0} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                    <Box sx={{
                                        bgcolor: alpha((theme.palette as any)[item.color].main, 0.1),
                                        p: 2,
                                        borderRadius: '50%',
                                        color: `${item.color}.main`,
                                        display: 'flex'
                                    }}>
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                                        <Typography variant="body1" color="text.primary">{item.info}</Typography>
                                        <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </Box>

                        <Paper elevation={0} sx={{ mt: 4, p: 4, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px dashed', borderColor: 'primary.main' }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                                Frequently Asked Questions
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Find quick answers to common questions about account creation, privacy, and matching.
                            </Typography>
                            <Button variant="outlined" color="primary" href="/faqs">
                                Visit Help Center
                            </Button>
                        </Paper>
                    </Box>

                    {/* Contact Form Column */}
                    <Box>
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, boxShadow: '0 4px 25px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Send us a Message
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                Fill out the form below and our team will get back to you as soon as possible.
                            </Typography>

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                                <Box>
                                    <TextField fullWidth label="First Name" variant="outlined" />
                                </Box>
                                <Box>
                                    <TextField fullWidth label="Last Name" variant="outlined" />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <TextField fullWidth label="Email Address" variant="outlined" type="email" />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <TextField fullWidth label="Subject" variant="outlined" />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <TextField fullWidth label="Message" multiline rows={6} variant="outlined" placeholder="How can we help you?" />
                                </Box>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <Button variant="contained" size="large" fullWidth sx={{ py: 1.5, borderRadius: 2, fontSize: '1.1rem' }} endIcon={<Send />}>
                                        Send Message
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ContactUs;
