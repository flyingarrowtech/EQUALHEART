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
    ListItemAvatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface ProfileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const handleNavigation = (path: string) => {
        // If path is generic /profile and we have a user, properly route to public profile
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
                sx: { width: { xs: '100%', sm: 400 }, p: 3 }
            }}
        >
            {/* Header / Close Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <IconButton onClick={onClose} sx={{ color: '#e91e63' }}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Support Team Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1}>
                    SUPPORT TEAM
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-block', mt: 2, mb: 1 }}>
                    <Avatar
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                        sx={{ width: 120, height: 120, mx: 'auto', border: '4px solid white', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: -20,
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderBottom: '25px solid #00e676', // Green triangle styling
                            transform: 'rotate(-45deg)'
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -10,
                            right: -30,
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: '#ffeb3b', // Yellow circle styling
                            zIndex: -1
                        }}
                    />
                </Box>

                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, color: '#333' }}>
                    Ashley emyy
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Senior personal advisor
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#546e7a',
                        color: 'white',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        borderRadius: 1,
                        mb: 3,
                        '&:hover': { bgcolor: '#455a64' }
                    }}
                >
                    Ask your doubts
                </Button>

                <Stack direction="row" spacing={1} justifyContent="center">
                    {[FacebookIcon, TwitterIcon, WhatsAppIcon, LinkedInIcon, YouTubeIcon, InstagramIcon].map((Icon, idx) => (
                        <IconButton key={idx} size="small" sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}>
                            <Icon fontSize="small" sx={{ color: '#555' }} />
                        </IconButton>
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Activity Section */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1}>
                    ACTIVITY
                </Typography>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/shortlisted')}>
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <StarIcon fontSize="small" color="primary" />
                            </ListItemAvatar>
                            <ListItemText primary="Shortlisted" secondary="Users you have saved" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/visitors')}>
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <VisibilityIcon fontSize="small" color="primary" />
                            </ListItemAvatar>
                            <ListItemText primary="Profile Visitors" secondary="People who viewed you" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Quick Actions (Preserving Dropdown Functionality) */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1}>
                    MY ACCOUNT
                </Typography>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/profile')}>
                            <ListItemText primary="View Profile" secondary="See how others view your profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/profile/edit')}>
                            <ListItemText primary="Edit Profile" secondary="Update your information" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/profile/privacy')}>
                            <ListItemText primary="Privacy Settings" secondary="Manage visibility & blocking" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Latest News Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1}>
                    LATEST NEWS
                </Typography>
                <List>
                    {[
                        {
                            title: 'Long established fact that a reader distracted',
                            date: '12 Dec 2023',
                            image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=200'
                        },
                        {
                            title: 'Long established fact that a reader distracted',
                            date: '12 Dec 2023',
                            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200'
                        },
                        {
                            title: 'Long established fact that a reader distracted',
                            date: '12 Dec 2023',
                            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
                        }
                    ].map((news, idx) => (
                        <ListItem key={idx} alignItems="flex-start" sx={{ px: 0 }}>
                            <ListItemAvatar>
                                <Avatar variant="square" src={news.image} sx={{ width: 60, height: 60, borderRadius: 2, mr: 2 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle2" fontWeight="bold" lineHeight={1.3} mb={0.5}>
                                        {news.title}
                                    </Typography>
                                }
                                secondary={
                                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Typography component="span" variant="caption" color="text.secondary">
                                            &gt; {news.date}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: 200,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mt: 'auto'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                        Tell us your Needs
                    </Typography>
                    <Typography variant="caption" color="rgba(255,255,255,0.8)" sx={{ mb: 2 }}>
                        Tell us what kind of service you are looking for.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#0d47a1',
                            borderRadius: 0,
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            letterSpacing: 1,
                            '&:hover': { bgcolor: '#002171' }
                        }}
                    >
                        REGISTER FOR FREE
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default ProfileSidebar;
