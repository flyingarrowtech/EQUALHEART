import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
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
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

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

const PricingSection: React.FC = () => {
    const theme = useTheme();
    const [isYearly, setIsYearly] = useState(false);

    // Mock upgrade handler for now
    const handleUpgrade = (tierName: string) => {
        console.log(`Selected plan: ${tierName} (${isYearly ? 'Yearly' : 'Quarterly'})`);
        // Navigation or modal logic usually goes here
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f5f3f0' }}>
            <Container maxWidth="lg">
                <SectionTitle
                    title="Choose Your Plan"
                    subtitle="Find the perfect plan for your journey to find love"
                    gradient
                />

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
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
            </Container>
        </Box>
    );
};

export default PricingSection;
