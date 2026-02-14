import React, { useState, useEffect, useRef } from 'react';
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
import ChatIcon from '@mui/icons-material/Chat';
import CategoryIcon from '@mui/icons-material/Category';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';

import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggler from '../common/ThemeToggler';
import ProfileSidebar from './ProfileSidebar';
import MainSidebar from './MainSidebar';
import MobileMenu from './MobileMenu';
import { Pages } from '../../routes/appRoutes';

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

    // Refs for hover timeouts
    const timeoutRefs = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});

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
                    { text: 'Interests', icon: <CategoryIcon fontSize="small" />, path: '/interests' },
                    { text: 'Messages', icon: <ChatIcon fontSize="small" />, path: '/messages' },
                ]
            },
            {
                text: 'PAGES',
                subItems: [
                    { text: 'About Us', icon: <InfoIcon fontSize="small" />, path: '/about' },
                    { text: 'How It Works', icon: <HelpIcon fontSize="small" />, path: '/how-it-works' },
                    { text: 'Success Stories', icon: <StarIcon fontSize="small" />, path: '/success-stories' },
                    { text: 'Blog', icon: <ArticleIcon fontSize="small" />, path: '/blog' },
                    { text: 'Contact Us', icon: <ContactSupportIcon fontSize="small" />, path: '/contact' },
                    { text: 'FAQs', icon: <HelpIcon fontSize="small" />, path: '/faq' },
                ]
            },
            {
                text: 'LEGAL & HELP',
                subItems: [
                    { text: 'Help Center', icon: <HelpIcon fontSize="small" />, path: '/help' },
                    { text: 'Safety Tips', icon: <SecurityIcon fontSize="small" />, path: '/safety' },
                    { text: 'Privacy Policy', icon: <PolicyIcon fontSize="small" />, path: '/privacy' },
                    { text: 'Terms & Conditions', icon: <GavelIcon fontSize="small" />, path: '/terms' },
                    { text: 'Refund Policy', icon: <PolicyIcon fontSize="small" />, path: '/refund' },
                    { text: 'Cookie Policy', icon: <PolicyIcon fontSize="small" />, path: '/cookies' },
                ]
            },
            { text: 'PLANS', path: '/membership' },
            { text: 'REGISTER', path: '/register', hideWhenAuth: true },
            {
                text: 'DASHBOARD',
                path: '/dashboard',
                hideWhenGuest: true,
                subItems: [
                    { text: 'Overview', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
                    { text: 'My Profile', icon: <PersonIcon fontSize="small" />, path: user ? `/profile/${user.id || (user as any)._id}` : '/profile' },
                    { text: 'Edit Profile', icon: <SettingsIcon fontSize="small" />, path: '/profile/edit' },
                    { text: 'Verify Profile', icon: <VerifiedUserIcon fontSize="small" />, path: '/profile/verify' },
                    { text: 'Privacy Settings', icon: <SecurityIcon fontSize="small" />, path: '/profile/privacy' },
                    { text: 'Partner Preferences', icon: <FavoriteIcon fontSize="small" />, path: '/profile/preferences' },
                ]
            },
        ];

        return baseStructure.filter(item => {
            if (isAuthenticated && item.hideWhenAuth) return false;
            if (!isAuthenticated && item.hideWhenGuest) return false;
            return true;
        });
    }, [isAuthenticated, user]);

    // Map paths to Pages for prefetching
    const prefetchPage = (path: string) => {
        const pageMap: { [key: string]: any } = {
            '/': Pages.HomePage,
            '/about': Pages.AboutUs,
            '/how-it-works': Pages.HowItWorks,
            '/success-stories': Pages.SuccessStories,
            '/blog': Pages.Blog,
            '/contact': Pages.ContactUs,
            '/faq': Pages.FAQs,
            '/help': Pages.HelpCenter,
            '/safety': Pages.SafetyTips,
            '/privacy': Pages.PrivacyPolicy,
            '/terms': Pages.TermsAndConditions,
            '/refund': Pages.RefundPolicy,
            '/cookies': Pages.CookiePolicy,
            '/membership': Pages.Membership,
            '/register': Pages.AuthPage,
            '/login': Pages.AuthPage,
            '/dashboard': Pages.Dashboard,
            '/profile/edit': Pages.ProfileEdit,
            '/profile/verify': Pages.Verification,
            '/profile/privacy': Pages.PrivacySettings,
            '/profile': Pages.PublicProfile, // Generic profile points here or redirects
            '/search': Pages.Search,
            '/matches': Pages.Matches,
            '/shortlisted': Pages.Shortlisted,
            '/visitors': Pages.Visitors,
            '/interests': Pages.Interests,
            '/messages': Pages.Messages,
        };

        const page = pageMap[path] || (path.startsWith('/profile/') ? Pages.ProfileEdit : null); // Fallback logic
        if (page && page.preload) {
            page.preload();
        }
    };

    // Initial scroll check
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Cleanup timeouts
            Object.values(timeoutRefs.current).forEach(clearTimeout);
        };
    }, []);

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, menuKey: string) => {
        if (timeoutRefs.current[menuKey]) {
            clearTimeout(timeoutRefs.current[menuKey]);
            delete timeoutRefs.current[menuKey];
        }
        setAnchorEl((prev) => ({ ...prev, [menuKey]: event.currentTarget }));
    };

    const handleMouseLeave = (menuKey: string) => {
        timeoutRefs.current[menuKey] = setTimeout(() => {
            setAnchorEl((prev) => ({ ...prev, [menuKey]: null }));
        }, 200); // 200ms delay to allow moving to the menu
    };

    const handleMenuMouseEnter = (menuKey: string) => {
        if (timeoutRefs.current[menuKey]) {
            clearTimeout(timeoutRefs.current[menuKey]);
            delete timeoutRefs.current[menuKey];
        }
    };

    const handleMenuMouseLeave = (menuKey: string) => {
        handleMouseLeave(menuKey);
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


    // ... (existing imports)

    // ... (inside Navbar component)

    return (
        <>
            <AppBar
                position="fixed"
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
                                <Box key={item.text}
                                    onMouseEnter={(e) => {
                                        item.subItems && handleMouseEnter(e, item.text);
                                        // Prefetch if the item itself has a path (e.g. Dashboard)
                                        if (item.path) prefetchPage(item.path);
                                    }}
                                    onMouseLeave={() => item.subItems && handleMouseLeave(item.text)}
                                >
                                    {item.subItems ? (
                                        <>
                                            <Button
                                                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />}
                                                sx={{
                                                    color: '#444',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    '&:hover': { color: mainColor, bgcolor: 'transparent' },
                                                }}
                                            // Also prefetch if hovering the button triggers a menu that might need it? 
                                            // Actually subitems are what we care about here mostly.
                                            >
                                                {item.text}
                                            </Button>
                                            <Menu
                                                anchorEl={anchorEl[item.text]}
                                                open={Boolean(anchorEl[item.text])}
                                                onClose={() => handleMenuMouseLeave(item.text)}
                                                MenuListProps={{
                                                    onMouseEnter: () => handleMenuMouseEnter(item.text),
                                                    onMouseLeave: () => handleMenuMouseLeave(item.text),
                                                }}
                                                PaperProps={{
                                                    sx: {
                                                        mt: 0, // Adjusted for smoother transition
                                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                        borderRadius: 2,
                                                        minWidth: 180,
                                                    }
                                                }}
                                                // Keep mounted to avoid flickering during hover checking
                                                keepMounted
                                            >
                                                {item.subItems.map((subItem) => (
                                                    <MenuItem
                                                        key={subItem.text}
                                                        component={Link}
                                                        to={subItem.path || '#'}
                                                        onClick={() => setAnchorEl((prev) => ({ ...prev, [item.text]: null }))}
                                                        onMouseEnter={() => subItem.path && prefetchPage(subItem.path)}
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
                                            onMouseEnter={() => item.path && prefetchPage(item.path)}
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

            <MobileMenu
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={navItems}
                isAuthenticated={isAuthenticated}
                user={user}
            />
        </>
    );
};

export default Navbar;
