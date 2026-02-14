import React from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { WorkspacePremium, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface PlanCardProps {
    plan: {
        name: string;
        type: 'free' | 'premium' | 'premium_plus';
        expiryDate?: string;
        daysLeft?: number;
    };
    onUpgrade?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onUpgrade }) => {
    const isPremium = plan.type !== 'free';

    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: '100%',
                background: isPremium
                    ? 'linear-gradient(135deg, #fff5e6 0%, #ffe0b2 100%)'
                    : 'white',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <WorkspacePremium
                        sx={{
                            fontSize: 32,
                            color: isPremium ? '#ff9800' : '#9e9e9e',
                        }}
                    />
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Plan details
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'white',
                        mb: 3,
                        border: '2px solid',
                        borderColor: isPremium ? '#ff9800' : '#e0e0e0',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: isPremium ? '#ff9800' : '#9e9e9e',
                            mb: 1,
                            textTransform: 'capitalize',
                        }}
                    >
                        {plan.name.replace('_', ' ')}
                    </Typography>

                    {isPremium && plan.expiryDate && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                                <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    Valid till: {plan.expiryDate}
                                </Typography>
                            </Box>

                            {plan.daysLeft !== undefined && (
                                <Chip
                                    label={`${plan.daysLeft} days left`}
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        bgcolor: plan.daysLeft < 7 ? '#ff5252' : '#4caf50',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                        </>
                    )}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={onUpgrade}
                    sx={{
                        py: 1.5,
                        fontWeight: 700,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                            boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                        },
                    }}
                >
                    {isPremium ? 'Extend Plan' : 'Upgrade Now'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default PlanCard;
