import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    alpha,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = React.useState({
        lookingFor: 'bride',
        ageFrom: '21',
        ageTo: '30',
        religion: '',
        location: '',
    });

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: '100vh', md: '90vh' },
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: { md: 'fixed' },
                    zIndex: -1,
                    opacity: 0.3,
                },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{ textAlign: 'center', color: 'white' }}
                >
                    {/* Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                            mb: 2,
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            lineHeight: 1.2,
                        }}
                    >
                        Find Your Perfect Match
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 6,
                            opacity: 0.95,
                            fontWeight: 400,
                            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        }}
                    >
                        Trusted by millions to find their life partner
                    </Typography>

                    {/* Advanced Search Form */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        sx={{
                            maxWidth: 900,
                            mx: 'auto',
                            p: { xs: 3, sm: 4 },
                            borderRadius: 4,
                            background: alpha('#ffffff', 0.95),
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 2,
                                alignItems: 'stretch',
                            }}
                        >
                            {/* Looking For */}
                            <FormControl fullWidth sx={{ flex: 1 }}>
                                <InputLabel>Looking for</InputLabel>
                                <Select
                                    value={searchData.lookingFor}
                                    label="Looking for"
                                    onChange={(e) => setSearchData({ ...searchData, lookingFor: e.target.value })}
                                >
                                    <MenuItem value="bride">Bride</MenuItem>
                                    <MenuItem value="groom">Groom</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Age From */}
                            <FormControl fullWidth sx={{ flex: 0.7 }}>
                                <InputLabel>Age From</InputLabel>
                                <Select
                                    value={searchData.ageFrom}
                                    label="Age From"
                                    onChange={(e) => setSearchData({ ...searchData, ageFrom: e.target.value })}
                                >
                                    {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                        <MenuItem key={age} value={age.toString()}>
                                            {age}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Age To */}
                            <FormControl fullWidth sx={{ flex: 0.7 }}>
                                <InputLabel>Age To</InputLabel>
                                <Select
                                    value={searchData.ageTo}
                                    label="Age To"
                                    onChange={(e) => setSearchData({ ...searchData, ageTo: e.target.value })}
                                >
                                    {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                        <MenuItem key={age} value={age.toString()}>
                                            {age}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Religion */}
                            <FormControl fullWidth sx={{ flex: 1 }}>
                                <InputLabel>Religion</InputLabel>
                                <Select
                                    value={searchData.religion}
                                    label="Religion"
                                    onChange={(e) => setSearchData({ ...searchData, religion: e.target.value })}
                                >
                                    <MenuItem value="">Any</MenuItem>
                                    <MenuItem value="hindu">Hindu</MenuItem>
                                    <MenuItem value="muslim">Muslim</MenuItem>
                                    <MenuItem value="christian">Christian</MenuItem>
                                    <MenuItem value="sikh">Sikh</MenuItem>
                                    <MenuItem value="buddhist">Buddhist</MenuItem>
                                    <MenuItem value="jain">Jain</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Location */}
                            <TextField
                                fullWidth
                                label="Location"
                                placeholder="City, State"
                                value={searchData.location}
                                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                sx={{ flex: 1 }}
                            />

                            {/* Search Button */}
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleSearch}
                                startIcon={<SearchIcon />}
                                sx={{
                                    px: 4,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                    boxShadow: '0 8px 24px rgba(233, 30, 99, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                                        boxShadow: '0 12px 32px rgba(233, 30, 99, 0.5)',
                                    },
                                    flex: { xs: 1, md: 'auto' },
                                }}
                            >
                                Search
                            </Button>
                        </Box>

                        {/* Quick Stats */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: { xs: 2, sm: 4 },
                                mt: 3,
                                pt: 3,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flexWrap: 'wrap',
                            }}
                        >
                            {[
                                { label: 'Active Members', value: '10,000+' },
                                { label: 'Success Stories', value: '5,000+' },
                                { label: 'Countries', value: '50+' },
                            ].map((stat) => (
                                <Box key={stat.label} sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Scroll Indicator */}
                    <Box
                        component={motion.div}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        sx={{
                            mt: 8,
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                            Scroll to explore
                        </Typography>
                        <Box
                            sx={{
                                width: 30,
                                height: 50,
                                border: '2px solid white',
                                borderRadius: 20,
                                mx: 'auto',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 8,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: 'white',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;
