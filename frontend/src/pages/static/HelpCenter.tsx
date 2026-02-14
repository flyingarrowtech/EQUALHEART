import React from 'react';
import { Container, Typography, Box, Paper, TextField, InputAdornment, Button, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import EmailIcon from '@mui/icons-material/Email';
import PageHeader from '../../components/common/PageHeader';

interface HelpCategory {
    icon: React.ReactNode;
    title: string;
    description: string;
    topics: string[];
    color: 'primary' | 'secondary' | 'error' | 'warning';
}

const categories: HelpCategory[] = [
    {
        icon: <AccountCircleIcon sx={{ fontSize: 40 }} />,
        title: 'Account & Profile',
        description: 'Manage your settings, photos, and verification.',
        topics: ['Creating an account', 'Updating profile', 'Verification process', 'Account deletion'],
        color: 'primary'
    },
    {
        icon: <PaymentIcon sx={{ fontSize: 40 }} />,
        title: 'Membership & Billing',
        description: 'Plans, payments, and subscription management.',
        topics: ['Upgrade to premium', 'Payment methods', 'Refund policy', 'Cancel subscription'],
        color: 'secondary'
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 40 }} />,
        title: 'Privacy & Safety',
        description: 'Learn how we protect your data and safety.',
        topics: ['Privacy settings', 'Blocking users', 'Reporting abuse', 'Data protection'],
        color: 'error'
    },
    {
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        title: 'Troubleshooting',
        description: 'Solutions for common technical issues.',
        topics: ['Login problems', 'App not working', 'Photo upload issues', 'Browser compatibility'],
        color: 'warning'
    }
];

const HelpCenter: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Help Center"
                subtitle="Find answers, support, and guidance."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
                {/* Search Section */}
                <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 4, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        How can we help you today?
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Search for answers (e.g. 'reset password', 'refund')"
                        variant="outlined"
                        sx={{ maxWidth: 600, mx: 'auto', mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Paper>

                {/* Categories Grid */}
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Browse by Category
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                        gap: 3,
                        mb: 8,
                    }}
                >
                    {categories.map((category, index) => (
                        <Paper
                            key={index}
                            component={motion.div}
                            whileHover={{ y: -5 }}
                            elevation={0}
                            sx={{
                                p: 3,
                                height: '100%',
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: `${category.color}.main`,
                                    boxShadow: `0 8px 24px ${alpha(theme.palette[category.color].main, 0.15)}`
                                }
                            }}
                        >
                            <Box sx={{
                                color: `${category.color}.main`,
                                bgcolor: alpha(theme.palette[category.color].main, 0.1),
                                width: 60, height: 60, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2
                            }}>
                                {category.icon}
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {category.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {category.description}
                            </Typography>
                            <Box>
                                {category.topics.slice(0, 3).map((topic, i) => (
                                    <Typography key={i} variant="caption" display="block" color="text.secondary" sx={{ py: 0.5, '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}>
                                        • {topic}
                                    </Typography>
                                ))}
                            </Box>
                        </Paper>
                    ))}
                </Box>

                {/* Footer CTA */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <EmailIcon sx={{ fontSize: 50, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Can't find what you're looking for?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 600 }}>
                        Our dedicated support team is available 24/7 to assist you with any questions or issues.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/contact')}
                        sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            px: 5,
                            borderRadius: 3,
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)'
                            }
                        }}
                    >
                        Contact Support
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default HelpCenter;
