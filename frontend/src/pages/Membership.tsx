import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Chip,
    alpha,
    useTheme,
    type SvgIconProps
} from '@mui/material';
import {
    CheckCircleOutline as CheckIcon,
    CancelOutlined as XIcon,
    Star as StarIcon,
    WorkspacePremium as PremiumIcon,
    Diamond as DiamondIcon,
    VerifiedUser,
    Security,
    Visibility,
    Favorite,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import userApi from '../api/userApi';
import PageHeader from '../components/common/PageHeader';

const tiers = [
    {
        name: 'Basic',
        price: 'Free',
        color: '#757575',
        icon: <StarIcon />,
        features: [
            { text: 'Detailed Profile Creation', included: true },
            { text: 'Browse & View Profiles', included: true },
            { text: 'Basic Search Filters', included: true },
            { text: 'Express Interest (5/day)', included: true },
            { text: 'Shortlisting Matches', included: true },
            { text: 'Unlimited Messaging', included: false },
            { text: 'View Contact Details', included: false },
            { text: 'Video & Voice Calls', included: false },
            { text: 'Profile Boost', included: false },
        ],
    },
    {
        name: 'Silver',
        price: '₹999',
        color: '#9e9e9e',
        icon: <PremiumIcon />,
        popular: true,
        features: [
            { text: 'Detailed Profile Creation', included: true },
            { text: 'Browse & View Profiles', included: true },
            { text: 'Advanced Search Filters', included: true },
            { text: 'Unlimited Interests', included: true },
            { text: 'Unlimited Messaging', included: true },
            { text: 'View 20 Contacts/Month', included: true },
            { text: 'Video & Voice Calls', included: true },
            { text: 'Profile Boost (1/Month)', included: true },
            { text: 'Personal Manager', included: false },
        ],
    },
    {
        name: 'Gold',
        price: '₹2499',
        color: '#ffc107',
        icon: <PremiumIcon />,
        features: [
            { text: 'Everything in Silver', included: true },
            { text: 'Unlimited Messaging', included: true },
            { text: 'View 50 Contacts/Month', included: true },
            { text: 'Profile Boost (3/Month)', included: true },
            { text: 'Personal Manager (Partial)', included: true },
            { text: 'AI-Based Matchmaking', included: true },
            { text: 'View Who Liked You', included: true },
            { text: 'Priority Support', included: true },
        ],
    },
    {
        name: 'Platinum',
        price: '₹4999',
        color: '#00bcd4',
        popular: false,
        icon: <DiamondIcon />,
        features: [
            { text: 'Everything in Gold', included: true },
            { text: 'Unlimited Contact Views', included: true },
            { text: 'Personal Relation Manager', included: true },
            { text: 'Verified Profile Tag', included: true },
            { text: 'Ad-Free Experience', included: true },
            { text: 'Horoscope Matching', included: true },
            { text: 'Highest Search Ranking', included: true },
        ],
    },
];

const Membership: React.FC = () => {
    const theme = useTheme();
    const [isYearly, setIsYearly] = useState(false);

    const handleUpgrade = async (tierName: string) => {
        try {
            // In a real app, this would redirect to a payment gateway
            await userApi.upgradeMembership(
                tierName as 'Silver' | 'Gold' | 'Platinum',
                'test_payment',
                `txn_${Date.now()}`
            );
            alert(`Great choice! You are upgrading to ${tierName}. Redirecting to payment...`);
        } catch (error) {
            console.error('Upgrade failed', error);
            alert('Upgrade failed. Please try again.');
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Choose Your Path to Love"
                subtitle="Upgrade your membership to connect faster and discover your perfect match with premium tools."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -8 }}>
                {/* Toggle Switch */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 5,
                        bgcolor: 'white',
                        width: 'fit-content',
                        mx: 'auto',
                        p: 1.5,
                        px: 3,
                        borderRadius: 50,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography fontWeight={isYearly ? 500 : 700} color={isYearly ? 'text.secondary' : 'text.primary'}>
                        Quarterly
                    </Typography>
                    <Switch checked={isYearly} onChange={() => setIsYearly(!isYearly)} color="primary" />
                    <Typography fontWeight={isYearly ? 700 : 500} color={isYearly ? 'text.primary' : 'text.secondary'}>
                        Annual
                    </Typography>
                    <Chip
                        label="Save 20%"
                        size="small"
                        sx={{
                            bgcolor: '#4caf50',
                            color: 'white',
                            fontWeight: 700,
                            height: 24,
                        }}
                    />
                </Box>

                {/* Pricing Cards */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3,
                    alignItems: 'stretch'
                }}>
                    {tiers.map((tier, index) => (
                        <Box key={tier.name} sx={{ display: 'flex' }}>
                            <Paper
                                component={motion.div}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                elevation={tier.popular ? 8 : 1}
                                sx={{
                                    position: 'relative',
                                    p: 3,
                                    width: '100%',
                                    borderRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: tier.popular ? '2px solid transparent' : '1px solid',
                                    borderColor: tier.popular ? 'transparent' : 'divider',
                                    background: tier.popular
                                        ? `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) border-box`
                                        : 'white',
                                    transform: tier.popular ? 'scale(1.02)' : 'scale(1)',
                                    zIndex: tier.popular ? 2 : 1,
                                }}
                            >
                                {tier.popular && (
                                    <Chip
                                        label="MOST POPULAR"
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            top: -16,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontWeight: 700,
                                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.4)',
                                        }}
                                    />
                                )}

                                <Box sx={{ textAlign: 'center', mb: 3, mt: 1 }}>
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            bgcolor: alpha(tier.color, 0.1),
                                            color: tier.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        {React.cloneElement(tier.icon as React.ReactElement<SvgIconProps>, { fontSize: 'large' })}
                                    </Box>
                                    <Typography variant="h5" fontWeight={800} gutterBottom>
                                        {tier.name}
                                    </Typography>
                                    <Typography variant="h3" fontWeight={900} color="text.primary">
                                        {tier.price}
                                        {tier.price !== 'Free' && (
                                            <Typography component="span" variant="body2" color="text.secondary" fontWeight={500}>
                                                /{isYearly ? 'yr' : '3mo'}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>

                                <List sx={{ flex: 1, mb: 3 }}>
                                    {tier.features.map((feature, idx) => (
                                        <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                                            <ListItemIcon sx={{ minWidth: 28 }}>
                                                {feature.included ? (
                                                    <CheckIcon color="success" fontSize="small" />
                                                ) : (
                                                    <XIcon color="disabled" fontSize="small" />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={feature.text}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    color: feature.included ? 'text.primary' : 'text.disabled',
                                                    fontWeight: feature.included ? 500 : 400,
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <Button
                                    fullWidth
                                    variant={tier.popular ? 'contained' : 'outlined'}
                                    size="large"
                                    onClick={() => handleUpgrade(tier.name)}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.5,
                                        fontWeight: 700,
                                        mt: 'auto',
                                        boxShadow: tier.popular ? '0 8px 16px rgba(233, 30, 99, 0.3)' : 'none',
                                        borderWidth: 2,
                                        '&:hover': {
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    {tier.name === 'Basic' ? 'Current Plan' : 'Select Plan'}
                                </Button>
                            </Paper>
                        </Box>
                    ))}
                </Box>

                {/* Benefits Section */}
                <Box sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Why Go Premium?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                        Unlock exclusive features that help you find your perfect match faster and easier.
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 4
                    }}>
                        {[
                            { icon: <Favorite />, title: 'Unlimited Connections', desc: 'Send unlimited interest requests and chat without restrictions.' },
                            { icon: <Visibility />, title: 'Priority Visibility', desc: 'Get featured at the top of search results and be seen by more people.' },
                            { icon: <Security />, title: 'Enhanced Privacy', desc: 'Control who can see your photos and contact details.' },
                            { icon: <VerifiedUser />, title: 'Verified Trust', desc: 'Get a verified badge to build trust and get more responses.' },
                        ].map((item, index) => (
                            <Box key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        bgcolor: 'white',
                                        borderRadius: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '50%',
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            color: 'primary.main',
                                            mb: 2,
                                        }}
                                    >
                                        {React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, { fontSize: 'large' })}
                                    </Box>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.desc}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Membership;
