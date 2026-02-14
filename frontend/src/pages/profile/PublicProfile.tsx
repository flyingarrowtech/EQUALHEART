import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    Button,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    alpha,
    ImageList,
    ImageListItem,
    Tooltip,
    Avatar,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    Message,
    Phone,
    ArrowBack,
    VerifiedUser,
    WorkspacePremium,
    Star,
    StarBorder,
    Visibility,
    Cake,
    Height,
    School,
    Work,
    Language,
    Home,
    SmokeFree,
    LocalBar,
    Restaurant,
    Block,
    Flag,
    MoreVert,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import userApi from '../../api/userApi';
import { useAuthStore } from '../../store/useAuthStore';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';

const PublicProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const currentUser = useAuthStore((state) => state.user);
    const isPremium = currentUser?.membership?.tier !== 'Basic';

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [interestSent, setInterestSent] = useState(false);
    const [isShortlisted, setIsShortlisted] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);
    const [profileViews, setProfileViews] = useState(0);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userApi.getPublicProfile(id!);
                setProfile(response.data);
                setIsShortlisted(response.data.isShortlisted);
                setProfileViews(response.data.profileViews || 0);
            } catch (err: any) {
                console.error('Failed to fetch profile', err);
                setError('Failed to load profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProfile();
    }, [id]);

    const handleExpressInterest = async () => {
        try {
            await userApi.logBehavior(id!, 'Like');
            setInterestSent(true);
        } catch (error: any) {
            if (error.response?.data?.message?.includes('limit reached')) {
                navigate('/membership');
            } else {
                alert('Failed to express interest.');
            }
        }
    };

    const handleToggleShortlist = async () => {
        try {
            const res = await userApi.toggleShortlist(id!);
            setIsShortlisted(res.isShortlisted);
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleViewContact = () => {
        if (!isPremium) {
            navigate('/membership');
            return;
        }
        setContactVisible(true);
    };

    const handleBlockUser = async () => {
        if (!window.confirm('Are you sure you want to block this user?')) return;
        try {
            await userApi.blockUser(id!);
            setMenuAnchor(null);
            alert('User blocked successfully');
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert('Failed to block user');
        }
    };

    const handleReportUser = async () => {
        if (!window.confirm('Are you sure you want to report this user?')) return;
        try {
            await userApi.reportUser(id!);
            setMenuAnchor(null);
            alert('User reported successfully. Our team will review this report.');
        } catch (error) {
            console.error(error);
            alert('Failed to report user');
        }
    };

    if (loading) return <LoadingState type="skeleton-profile" />;
    if (error || !profile) return <ErrorState message={error || 'Profile not found'} />;

    const photos =
        profile.photos && profile.photos.length > 0
            ? profile.photos
            : [{ url: 'https://via.placeholder.com/400?text=No+Photo' }];

    const InfoRow = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode;
        label: string;
        value: any;
    }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ color: 'primary.main', mr: 2, mt: 0.5 }}>{icon}</Box>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                    {value || 'Not Specified'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            {/* Cover Image & Header */}
            <Box
                sx={{
                    height: 300,
                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                    position: 'relative',
                }}
            >
                <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            position: 'absolute',
                            top: 24,
                            left: 24,
                            color: 'white',
                            bgcolor: 'rgba(0,0,0,0.2)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <IconButton
                        onClick={(e) => setMenuAnchor(e.currentTarget)}
                        sx={{
                            position: 'absolute',
                            top: 24,
                            right: 24,
                            color: 'white',
                            bgcolor: 'rgba(0,0,0,0.2)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                        }}
                    >
                        <MoreVert />
                    </IconButton>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -16, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {/* Left Column: Photos & Actions */}
                    <Box sx={{ width: { xs: '100%', md: 'calc(33.333% - 22px)' } }}>
                        <Paper
                            component={motion.div}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            elevation={24}
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                overflow: 'hidden',
                                bgcolor: 'white',
                            }}
                        >
                            <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2 }}>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${photos[0].url}`}
                                    alt="Main Profile"
                                    style={{ width: '100%', height: 400, objectFit: 'cover' }}
                                />

                                {/* Match Score Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        backdropFilter: 'blur(4px)',
                                        borderRadius: 3,
                                        px: 1.5,
                                        py: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: '#4caf50',
                                        }}
                                    />
                                    <Typography variant="subtitle2" fontWeight={800} color="primary.main">
                                        {profile.matchingScore || 75}% Match
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Photo Gallery Thumbnails */}
                            {photos.length > 1 && (
                                <ImageList variant="standard" cols={4} gap={8} sx={{ mb: 3 }}>
                                    {photos.slice(1).map((item: any, index: number) => (
                                        <ImageListItem key={index}>
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}${item.url}`}
                                                alt={`Photo ${index + 1}`}
                                                style={{ borderRadius: 8, height: 70, objectFit: 'cover', cursor: 'pointer' }}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}

                            {/* Action Buttons */}
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        color={interestSent ? 'success' : 'primary'}
                                        startIcon={interestSent ? <Favorite /> : <FavoriteBorder />}
                                        onClick={handleExpressInterest}
                                        disabled={interestSent}
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 3,
                                            fontWeight: 700,
                                            background: interestSent ? undefined : 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                            boxShadow: interestSent ? undefined : '0 4px 12px rgba(233, 30, 99, 0.3)',
                                        }}
                                    >
                                        {interestSent ? 'Interest Sent' : 'Send Interest'}
                                    </Button>
                                    <Tooltip title={isShortlisted ? 'Remove from Shortlist' : 'Shortlist Profile'}>
                                        <Button
                                            variant="outlined"
                                            color={isShortlisted ? 'warning' : 'primary'}
                                            onClick={handleToggleShortlist}
                                            sx={{ borderRadius: 3, minWidth: 60, borderColor: isShortlisted ? '#ff9800' : '#e0e0e0' }}
                                        >
                                            {isShortlisted ? <Star sx={{ color: '#ff9800' }} /> : <StarBorder />}
                                        </Button>
                                    </Tooltip>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="large"
                                    startIcon={<Phone />}
                                    onClick={handleViewContact}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 700,
                                        borderColor: 'primary.main',
                                        borderWidth: 2,
                                        '&:hover': { borderWidth: 2 },
                                    }}
                                >
                                    View Contact
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Right Column: Info */}
                    <Box sx={{ width: { xs: '100%', md: 'calc(66.666% - 10px)' } }}>
                        <Paper
                            component={motion.div}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRadius: 4,
                                width: '100%',
                                bgcolor: 'white',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {/* Header Info */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="h3" fontWeight={800}>
                                        {profile.fullName?.firstName} {profile.fullName?.lastName}
                                    </Typography>
                                    {profile.isVerified && (
                                        <Tooltip title="Verified Profile">
                                            <VerifiedUser color="primary" sx={{ fontSize: 28 }} />
                                        </Tooltip>
                                    )}
                                    {profile.membership?.tier !== 'Basic' && (
                                        <Tooltip title="Premium Member">
                                            <WorkspacePremium color="secondary" sx={{ fontSize: 28 }} />
                                        </Tooltip>
                                    )}
                                </Box>
                                <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                    {profile.age} years • {profile.city}, {profile.state}, {profile.country}
                                </Typography>

                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Chip icon={<Visibility fontSize="small" />} label={`${profileViews} Views`} variant="outlined" size="small" />
                                    <Chip label={`User ID: ${profile._id?.substring(0, 8).toUpperCase()}`} variant="outlined" size="small" />
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            {/* About Me */}
                            <Box sx={{ mb: 5 }}>
                                <Typography variant="h5" fontWeight={800} gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                                    About Me
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                    {profile.aboutMe || "Let's connect to know more about me!"}
                                </Typography>
                            </Box>

                            {/* Details Grid */}
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
                                        Basic Details
                                    </Typography>
                                    <InfoRow icon={<Cake />} label="Age" value={`${profile.age} Years`} />
                                    <InfoRow icon={<Height />} label="Height" value={profile.height ? `${profile.height} cm` : null} />
                                    <InfoRow icon={<Language />} label="Mother Tongue" value={profile.motherTongue} />
                                    <InfoRow icon={<Star />} label="Religion" value={profile.religion} />
                                    <InfoRow icon={<Favorite />} label="Marital Status" value={profile.maritalStatus} />
                                </Box>

                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
                                        Education & Career
                                    </Typography>
                                    <InfoRow icon={<School />} label="Education" value={profile.highestEducation} />
                                    <InfoRow icon={<Work />} label="Occupation" value={profile.occupation} />
                                    <InfoRow icon={<Work />} label="Company" value={profile.companyName} />
                                    <InfoRow icon={<Work />} label="Income" value={profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : null} />
                                </Box>

                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
                                        Lifestyle & Habits
                                    </Typography>
                                    <InfoRow icon={<LocalBar />} label="Drinking" value={profile.drinking} />
                                    <InfoRow icon={<SmokeFree />} label="Smoking" value={profile.smoking} />
                                    <InfoRow icon={<Restaurant />} label="Diet" value={profile.dietaryHabits} />
                                    <InfoRow icon={<Home />} label="House Plans" value={profile.planToHaveOwnHouse} />
                                </Box>
                            </Box>

                            {/* Hobbies */}
                            {profile.hobbies && profile.hobbies.length > 0 && (
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 2 }}>
                                        Hobbies & Interests
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {profile.hobbies.map((hobby: string) => (
                                            <Chip
                                                key={hobby}
                                                label={hobby}
                                                sx={{
                                                    borderRadius: 2,
                                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                                    color: 'primary.main',
                                                    fontWeight: 600,
                                                    px: 1,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Container>

            {/* Contact Dialog */}
            <Dialog
                open={contactVisible}
                onClose={() => setContactVisible(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 4, p: 2 } }}
            >
                <DialogTitle sx={{ fontWeight: 800, textAlign: 'center' }}>Contact Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Avatar
                            src={`${import.meta.env.VITE_API_URL}${photos[0].url}`}
                            sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="h6" fontWeight={700}>
                            {profile.fullName?.firstName} {profile.fullName?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Reach out directly
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: '#f5f5f5',
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Phone color="primary" />
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Mobile Number
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                    {profile.mobileNumber || 'Not provided'}
                                </Typography>
                            </Box>
                        </Box>
                        {profile.whatsappNumber && (
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: '#e8f5e9',
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Message color="success" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        WhatsApp
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {profile.whatsappNumber}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={() => setContactVisible(false)} sx={{ fontWeight: 700 }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* More Options Menu */}
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                PaperProps={{
                    sx: { borderRadius: 2, minWidth: 200 },
                }}
            >
                <MenuItem onClick={handleBlockUser}>
                    <ListItemIcon>
                        <Block fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Block User</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleReportUser}>
                    <ListItemIcon>
                        <Flag fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText>Report User</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default PublicProfile;
