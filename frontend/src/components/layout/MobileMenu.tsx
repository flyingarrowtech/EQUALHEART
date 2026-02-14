import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Avatar,
    Divider,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    ListItemIcon,
    alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
    navItems: any[];
    isAuthenticated: boolean;
    user: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, navItems, isAuthenticated }) => {
    const navigate = useNavigate();
    const mainColor = '#B88E2F';
    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

    const handleSubMenuClick = (text: string) => {
        setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 350 }, p: 3, display: 'flex', flexDirection: 'column' }
            }}
        >
            {/* Header / Close Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: mainColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}
                    >
                        <FavoriteIcon fontSize="small" />
                    </Box>
                    <Typography variant="h6" fontWeight={800} sx={{ fontFamily: '"Cinzel", serif' }}>
                        EQUAL<Box component="span" sx={{ color: mainColor }}>HEART</Box>
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: '#e91e63' }}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Navigation Items */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                <List component="nav">
                    {navItems.map((item) => (
                        <React.Fragment key={item.text}>
                            {item.subItems ? (
                                <>
                                    <ListItemButton onClick={() => handleSubMenuClick(item.text)}>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{ fontWeight: 600, color: '#444' }}
                                        />
                                        {openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openSubMenus[item.text]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.subItems.map((subItem: any) => (
                                                <ListItemButton
                                                    key={subItem.text}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleNavigation(subItem.path)}
                                                >
                                                    {subItem.icon && (
                                                        <ListItemIcon sx={{ minWidth: 36, color: mainColor }}>
                                                            {subItem.icon}
                                                        </ListItemIcon>
                                                    )}
                                                    <ListItemText primary={subItem.text} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            ) : (
                                <ListItemButton onClick={() => handleNavigation(item.path || '#')}>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{ fontWeight: 600, color: '#444' }}
                                    />
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    ))}

                    {!isAuthenticated && (
                        <ListItemButton onClick={() => handleNavigation('/login')} sx={{ mt: 1, border: `1px solid ${mainColor}`, borderRadius: 1 }}>
                            <ListItemText
                                primary="Login"
                                primaryTypographyProps={{ fontWeight: 700, color: mainColor, textAlign: 'center' }}
                            />
                        </ListItemButton>
                    )}
                </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Support Team Section (Intro Card) - Always Visible */}
            <Box sx={{ textAlign: 'center', mt: 'auto', pt: 2 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1} display="block" mb={2}>
                    SUPPORT TEAM
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left', bgcolor: '#f9f9f9', p: 2, borderRadius: 2 }}>
                    <Avatar
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                        sx={{ width: 60, height: 60, border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333', lineHeight: 1.2 }}>
                            Ashley emyy
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Senior personal advisor
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                color: mainColor,
                                borderColor: mainColor,
                                textTransform: 'none',
                                px: 1.5,
                                py: 0.2,
                                borderRadius: 1,
                                fontSize: '0.7rem',
                                '&:hover': { bgcolor: alpha(mainColor, 0.05), borderColor: mainColor }
                            }}
                        >
                            Ask your doubts
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};



export default MobileMenu;
