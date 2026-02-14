import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

const faqs = [
    {
        question: 'How does EqualHeart matching algorithm work?',
        answer: 'Our AI-powered algorithm analyzes your preferences, personality traits, lifestyle choices, and values to find the most compatible matches. It continuously learns from your interactions to improve match quality over time.',
    },
    {
        question: 'Are all profiles verified?',
        answer: 'Yes, we have a strict verification process. All profiles go through document verification, phone verification, and photo verification to ensure authenticity and safety of our members.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted.',
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your current billing period.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'Our support team is available 24/7 via live chat, email (support@equalheart.com), or phone. Premium members get priority support with dedicated relationship managers.',
    },
    {
        question: 'Is my personal information safe?',
        answer: 'Absolutely. We use industry-leading encryption and security measures to protect your data. Your information is never shared with third parties without your consent.',
    },
    {
        question: 'How long does it take to find a match?',
        answer: 'While it varies for everyone, most of our members find compatible matches within the first month. Our success rate shows that 98% of active users find their perfect match within 6 months.',
    },
    {
        question: 'Can I hide my profile from certain people?',
        answer: 'Yes, you have complete control over your privacy. You can hide your profile from specific users, control who can view your photos, and manage your visibility settings.',
    },
];

const FAQSection: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="md">
                <SectionTitle
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions about our service"
                    gradient
                />

                <Box>
                    {faqs.map((faq, index) => (
                        <Box
                            key={index}
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '2px solid transparent',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    '&:before': { display: 'none' },
                                    '&.Mui-expanded': {
                                        borderColor: '#e91e63',
                                        boxShadow: '0 8px 24px rgba(233, 30, 99, 0.2)',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        '& .MuiAccordionSummary-content': {
                                            my: 1,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            color: expanded === `panel${index}` ? '#e91e63' : 'text.primary',
                                        }}
                                    >
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.8 }}
                                    >
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;
