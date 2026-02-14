import React, { useState, useEffect, useRef } from 'react';
import {
    AppBar,
    Typography,
    Button,
    Box,
    Container,
    Menu,
    MenuItem,
    Avatar,
    IconButton,
    alpha,
    ListItemText,
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
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
        handleScroll(); // Check once on mount
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

    const quotes = [
        "Love is not about finding the perfect person, but learning to see an imperfect person perfectly.",
        "A successful marriage requires falling in love many times, always with the same person.",
        "The best thing to hold onto in life is each other.",
        "Marriage is a mosaic you build with your spouse. Millions of tiny moments that create your love story.",
    ];

    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const TopBar = () => (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 0.8,
                display: { xs: 'none', sm: 'block' },
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MailOutlineIcon sx={{ fontSize: '0.9rem' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                                info@equalheart.com
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, borderLeft: '1px solid rgba(255,255,255,0.2)', pl: 3 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, opacity: 0.9 }}>
                                TRUSTED BY MILLIONS WORLDWIDE
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton size="small" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            <FacebookIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            <InstagramIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            <LinkedInIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );

    const QuoteBar = () => (
        <Box
            sx={{
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                py: 0.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
                overflow: 'hidden',
                display: { xs: 'none', md: 'block' }
            }}
        >
            <Container maxWidth="xl">
                <AnimatePresence mode="wait">
                    <Box
                        key={currentQuote}
                        component={motion.div}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
                    >
                        <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: '1rem', transform: 'rotate(180deg)' }} />
                        <Typography
                            variant="caption"
                            sx={{
                                fontStyle: 'italic',
                                fontWeight: 500,
                                color: 'text.secondary',
                                letterSpacing: 0.3
                            }}
                        >
                            {quotes[currentQuote]}
                        </Typography>
                        <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />
                    </Box>
                </AnimatePresence>
            </Container>
        </Box>
    );

    const handleUserMenuOpen = () => {
        setProfileSidebarOpen(true);
    };

    // Helper to safely get user photo
    const getUserPhoto = () => {
        if (!user) return '';
        // @ts-ignore
        const photos = user.photos || [];
        const mainPhoto = photos.find((p: any) => p.isMain) || photos[0];
        // Check if mainPhoto.url is already a full URL
        if (mainPhoto && mainPhoto.url) {
            if (mainPhoto.url.startsWith('http')) return mainPhoto.url;
            return `${import.meta.env.VITE_API_URL}${mainPhoto.url}`;
        }
        return '';
    };

    return (
        <>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: (theme) => theme.zIndex.appBar + 1
                }}
            >
                <Box sx={{ transition: 'margin-top 0.4s ease', mt: scrolled ? -10 : 0, opacity: scrolled ? 0 : 1 }}>
                    <TopBar />
                    <QuoteBar />
                </Box>

                <Container maxWidth="xl" sx={{ mt: scrolled ? 1 : 2 }}>
                    <Box
                        component={motion.div}
                        layout
                        transition={{
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: { xs: 2, md: 4 },
                            py: 1.5,
                            borderRadius: scrolled ? 10 : 3,
                            bgcolor: (theme) => scrolled ? theme.palette.background.glassCard : alpha(theme.palette.background.paper, 0.9),
                            backdropFilter: 'blur(20px)',
                            border: 1,
                            borderColor: (theme) => scrolled ? theme.palette.background.glassBorder : 'divider',
                            boxShadow: scrolled ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)' : '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        {/* Logo & Sidebar Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                component={motion.div}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <IconButton
                                    onClick={() => setMainSidebarOpen(true)}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                                        '&:hover': {
                                            opacity: 0.9,
                                            boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                                        }
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

                            <Box
                                component={Link}
                                to="/"
                                sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
                            >
                                <Typography
                                    variant="h5"
                                    noWrap
                                    sx={{
                                        fontFamily: '"Outfit", sans-serif',
                                        fontWeight: 900,
                                        letterSpacing: '-0.02em',
                                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: 1,
                                        fontSize: { xs: '1.2rem', md: '1.6rem' }
                                    }}
                                >
                                    EQUALHEART
                                </Typography>
                            </Box>

                            <MainSidebar
                                open={mainSidebarOpen}
                                onClose={() => setMainSidebarOpen(false)}
                            />
                        </Box>

                        {/* Center Navigation (Desktop) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                            {navItems.map((item) => (
                                <Box key={item.text}
                                    sx={{ position: 'relative' }}
                                    onMouseEnter={(e) => {
                                        item.subItems && handleMouseEnter(e, item.text);
                                        if (item.path) prefetchPage(item.path);
                                    }}
                                    onMouseLeave={() => item.subItems && handleMouseLeave(item.text)}
                                >
                                    <Button
                                        component={item.path ? Link : 'button'}
                                        {...(item.path ? { to: item.path } : {})}
                                        endIcon={item.subItems ? <KeyboardArrowDownIcon sx={{ fontSize: '1rem', transition: 'transform 0.3s ease', transform: anchorEl[item.text] ? 'rotate(180deg)' : 'none' }} /> : null}
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            px: 2,
                                            py: 1,
                                            borderRadius: 100,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                color: 'primary.main',
                                                transform: 'translateY(-1px)'
                                            },
                                        }}
                                    >
                                        {item.text}
                                    </Button>

                                    <AnimatePresence>
                                        {anchorEl[item.text] && (
                                            <Menu
                                                anchorEl={anchorEl[item.text]}
                                                open={Boolean(anchorEl[item.text])}
                                                onClose={() => handleMenuMouseLeave(item.text)}
                                                MenuListProps={{
                                                    onMouseEnter: () => handleMenuMouseEnter(item.text),
                                                    onMouseLeave: () => handleMenuMouseLeave(item.text),
                                                }}
                                                PaperProps={{
                                                    component: motion.div,
                                                    initial: { opacity: 0, y: 15 },
                                                    animate: { opacity: 1, y: 0 },
                                                    exit: { opacity: 0, y: 15 },
                                                    transition: { duration: 0.2 },
                                                    sx: {
                                                        mt: 1.2,
                                                        bgcolor: 'background.glassCard',
                                                        backdropFilter: 'blur(20px)',
                                                        border: 1,
                                                        borderColor: 'background.glassBorder',
                                                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                                                        borderRadius: 3,
                                                        minWidth: 220,
                                                        p: 1,
                                                        overflow: 'visible'
                                                    }
                                                }}
                                                keepMounted
                                            >
                                                <Box sx={{ p: 1, mb: 0.5 }}>
                                                    <Typography variant="overline" color="text.secondary" fontWeight={800} sx={{ px: 1, letterSpacing: 1.5 }}>
                                                        {item.text}
                                                    </Typography>
                                                </Box>
                                                {item.subItems?.map((subItem) => (
                                                    <MenuItem
                                                        key={subItem.text}
                                                        component={Link}
                                                        to={subItem.path || '#'}
                                                        onClick={() => setAnchorEl((prev) => ({ ...prev, [item.text]: null }))}
                                                        onMouseEnter={() => subItem.path && prefetchPage(subItem.path)}
                                                        sx={{
                                                            gap: 2,
                                                            py: 1.5,
                                                            px: 2,
                                                            borderRadius: 2,
                                                            fontSize: '0.9rem',
                                                            fontWeight: 600,
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                                                color: 'primary.main',
                                                                transform: 'translateX(5px)'
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ color: 'primary.main', display: 'flex' }}>
                                                            {subItem.icon}
                                                        </Box>
                                                        <ListItemText primary={subItem.text} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            ))}
                        </Box>

                        {/* Right Section: Theme & Profile */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
                            <ThemeToggler />

                            {isAuthenticated && user ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box
                                        component={motion.div}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={handleUserMenuOpen}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            bgcolor: (theme) => alpha(theme.palette.background.glassSidebar, 0.5),
                                            px: 1,
                                            py: 0.5,
                                            pr: 2,
                                            borderRadius: 100,
                                            border: 1,
                                            borderColor: 'background.glassBorder',
                                        }}
                                    >
                                        <Avatar
                                            src={getUserPhoto()}
                                            alt={user.fullName?.firstName}
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                border: 2,
                                                borderColor: 'primary.main',
                                                mr: 1.5,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {user.fullName?.firstName?.charAt(0)}
                                        </Avatar>
                                        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                                            <Box
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 1,
                                                    borderRadius: 1,
                                                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                    mb: 0.2
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ color: 'white', fontWeight: 900, fontSize: '0.6rem', letterSpacing: 0.5 }}>
                                                    ADVISOR
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.1, color: 'text.primary' }}>
                                                {user.fullName?.firstName}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <ProfileSidebar
                                        open={profileSidebarOpen}
                                        onClose={() => setProfileSidebarOpen(false)}
                                    />
                                </Box>
                            ) : (
                                <Box
                                    component={motion.div}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="contained"
                                        sx={{
                                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            color: 'white',
                                            fontWeight: 800,
                                            borderRadius: 50,
                                            px: 4,
                                            py: 1,
                                            boxShadow: '0 8px 16px rgba(233, 30, 99, 0.3)',
                                        }}
                                    >
                                        LOGIN
                                    </Button>
                                </Box>
                            )}

                            {/* Mobile Menu Toggle */}
                            <IconButton
                                sx={{
                                    display: { md: 'none' },
                                    color: 'primary.main',
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                                    '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }
                                }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Box>
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
