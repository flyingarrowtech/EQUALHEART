import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Avatar,
    Button,
    alpha
} from '@mui/material';
import {
    ArrowForward,
    Favorite,
    Chat,
    Visibility,
    Star,
    VerifiedUser
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

// Mock Data (Enhanced for UI)
const newMatches = [
    { id: 1, name: 'Priya Sharma', age: 26, location: 'Mumbai', profession: 'Software Engineer', image: 'https://i.pravatar.cc/300?img=45', matchScore: 95 },
    { id: 2, name: 'Anjali Gupta', age: 25, location: 'Delhi', profession: 'Doctor', image: 'https://i.pravatar.cc/300?img=47', matchScore: 92 },
    { id: 3, name: 'Sneha Patel', age: 27, location: 'Ahmedabad', profession: 'Architect', image: 'https://i.pravatar.cc/300?img=48', matchScore: 88 },
    { id: 4, name: 'Riya Singh', age: 24, location: 'Bangalore', profession: 'Data Scientist', image: 'https://i.pravatar.cc/300?img=49', matchScore: 85 },
];

const stats = [
    { label: 'Profile Views', value: 128, icon: <Visibility />, color: '#4CAF50' },
    { label: 'Interests Sent', value: 45, icon: <Favorite />, color: '#E91E63' },
    { label: 'Connections', value: 12, icon: <Chat />, color: '#2196F3' },
    { label: 'Shortlisted', value: 8, icon: <Star />, color: '#FFC107' },
];

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const mainColor = '#B88E2F'; // Gold/Premium

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA', pb: 8 }}>
            {/* Welcome Banner */}
            <Box
                sx={{
                    bgcolor: 'white',
                    pt: 4,
                    pb: 6,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    mb: 4
                }}
            >
                <Container maxWidth="xl">
                    <Grid container alignItems="center" spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#333', mb: 1, fontFamily: '"Cinzel", serif' }}>
                                Welcome back, {user?.fullName?.firstName || 'User'}!
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                You have <Box component="span" sx={{ color: mainColor, fontWeight: 700 }}>12 new matches</Box> waiting for you today.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                            <Button
                                variant="contained"
                                startIcon={<VerifiedUser />}
                                sx={{
                                    bgcolor: mainColor,
                                    color: 'white',
                                    borderRadius: 50,
                                    px: 3,
                                    py: 1,
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#9A7625' }
                                }}
                                onClick={() => navigate('/membership')}
                            >
                                Upgrade Plan
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="xl">
                <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">

                    {/* Stats Section */}
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {stats.map((stat, index) => (
                            <Grid size={{ xs: 6, md: 3 }} key={index}>
                                <Paper
                                    elevation={0}
                                    component={motion.div}
                                    variants={itemVariants}
                                    sx={{
                                        p: 3,
                                        borderRadius: 4,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: mainColor,
                                            boxShadow: `0 4px 20px ${alpha(mainColor, 0.15)}`
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: '50%',
                                            bgcolor: alpha(stat.color, 0.1),
                                            color: stat.color,
                                            display: 'flex'
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#333' }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* New Matches Section */}
                    <Box sx={{ mb: 6 }} component={motion.div} variants={itemVariants}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontFamily: '"Cinzel", serif' }}>
                                New Profile Matches
                            </Typography>
                            <Button
                                endIcon={<ArrowForward />}
                                sx={{ color: mainColor, fontWeight: 700 }}
                                onClick={() => navigate('/matches')}
                            >
                                View All
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            {newMatches.map((profile) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={profile.id}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                                                '& .profile-img': { transform: 'scale(1.05)' }
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                                            <Box
                                                component="img"
                                                src={profile.image}
                                                alt={profile.name}
                                                className="profile-img"
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: 'rgba(255,255,255,0.9)',
                                                    borderRadius: 50,
                                                    px: 1.5,
                                                    py: 0.5,
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    color: '#4CAF50',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                {profile.matchScore}% Match
                                            </Box>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                    p: 2,
                                                    pt: 6
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                                                    {profile.name}, {profile.age}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                                                    {profile.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ p: 2 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <VerifiedUser fontSize="small" sx={{ color: mainColor }} />
                                                {profile.profession}
                                            </Typography>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 50,
                                                    borderColor: mainColor,
                                                    color: mainColor,
                                                    '&:hover': {
                                                        bgcolor: alpha(mainColor, 0.1),
                                                        borderColor: mainColor
                                                    }
                                                }}
                                                onClick={() => navigate(`/profile/${profile.id}`)}
                                            >
                                                View Profile
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Secondary Section (Requests & Activity) */}
                    <Grid container spacing={4} component={motion.div} variants={itemVariants}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    height: '100%'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontFamily: '"Cinzel", serif' }}>
                                    Recent Interest Requests
                                </Typography>
                                {[1, 2, 3].map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 2,
                                            pb: 2,
                                            borderBottom: item !== 3 ? '1px solid' : 'none',
                                            borderColor: 'divider'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar src={`https://i.pravatar.cc/150?img=${item + 10}`} sx={{ width: 50, height: 50 }} />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    New Person {item}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Software Developer • 26 Yrs
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button size="small" variant="contained" sx={{ bgcolor: mainColor, color: 'white', borderRadius: 50 }}>
                                                Accept
                                            </Button>
                                            <Button size="small" variant="outlined" color="inherit" sx={{ borderRadius: 50 }}>
                                                Decline
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: '#2C3E50',
                                    color: 'white',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontFamily: '"Cinzel", serif' }}>
                                        Premium Plan
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>
                                        Your premium membership expires in 12 days. Renew now to keep accessing exclusive features.
                                    </Typography>

                                    <Box sx={{ mb: 4 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="caption" fontWeight={700}>DAYS LEFT</Typography>
                                            <Typography variant="caption" fontWeight={700}>12 / 30</Typography>
                                        </Box>
                                        <Box sx={{ height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                                            <Box sx={{ height: '100%', width: '40%', bgcolor: mainColor, borderRadius: 4 }} />
                                        </Box>
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'white',
                                            color: '#2C3E50',
                                            fontWeight: 800,
                                            borderRadius: 50,
                                            '&:hover': { bgcolor: '#f0f0f0' }
                                        }}
                                        onClick={() => navigate('/membership')}
                                    >
                                        Renew Now
                                    </Button>
                                </Box>

                                {/* Decor Circle */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -50,
                                        right: -50,
                                        width: 150,
                                        height: 150,
                                        borderRadius: '50%',
                                        bgcolor: alpha(mainColor, 0.2)
                                    }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;
