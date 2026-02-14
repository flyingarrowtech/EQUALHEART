import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    ExpandLess,
    ExpandMore,
    Search as SearchIcon,
    Payment as PaymentIcon,
    Settings as SettingsIcon,
    Palette as PaletteIcon,
    Article as ArticleIcon,
    Help as HelpIcon,
    FileDownload as ExportIcon,
    Extension as ExtensionIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    CreditCard,
    AttachMoney,
    Image,
    Home,
    FilterList,
    Pages,
    Update,
    Email,
} from '@mui/icons-material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard',
    },
    {
        label: 'Users',
        icon: <PeopleIcon />,
        path: '/users',
    },
    {
        label: 'SEO Settings',
        icon: <SearchIcon />,
        children: [
            { label: 'SEO Settings', icon: <SearchIcon />, path: '/seo' },
        ],
    },
    {
        label: 'Payments',
        icon: <PaymentIcon />,
        children: [
            { label: 'All Payments', icon: <CreditCard />, path: '/payments' },
            { label: 'Pricing Plans', icon: <AttachMoney />, path: '/pricing' },
            { label: 'Payment Gateway', icon: <PaymentIcon />, path: '/payment-gateway' },
        ],
    },
    {
        label: 'Settings',
        icon: <SettingsIcon />,
        children: [
            { label: 'Site Setting', icon: <SettingsIcon />, path: '/settings' },
        ],
    },
    {
        label: 'Appearance',
        icon: <PaletteIcon />,
        children: [
            { label: 'Website Logo', icon: <Image />, path: '/appearance/logo' },
            { label: 'Color Setting', icon: <PaletteIcon />, path: '/appearance/colors' },
            { label: 'Media Library', icon: <Image />, path: '/appearance/media' },
        ],
    },
    {
        label: 'CMS',
        icon: <ArticleIcon />,
        children: [
            { label: 'Home Page', icon: <Home />, path: '/cms/home' },
            { label: 'All Profile Filters', icon: <FilterList />, path: '/cms/filters' },
            { label: 'All Pages', icon: <Pages />, path: '/cms/pages' },
            { label: 'All Text Updates', icon: <Update />, path: '/cms/text' },
            { label: 'Footer', icon: <SportsFootballIcon />, path: '/cms/footer' },
            { label: 'Dummy Images', icon: <Image />, path: '/cms/images' },
            { label: 'Mail Templates', icon: <Email />, path: '/cms/mail' },
        ],
    },
    {
        label: 'Others',
        icon: <HelpIcon />,
        children: [
            { label: 'All Enquiry', icon: <HelpIcon />, path: '/enquiry' },
            { label: 'Export', icon: <ExportIcon />, path: '/export' },
        ],
    },
    {
        label: 'Template',
        icon: <ExtensionIcon />,
        children: [
            { label: 'Activation', icon: <ExtensionIcon />, path: '/template/activation' },
            { label: 'Template Updates', icon: <Update />, path: '/template/updates' },
        ],
    },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

    const handleMenuClick = (label: string, path?: string) => {
        if (path) {
            navigate(path);
            if (isMobile) {
                handleDrawerToggle();
            }
        } else {
            setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
        }
    };

    const handleLogout = () => {
        // Handle logout logic
        navigate('/login');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo/Brand */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.1rem',
                        }}
                    >
                        WEDDING
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                            color: 'text.secondary',
                            display: 'block',
                            mt: -0.5,
                        }}
                    >
                        MATRIMONY
                    </Typography>
                </Box>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle} size="small">
                        <MenuIcon />
                    </IconButton>
                )}
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, overflow: 'auto', py: 2 }}>
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleMenuClick(item.label, item.path)}
                                selected={location.pathname === item.path}
                                sx={{
                                    mx: 1,
                                    borderRadius: 2,
                                    mb: 0.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.contrastText',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                    }}
                                />
                                {item.children && (
                                    openMenus[item.label] ? <ExpandLess /> : <ExpandMore />
                                )}
                            </ListItemButton>
                        </ListItem>

                        {/* Submenu */}
                        {item.children && (
                            <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child) => (
                                        <ListItem key={child.label} disablePadding>
                                            <ListItemButton
                                                onClick={() => handleMenuClick(child.label, child.path)}
                                                selected={location.pathname === child.path}
                                                sx={{
                                                    pl: 4,
                                                    mx: 1,
                                                    borderRadius: 2,
                                                    mb: 0.5,
                                                    '&.Mui-selected': {
                                                        bgcolor: 'primary.light',
                                                        color: 'primary.contrastText',
                                                        '&:hover': {
                                                            bgcolor: 'primary.main',
                                                        },
                                                        '& .MuiListItemIcon-root': {
                                                            color: 'primary.contrastText',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                                                    {child.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={child.label}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.85rem',
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>

            {/* Sign Out */}
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 1 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2,
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.light',
                            color: 'error.contrastText',
                            '& .MuiListItemIcon-root': {
                                color: 'error.contrastText',
                            },
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sign Out"
                        primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                        }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid',
                        borderColor: 'divider',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
