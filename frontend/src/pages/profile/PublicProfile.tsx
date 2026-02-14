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
    LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import userApi from '../../api/userApi';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';

const PublicProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const currentUser = useAuthStore((state) => state.user);
    const { showToast, showConfirm } = useNotificationStore();
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
            showToast('Interest expressed successfully!', 'success');
        } catch (error: any) {
            if (error.response?.data?.message?.includes('limit reached')) {
                showToast('Daily interest limit reached. Upgrade to Premium!', 'warning');
                navigate('/membership');
            } else {
                showToast('Failed to express interest.', 'error');
            }
        }
    };

    const handleToggleShortlist = async () => {
        try {
            const res = await userApi.toggleShortlist(id!);
            setIsShortlisted(res.isShortlisted);
            showToast(res.isShortlisted ? 'Profile shortlisted' : 'Removed from shortlist', 'info');
        } catch (error: any) {
            console.error(error);
            showToast('Failed to update shortlist', 'error');
        }
    };

    const handleViewContact = () => {
        if (!isPremium) {
            showToast('Please upgrade to Premium to view contact details', 'info');
            navigate('/membership');
            return;
        }
        setContactVisible(true);
    };

    const handleBlockUser = () => {
        showConfirm({
            title: 'Block User',
            message: 'Are you sure you want to block this user? You will no longer see each other in matches.',
            confirmText: 'Block',
            onConfirm: async () => {
                try {
                    await userApi.blockUser(id!);
                    setMenuAnchor(null);
                    showToast('User blocked successfully', 'success');
                    navigate(-1);
                } catch (error) {
                    console.error(error);
                    showToast('Failed to block user', 'error');
                }
            },
            onCancel: () => { }
        });
    };

    const handleReportUser = () => {
        showConfirm({
            title: 'Report User',
            message: 'Are you sure you want to report this user for inappropriate behavior?',
            confirmText: 'Report',
            onConfirm: async () => {
                try {
                    await userApi.reportUser(id!);
                    setMenuAnchor(null);
                    showToast('User reported. Our team will review this.', 'info');
                } catch (error) {
                    console.error(error);
                    showToast('Failed to report user', 'error');
                }
            },
            onCancel: () => { }
        });
    };



    if (loading) return <LoadingState type="skeleton-profile" />;
    if (error || !profile) return <ErrorState message={error || 'Profile not found'} />;

    const photos =
        profile.photos && profile.photos.length > 0
            ? profile.photos
            : [{ url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60' }];

    const InfoRow = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode;
        label: string;
        value: any;
    }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5 }}>
            <Box
                sx={{
                    color: 'primary.main',
                    mr: 2,
                    mt: 0.5,
                    p: 1,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                    {label.toUpperCase()}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="text.primary">
                    {value || 'Not Specified'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
            {/* Premium Cover Header */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    height: 320,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Circles */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -50,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -50,
                        left: -50,
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    }}
                />

                <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
                    <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(5px)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <IconButton
                            onClick={(e) => setMenuAnchor(e.currentTarget)}
                            sx={{
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(5px)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                            }}
                        >
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -16, position: 'relative', zIndex: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {/* Left Column: Photos & Actions */}
                    <Box sx={{ width: { xs: '100%', md: 'calc(35% - 16px)' } }}>
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
                                bgcolor: 'background.glassCard',
                                backdropFilter: 'blur(20px)',
                                border: 1,
                                borderColor: 'background.glassBorder',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                            }}
                        >
                            <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2 }}>
                                <img
                                    src={`${photos[0].url}`}
                                    alt="Main Profile"
                                    style={{ width: '100%', height: 450, objectFit: 'cover' }}
                                />

                                {/* Match Score Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 3,
                                        px: 1.5,
                                        py: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: '#4caf50',
                                            boxShadow: '0 0 8px #4caf50'
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
                                                src={`${item.url}`}
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
                                            background: interestSent ? undefined : (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            boxShadow: interestSent ? undefined : '0 8px 20px rgba(233, 30, 99, 0.4)',
                                            '&:hover': {
                                                background: interestSent ? undefined : (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                            }
                                        }}
                                    >
                                        {interestSent ? 'Interest Sent' : 'Send Interest'}
                                    </Button>
                                    <Tooltip title={isShortlisted ? 'Remove from Shortlist' : 'Shortlist Profile'}>
                                        <IconButton
                                            onClick={handleToggleShortlist}
                                            sx={{
                                                borderRadius: 3,
                                                border: 1,
                                                borderColor: isShortlisted ? '#ff9800' : 'divider',
                                                bgcolor: isShortlisted ? alpha('#ff9800', 0.1) : 'transparent',
                                                '&:hover': {
                                                    bgcolor: isShortlisted ? alpha('#ff9800', 0.2) : alpha(theme.palette.primary.main, 0.05),
                                                    borderColor: isShortlisted ? '#ff9800' : 'primary.main'
                                                }
                                            }}
                                        >
                                            {isShortlisted ? <Star sx={{ color: '#ff9800' }} /> : <StarBorder sx={{ color: 'text.secondary' }} />}
                                        </IconButton>
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
                                        color: 'primary.main',
                                        '&:hover': {
                                            borderWidth: 2,
                                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05)
                                        },
                                    }}
                                >
                                    View Contact Details
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Right Column: Info */}
                    <Box sx={{ width: { xs: '100%', md: 'calc(65% - 16px)' } }}>
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
                                bgcolor: 'background.glassCard',
                                backdropFilter: 'blur(20px)',
                                border: 1,
                                borderColor: 'background.glassBorder',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
                            }}
                        >
                            {/* Header Info */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="h3" fontWeight={800} color="text.primary">
                                        {profile.fullName?.firstName} {profile.fullName?.lastName}
                                    </Typography>
                                    {profile.isVerified && (
                                        <Tooltip title="Verified Profile">
                                            <VerifiedUser color="primary" sx={{ fontSize: 32 }} />
                                        </Tooltip>
                                    )}
                                    {profile.membership?.tier !== 'Basic' && (
                                        <Tooltip title="Premium Member">
                                            <WorkspacePremium color="secondary" sx={{ fontSize: 32 }} />
                                        </Tooltip>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                        {profile.city}, {profile.state}, {profile.country}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Chip
                                        icon={<Visibility fontSize="small" />}
                                        label={`${profileViews} Views`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderColor: 'divider', borderRadius: 2 }}
                                    />
                                    <Chip
                                        label={`ID: ${profile._id?.substring(0, 8).toUpperCase()}`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderColor: 'divider', borderRadius: 2 }}
                                    />
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
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }} />
                                        Basic Details
                                    </Typography>
                                    <InfoRow icon={<Cake fontSize="small" />} label="Age" value={`${profile.age} Years`} />
                                    <InfoRow icon={<Height fontSize="small" />} label="Height" value={profile.height ? `${profile.height} cm` : null} />
                                    <InfoRow icon={<Language fontSize="small" />} label="Mother Tongue" value={profile.motherTongue} />
                                    <InfoRow icon={<Star fontSize="small" />} label="Religion" value={profile.religion} />
                                    <InfoRow icon={<Favorite fontSize="small" />} label="Marital Status" value={profile.maritalStatus} />
                                </Box>

                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }} />
                                        Education & Career
                                    </Typography>
                                    <InfoRow icon={<School fontSize="small" />} label="Education" value={profile.highestEducation} />
                                    <InfoRow icon={<Work fontSize="small" />} label="Occupation" value={profile.occupation} />
                                    <InfoRow icon={<Work fontSize="small" />} label="Company" value={profile.companyName} />
                                    <InfoRow icon={<Work fontSize="small" />} label="Income" value={profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : null} />
                                </Box>

                                <Box>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }} />
                                        Lifestyle & Habits
                                    </Typography>
                                    <InfoRow icon={<LocalBar fontSize="small" />} label="Drinking" value={profile.drinking} />
                                    <InfoRow icon={<SmokeFree fontSize="small" />} label="Smoking" value={profile.smoking} />
                                    <InfoRow icon={<Restaurant fontSize="small" />} label="Diet" value={profile.dietaryHabits} />
                                    <InfoRow icon={<Home fontSize="small" />} label="House Plans" value={profile.planToHaveOwnHouse} />
                                </Box>
                            </Box>

                            {/* Hobbies */}
                            {profile.hobbies && profile.hobbies.length > 0 && (
                                <Box sx={{ mt: 5 }}>
                                    <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }} />
                                        Hobbies & Interests
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                        {profile.hobbies.map((hobby: string) => (
                                            <Chip
                                                key={hobby}
                                                label={hobby}
                                                sx={{
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                    color: 'primary.main',
                                                    fontWeight: 600,
                                                    px: 1,
                                                    py: 2.5,
                                                    fontSize: '0.95rem',
                                                    border: '1px solid',
                                                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.2)
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
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 2,
                        bgcolor: 'background.paper',
                        backgroundImage: 'none'
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pt: 3 }}>Contact Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Avatar
                            src={`${import.meta.env.VITE_API_URL}${photos[0].url}`}
                            sx={{
                                width: 100,
                                height: 100,
                                mx: 'auto',
                                mb: 2,
                                border: 4,
                                borderColor: 'primary.main'
                            }}
                        />
                        <Typography variant="h5" fontWeight={800}>
                            {profile.fullName?.firstName} {profile.fullName?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Premium Member
                        </Typography>
                    </Box>
                    <Stack spacing={2.5}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2.5,
                                border: '1px solid',
                                borderColor: (theme) => alpha(theme.palette.primary.main, 0.1)
                            }}
                        >
                            <Box sx={{
                                p: 1.5,
                                borderRadius: '50%',
                                bgcolor: 'white',
                                color: 'primary.main',
                                display: 'flex',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <Phone />
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 1 }}>
                                    MOBILE NUMBER
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color="text.primary">
                                    {profile.mobileNumber || 'Not provided'}
                                </Typography>
                            </Box>
                        </Paper>

                        {profile.whatsappNumber && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.05),
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2.5,
                                    border: '1px solid',
                                    borderColor: (theme) => alpha(theme.palette.success.main, 0.1)
                                }}
                            >
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: '50%',
                                    bgcolor: 'white',
                                    color: 'success.main',
                                    display: 'flex',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}>
                                    <Message />
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 1 }}>
                                        WHATSAPP
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700} color="text.primary">
                                        {profile.whatsappNumber}
                                    </Typography>
                                </Box>
                            </Paper>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        onClick={() => setContactVisible(false)}
                        variant="outlined"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            borderRadius: 3,
                            px: 4,
                            borderColor: 'divider',
                            color: 'text.secondary'
                        }}
                    >
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
                    elevation: 4,
                    sx: {
                        borderRadius: 3,
                        minWidth: 200,
                        mt: 1.5,
                        overflow: 'visible',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleBlockUser} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <Block fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontWeight: 600, color: 'error.main' }}>
                        Block User
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleReportUser} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <Flag fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontWeight: 600 }}>
                        Report User
                    </ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default PublicProfile;
