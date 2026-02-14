import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Menu,
    MenuItem,
    Avatar,
    IconButton,
    alpha
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggler from '../common/ThemeToggler';
import ProfileSidebar from './ProfileSidebar';
import MainSidebar from './MainSidebar';

// Define types for navigation
interface NavSubItem {
    text: string;
    path: string;
    icon?: React.ReactNode;
}

interface NavItem {
    text: string;
    path?: string;
    subItems?: NavSubItem[];
    // icon prop not used in top level items in this design
    hideWhenAuth?: boolean;
    hideWhenGuest?: boolean;
}

const Navbar: React.FC = () => {
    const { isAuthenticated, user } = useAuthStore();
    const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
    const [mainSidebarOpen, setMainSidebarOpen] = useState(false);

    // Dynamic Navigation Structure
    const navItems = React.useMemo(() => {
        const baseStructure: NavItem[] = [
            {
                text: 'EXPLORE',
                subItems: [
                    { text: 'Search', icon: <SearchIcon fontSize="small" />, path: '/search' },
                    { text: 'Matches', icon: <FavoriteIcon fontSize="small" />, path: '/matches' },
                    { text: 'Shortlisted', icon: <StarIcon fontSize="small" />, path: '/shortlisted' },
                    { text: 'Visitors', icon: <VisibilityIcon fontSize="small" />, path: '/visitors' },
                ]
            },
            {
                text: 'ALL PAGES',
                subItems: [
                    { text: 'Home', path: '/' },
                    { text: 'About Us', path: '/about' },
                    { text: 'Contact', path: '/contact' },
                    { text: 'Success Stories', path: '/success-stories' },
                ]
            },
            {
                text: 'TOP PAGES',
                subItems: [
                    { text: 'Help Center', path: '/help' },
                    { text: 'Safety Tips', path: '/safety' },
                ]
            },
            { text: 'PLANS', path: '/membership' },
            { text: 'REGISTER', path: '/register', hideWhenAuth: true }, // custom flag
            {
                text: 'DASHBOARD',
                path: '/dashboard',
                hideWhenGuest: true, // custom flag
                subItems: [
                    { text: 'Overview', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
                    { text: 'My Profile', icon: <PersonIcon fontSize="small" />, path: '/profile' },
                    { text: 'Settings', icon: <SettingsIcon fontSize="small" />, path: '/profile/edit' },
                ]
            },
        ];

        return baseStructure.filter(item => {
            if (isAuthenticated && item.hideWhenAuth) return false;
            if (!isAuthenticated && item.hideWhenGuest) return false;
            return true;
        });
    }, [isAuthenticated]);

    // Initial scroll check
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menuKey: string) => {
        setAnchorEl({ ...anchorEl, [menuKey]: event.currentTarget });
    };

    const handleMenuClose = (menuKey: string) => {
        setAnchorEl({ ...anchorEl, [menuKey]: null });
    };

    const handleUserMenuOpen = () => {
        setProfileSidebarOpen(true);
    };

    const mainColor = '#B88E2F'; // Gold/Premium color

    // Helper to safely get user photo
    const getUserPhoto = () => {
        if (!user) return '';
        // @ts-ignore
        const photos = user.photos || [];
        const mainPhoto = photos.find((p: any) => p.isMain) || photos[0];
        return mainPhoto ? `${import.meta.env.VITE_API_URL}${mainPhoto.url}` : '';
    };

    return (
        <AppBar
            position="sticky"
            elevation={scrolled ? 4 : 0}
            sx={{
                bgcolor: 'white',
                color: 'text.primary',
                transition: 'all 0.3s ease',
                borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.05)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 80, justifyContent: 'space-between' }}>
                    {/* Logo Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                        }}
                    >
                        <IconButton
                            onClick={() => setMainSidebarOpen(true)}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: mainColor,
                                color: 'white',
                                '&:hover': { bgcolor: '#8E6E24' }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box
                            component={Link}
                            to="/"
                            sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: '"Cinzel", serif',
                                    fontWeight: 800,
                                    letterSpacing: '.1rem',
                                    color: '#333',
                                    lineHeight: 1,
                                    fontSize: '1.4rem'
                                }}
                            >
                                EQUAL<Box component="span" sx={{ color: mainColor }}>HEART</Box>
                            </Typography>
                        </Box>

                        <MainSidebar
                            open={mainSidebarOpen}
                            onClose={() => setMainSidebarOpen(false)}
                        />
                    </Box>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                        {navItems.map((item) => (
                            <Box key={item.text}>
                                {item.subItems ? (
                                    <>
                                        <Button
                                            onClick={(e) => handleMenuOpen(e, item.text)}
                                            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />}
                                            sx={{
                                                color: '#444',
                                                fontWeight: 600,
                                                fontSize: '0.85rem',
                                                '&:hover': { color: mainColor, bgcolor: 'transparent' },
                                            }}
                                        >
                                            {item.text}
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl[item.text]}
                                            open={Boolean(anchorEl[item.text])}
                                            onClose={() => handleMenuClose(item.text)}
                                            PaperProps={{
                                                sx: {
                                                    mt: 1.5,
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                    borderRadius: 2,
                                                    minWidth: 180,
                                                }
                                            }}
                                        >
                                            {item.subItems.map((subItem) => (
                                                <MenuItem
                                                    key={subItem.text}
                                                    component={Link}
                                                    to={subItem.path || '#'}
                                                    onClick={() => handleMenuClose(item.text)}
                                                    sx={{
                                                        gap: 1.5,
                                                        py: 1.5,
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500,
                                                        '&:hover': { color: mainColor, bgcolor: alpha(mainColor, 0.05) }
                                                    }}
                                                >
                                                    {subItem.icon && React.cloneElement(subItem.icon as React.ReactElement<any>, { fontSize: 'small', sx: { color: mainColor } })}
                                                    {subItem.text}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                ) : (
                                    <Button
                                        component={Link}
                                        to={item.path || '#'}
                                        sx={{
                                            color: '#444',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            '&:hover': { color: mainColor, bgcolor: 'transparent' },
                                        }}
                                    >
                                        {item.text}
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>

                    {/* User Profile Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThemeToggler />

                        {isAuthenticated && user ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleUserMenuOpen}>
                                    <Avatar
                                        src={getUserPhoto()}
                                        alt={user.fullName?.firstName}
                                        sx={{ width: 45, height: 45, border: `2px solid ${mainColor}`, mr: 1.5 }}
                                    >
                                        {user.fullName?.firstName?.charAt(0)}
                                    </Avatar>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Typography variant="caption" display="block" sx={{ color: '#888', lineHeight: 1, mb: 0.5, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                                            ADVISOR
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1, color: '#333' }}>
                                            {user.fullName?.firstName} {user.fullName?.lastName}
                                        </Typography>
                                    </Box>
                                </Box>

                                <ProfileSidebar
                                    open={profileSidebarOpen}
                                    onClose={() => setProfileSidebarOpen(false)}
                                />
                            </Box>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                sx={{
                                    bgcolor: mainColor,
                                    color: 'white',
                                    fontWeight: 700,
                                    borderRadius: 50,
                                    px: 3,
                                    '&:hover': { bgcolor: '#8E6E24' }
                                }}
                            >
                                LOGIN
                            </Button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <IconButton
                            sx={{ display: { md: 'none' }, color: mainColor }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
