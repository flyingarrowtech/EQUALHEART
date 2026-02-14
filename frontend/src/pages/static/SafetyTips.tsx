import React from 'react';
import { Container, Typography, Box, Paper, Button, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PublicIcon from '@mui/icons-material/Public';
import ReportIcon from '@mui/icons-material/Report';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PageHeader from '../../components/common/PageHeader';

const safetyTips = [
    {
        icon: <VisibilityOffIcon fontSize="large" />,
        title: 'Protect Your Personal Information',
        description: 'Never share sensitive information like your home address, financial details, or workplace location until you\'ve built trust. Keep conversations on the platform initially.',
        color: 'primary'
    },
    {
        icon: <PublicIcon fontSize="large" />,
        title: 'Meet in Public Places',
        description: 'Always meet for the first time in a public, well-lit place. Tell a friend or family member where you\'re going and when you expect to return.',
        color: 'secondary'
    },
    {
        icon: <ReportIcon fontSize="large" />,
        title: 'Report Suspicious Behavior',
        description: 'If someone asks for money, behaves inappropriately, or makes you uncomfortable, report them immediately. We take all reports seriously and investigate promptly.',
        color: 'error'
    },
    {
        icon: <VerifiedUserIcon fontSize="large" />,
        title: 'Verify Profiles',
        description: 'Look for verified badges on profiles. Take time to video chat before meeting in person to ensure the person matches their photos and profile information.',
        color: 'success'
    },
    {
        icon: <PsychologyIcon fontSize="large" />,
        title: 'Trust Your Instincts',
        description: 'If something feels off, it probably is. Don\'t ignore red flags. Take your time getting to know someone and never feel pressured to meet or share information.',
        color: 'warning'
    },
    {
        icon: <ShieldIcon fontSize="large" />,
        title: 'Use Platform Features',
        description: 'Utilize our privacy settings to control who can see your profile and photos. Block or report users who violate our community guidelines.',
        color: 'info'
    }
];

const SafetyTips: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Safety Tips"
                subtitle="Your safety is our top priority. Read these tips to stay safe."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1510511459019-5dda7724fd82?w=1920&q=80"
            />

            
            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                        mb: 8,
                    }}
                >
                    {safetyTips.map((tip, index) => (
                        <Paper
                            key={index}
                            component={motion.div}
                            whileHover={{ y: -8 }}
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                borderRadius: 4,
                                bgcolor: 'white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Box sx={{
                                color: `${tip.color}.main`,
                                bgcolor: alpha((theme.palette as any)[tip.color].main, 0.1),
                                width: 70, height: 70, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3
                            }}>
                                {tip.icon}
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {tip.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                {tip.description}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                {/* Additional Info */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 4,
                    }}
                >
                    <Paper elevation={0} sx={{ p: 5, borderRadius: 4, height: '100%', bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color="error.main">
                            <ReportIcon sx={{ verticalAlign: 'middle', mr: 1, mb: 0.5 }} />
                            Red Flags to Watch For
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, '& li': { mb: 2, color: 'text.secondary' } }}>
                            <li><strong>Requests for money:</strong> Never send money to someone you haven't met.</li>
                            <li><strong>Too good to be true:</strong> Be wary of overly perfect profiles or instant confessions of love.</li>
                            <li><strong>Avoiding video calls:</strong> If they act suspicious about video chatting, be careful.</li>
                            <li><strong>Pressure tactics:</strong> Don't let anyone rush you into meeting or sharing details.</li>
                        </Box>
                    </Paper>

                    <Paper elevation={0} sx={{
                        p: 5,
                        borderRadius: 4,
                        height: '100%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <ShieldIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            We're Here to Help
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                            If you encounter any suspicious activity, please report it immediately.
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={() => navigate('/contact')}
                            sx={{ bgcolor: 'white', color: 'error.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                        >
                            Report an Issue
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default SafetyTips;
