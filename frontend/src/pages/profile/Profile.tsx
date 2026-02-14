import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Stack,
    Divider
} from '@mui/material';
import {
    Edit as EditIcon,
    Settings as SettingsIcon,
    VerifiedUser,
    LocationOn,
    CalendarToday,
    Work,
    School,
    PhotoCamera,
    Favorite
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import LoadingState from '../../components/common/LoadingState';

// Helper for icons used in Basic Details
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userApi.getProfile();
                setProfile(response.data);
            } catch (err) {
                console.error('Failed to fetch profile', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <LoadingState type="skeleton-profile" />;

    // Redirect if no profile found (or show error state)
    if (!profile) return <Box sx={{ p: 4 }}>Profile not found.</Box>;

    const coverImage = "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1920&q=80"; // Premium abstract gradient or image
    const userPhoto = profile.photos?.[0]?.url ? `${import.meta.env.VITE_API_URL}${profile.photos[0].url}` : undefined;

    const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{
                mr: 2,
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                p: 1,
                borderRadius: '50%'
            }}>
                {React.cloneElement(icon as React.ReactElement<any>, { fontSize: 'small' })}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {value || 'Not Specified'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>

            {/* 1. Hero / Cover Section */}
            <Box sx={{
                position: 'relative',
                height: { xs: 200, md: 320 },
                bgcolor: 'grey.300',
                backgroundImage: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
                }} />

                {/* Cover Actions */}
                <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<PhotoCamera />}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                        }}
                    >
                        Edit Cover
                    </Button>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
                {/* 2. Profile Header Card */}
                <Paper
                    elevation={0}
                    sx={{
                        position: 'relative',
                        mt: -4, // Overlap cover
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        overflow: 'visible', // Allow avatar overflow
                        mb: 4,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Box sx={{ px: 4, pb: 4, pt: { xs: 8, md: 2 } }}>
                        {/* Overlapping Avatar */}
                        <Box sx={{
                            position: 'absolute',
                            top: { xs: -60, md: -80 },
                            left: { xs: '50%', md: 40 },
                            transform: { xs: 'translateX(-50%)', md: 'none' }
                        }}>
                            <Avatar
                                src={userPhoto}
                                sx={{
                                    width: { xs: 120, md: 160 },
                                    height: { xs: 120, md: 160 },
                                    border: `5px solid ${theme.palette.background.paper}`,
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                                    bgcolor: 'primary.main',
                                    fontSize: '3rem'
                                }}
                            >
                                {profile.fullName?.firstName?.charAt(0)}
                            </Avatar>
                            {profile.isVerified && (
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    bgcolor: 'background.paper',
                                    borderRadius: '50%',
                                    p: 0.5,
                                    display: 'flex'
                                }}>
                                    <VerifiedUser color="primary" sx={{ fontSize: 28 }} />
                                </Box>
                            )}
                        </Box>

                        {/* Header Content */}
                        <Box sx={{
                            ml: { md: 24 }, // Space for avatar
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                            pt: 1
                        }}>
                            <Box>
                                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
                                    {profile.fullName?.firstName} {profile.fullName?.lastName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 0.5 }}>
                                    <LocationOn fontSize="small" color="action" />
                                    {profile.city || 'City'}, {profile.country || 'Country'}
                                    <Box component="span" sx={{ mx: 1 }}>•</Box>
                                    {profile.occupation || 'Occupation'}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, mb: { xs: 3, md: 0 } }}>
                                    <Chip
                                        icon={<Favorite fontSize="small" />}
                                        label={profile.maritalStatus || 'Status'}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={`${profile.age} yrs`}
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={profile.religion}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>
                            </Box>

                            {/* Actions */}
                            <Stack direction="row" spacing={2} sx={{ mt: { xs: 0, md: 1 } }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<SettingsIcon />}
                                    onClick={() => navigate('/profile/privacy')}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Settings
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => navigate('/profile/edit')}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>

                {/* 3. Main Details Section - using Box/Stack instead of Grid */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* Left Column: About & Education */}
                    <Box sx={{ flex: { md: '0 0 66.666%' }, width: '100%' }}>
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: 'background.paper' }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                About Me
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {profile.aboutMe || 'No description provided yet. Add a few lines about yourself to help matches know you better.'}
                            </Typography>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Education & Career
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                                    <InfoItem icon={<School />} label="Highest Education" value={profile.highestEducation} />
                                </Box>
                                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                                    <InfoItem icon={<School />} label="College" value={profile.collegeName} />
                                </Box>
                                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                                    <InfoItem icon={<Work />} label="Occupation" value={profile.occupation} />
                                </Box>
                                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                                    <InfoItem icon={<Work />} label="Annual Income" value={profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : null} />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                    {/* Right Column: Sidebar Stats/Details */}
                    <Box sx={{ flex: { md: '0 0 32%' }, width: '100%' }}>
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: 'background.paper' }}>
                            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                                Basic Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <InfoItem icon={<PersonIcon />} label="Gender" value={profile.gender} />
                            <InfoItem icon={<CalendarToday />} label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} />
                            <InfoItem icon={<ChatIcon />} label="Mother Tongue" value={profile.motherTongue} />
                        </Paper>

                        {profile.hobbies && profile.hobbies.length > 0 && (
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                                    Interests
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {profile.hobbies.map((h: string) => (
                                        <Chip key={h} label={h} size="small" sx={{ borderRadius: 1 }} />
                                    ))}
                                </Box>
                            </Paper>
                        )}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
};

export default Profile;
