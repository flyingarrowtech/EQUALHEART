import React from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../components/common/PageHeader';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
};

const faqData = {
    general: [
        {
            question: 'What is EqualHeart?',
            answer: 'EqualHeart is India\'s most trusted matrimonial platform that uses AI technology to help you find your perfect life partner. We combine traditional matchmaking values with modern technology to create meaningful connections.'
        },
        {
            question: 'How does the matching algorithm work?',
            answer: 'Our AI-powered algorithm analyzes your profile, preferences, and behavior to suggest compatible matches. It considers factors like education, career, family values, interests, and lifestyle to find partners who align with your expectations.'
        },
        {
            question: 'Is EqualHeart free to use?',
            answer: 'Yes! Creating an account and browsing profiles is completely free. We also offer premium memberships with additional features like unlimited messaging, advanced search filters, and priority customer support.'
        },
        {
            question: 'How do I verify my profile?',
            answer: 'You can verify your profile by uploading a government-issued ID and a selfie. Our team reviews all verification requests within 24-48 hours. Verified profiles get a blue checkmark badge and are more trusted by other users.'
        }
    ],
    payments: [
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment gateway partners.'
        },
        {
            question: 'Can I get a refund?',
            answer: 'Yes, we offer refunds within 7 days of purchase if you haven\'t used any premium features. Please refer to our Refund Policy for detailed terms and conditions.'
        },
        {
            question: 'How do I upgrade to premium?',
            answer: 'Click on the "Upgrade" button in your dashboard or visit the Membership page. Choose a plan that suits your needs, complete the payment, and your premium features will be activated immediately.'
        },
        {
            question: 'Can I cancel my subscription?',
            answer: 'Yes, you can cancel your subscription anytime from your account settings. Your premium features will remain active until the end of your current billing period.'
        }
    ],
    privacy: [
        {
            question: 'Who can see my profile?',
            answer: 'By default, all registered users can see your profile. However, you can control visibility through privacy settings - hide your profile from specific users, make your photos private, or limit who can contact you.'
        },
        {
            question: 'How is my data protected?',
            answer: 'We use industry-standard encryption to protect your data. Your personal information is never shared with third parties without your consent. Read our Privacy Policy for complete details.'
        },
        {
            question: 'Can I hide my profile temporarily?',
            answer: 'Yes, you can hide your profile anytime from privacy settings. Your profile will be invisible to all users until you choose to unhide it. Your matches and conversations will be preserved.'
        },
        {
            question: 'How do I block someone?',
            answer: 'Visit the user\'s profile and click the "Block" button. Blocked users cannot view your profile, send you messages, or see your activity on the platform.'
        }
    ],
    technical: [
        {
            question: 'I can\'t log in to my account',
            answer: 'Try resetting your password using the "Forgot Password" link. If that doesn\'t work, clear your browser cache and cookies, or try a different browser. Contact support if the issue persists.'
        },
        {
            question: 'Photos are not uploading',
            answer: 'Ensure your photos are in JPG, PNG, or WEBP format and under 5MB in size. Check your internet connection and try again. If the problem continues, contact our technical support team.'
        },
        {
            question: 'The app is not working properly',
            answer: 'Try updating the app to the latest version. Clear the app cache from your device settings. If issues persist, uninstall and reinstall the app, or contact support.'
        },
        {
            question: 'Which browsers are supported?',
            answer: 'EqualHeart works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
        }
    ]
};

const FAQs: React.FC = () => {
    const [tabValue, setTabValue] = React.useState(0);

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Frequently Asked Questions"
                subtitle="Common questions about EqualHeart."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&q=80"
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        variant="fullWidth"
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            bgcolor: 'white',
                            '& .MuiTab-root': { py: 2, fontWeight: 'bold' },
                            '& .Mui-selected': { color: 'primary.main' }
                        }}
                    >
                        <Tab label="General" />
                        <Tab label="Payments" />
                        <Tab label="Privacy" />
                        <Tab label="Technical" />
                    </Tabs>

                    <Box sx={{ p: 2, bgcolor: 'white' }}>
                        {['general', 'payments', 'privacy', 'technical'].map((cat, idx) => (
                            <TabPanel value={tabValue} index={idx} key={cat}>
                                {(faqData as any)[cat].map((faq: any, index: number) => (
                                    <Accordion key={index} elevation={0} sx={{
                                        '&:before': { display: 'none' },
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        mb: 1.5,
                                        borderRadius: '8px !important',
                                        overflow: 'hidden'
                                    }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fafafa' }}>
                                            <Typography fontWeight="600">{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                                            <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>{faq.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </TabPanel>
                        ))}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default FAQs;
