import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { motion } from 'framer-motion';

interface ProfileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const handleNavigation = (path: string) => {
        if (path === '/profile' && user) {
            navigate(`/profile/${user.id || (user as any)._id}`);
        } else {
            navigate(path);
        }
        onClose();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 400 },
                    bgcolor: 'background.glassSidebar',
                    backdropFilter: 'blur(20px)',
                    borderLeft: 1,
                    borderColor: 'background.glassBorder',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            {/* Header / Close Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'primary.main',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                        '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Profile Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Avatar
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                            sx={{
                                width: 120,
                                height: 120,
                                mx: 'auto',
                                border: '4px solid white',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                            }}
                        />
                    </motion.div>

                    {/* Decorative Glass Badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: 'primary.main',
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: 100,
                            boxShadow: '0 4px 12px rgba(233,30,99,0.3)',
                        }}
                    >
                        <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>
                            ADVISOR
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h5" fontWeight={900} sx={{ color: 'text.primary', fontFamily: '"Outfit", sans-serif', mb: 0.5 }}>
                    Ashley emyy
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 600, opacity: 0.8 }}>
                    Senior Personal Advisor
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        borderRadius: 100,
                        mb: 3,
                        fontWeight: 700,
                        boxShadow: '0 8px 16px rgba(233, 30, 99, 0.2)',
                        '&:hover': {
                            boxShadow: '0 12px 24px rgba(233, 30, 99, 0.3)',
                        }
                    }}
                >
                    Contact Support
                </Button>

                <Stack direction="row" spacing={1.5} justifyContent="center">
                    {[FacebookIcon, TwitterIcon, WhatsAppIcon, LinkedInIcon, InstagramIcon].map((Icon, idx) => (
                        <IconButton
                            key={idx}
                            size="small"
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                                color: 'primary.main',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    transform: 'translateY(-3px)'
                                }
                            }}
                        >
                            <Icon fontSize="small" />
                        </IconButton>
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'background.glassBorder' }} />

            {/* Scrollable Content Area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1 }}>
                {/* Activity Section */}
                <Box sx={{ mb: 3, mt: 2 }}>
                    <Typography variant="overline" color="text.secondary" fontWeight={900} sx={{ letterSpacing: 2, px: 2 }}>
                        ACTIVITY
                    </Typography>
                    <List dense>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/shortlisted')} sx={{ borderRadius: 2, mx: 1 }}>
                                <ListItemAvatar sx={{ minWidth: 45 }}>
                                    <Avatar sx={{ bgcolor: alpha('#ff9800', 0.1), color: '#ff9800', width: 32, height: 32 }}>
                                        <StarIcon fontSize="small" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Shortlisted"
                                    secondary="Users you've saved"
                                    primaryTypographyProps={{ fontWeight: 700 }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/visitors')} sx={{ borderRadius: 2, mx: 1 }}>
                                <ListItemAvatar sx={{ minWidth: 45 }}>
                                    <Avatar sx={{ bgcolor: alpha('#2196f3', 0.1), color: '#2196f3', width: 32, height: 32 }}>
                                        <VisibilityIcon fontSize="small" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Profile Visitors"
                                    secondary="People who viewed you"
                                    primaryTypographyProps={{ fontWeight: 700 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>

                {/* Account Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="overline" color="text.secondary" fontWeight={900} sx={{ letterSpacing: 2, px: 2 }}>
                        MY ACCOUNT
                    </Typography>
                    <List dense>
                        {[
                            { text: 'View Profile', sub: 'See your public view', icon: <PersonIcon />, path: '/profile' },
                            { text: 'Edit Profile', sub: 'Update your info', icon: <SettingsIcon />, path: '/profile/edit' },
                            { text: 'Privacy Settings', sub: 'Manage visibility', icon: <SecurityIcon />, path: '/profile/privacy' },
                        ].map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(item.path)} sx={{ borderRadius: 2, mx: 1 }}>
                                    <ListItemAvatar sx={{ minWidth: 45 }}>
                                        <Avatar sx={{ bgcolor: alpha('#5c6bc0', 0.1), color: '#5c6bc0', width: 32, height: 32 }}>
                                            {React.cloneElement(item.icon as any, { fontSize: 'small' })}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.text}
                                        secondary={item.sub}
                                        primaryTypographyProps={{ fontWeight: 700 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'background.glassBorder' }} />

            {/* Logout Footer */}
            <Box sx={{ p: 1 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 3,
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                        }
                    }}
                >
                    <ListItemAvatar sx={{ minWidth: 45 }}>
                        <Avatar sx={{ bgcolor: 'transparent', color: 'error.main', width: 32, height: 32 }}>
                            <LogoutIcon fontSize="small" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 900 }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default ProfileSidebar;
