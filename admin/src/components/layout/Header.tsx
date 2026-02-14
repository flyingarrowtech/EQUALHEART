import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Box,
    Badge,
    Avatar,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

interface HeaderProps {
    handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                {/* Mobile menu button */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Search Bar */}
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.common.black, 0.05),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.common.black, 0.08),
                        },
                        marginRight: 2,
                        marginLeft: 0,
                        width: '100%',
                        maxWidth: { xs: '100%', sm: 400 },
                    }}
                >
                    <Box
                        sx={{
                            padding: theme.spacing(0, 2),
                            height: '100%',
                            position: 'absolute',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                    </Box>
                    <InputBase
                        placeholder="Search here"
                        sx={{
                            color: 'inherit',
                            width: '100%',
                            '& .MuiInputBase-input': {
                                padding: theme.spacing(1.5, 1, 1.5, 0),
                                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                transition: theme.transitions.create('width'),
                                width: '100%',
                            },
                        }}
                    />
                </Box>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Right Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>

                    <IconButton color="inherit">
                        <PersonIcon />
                    </IconButton>

                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'primary.main',
                            ml: 1,
                            display: { xs: 'none', sm: 'flex' },
                        }}
                    >
                        A
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
