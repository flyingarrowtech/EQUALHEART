import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Slider,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
    Stack,
    Divider,
} from '@mui/material';
import {
    FilterList,
    Close,
    RestartAlt,
    Search as SearchIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import ProfileCard from '../../components/common/ProfileCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import userApi from '../../api/userApi';
import { useNotificationStore } from '../../store/useNotificationStore';

const DISABILITY_TYPES = [
    'None',
    'Blindness',
    'Low-vision',
    'Leprosy Cured Persons',
    'Hearing Impairment',
    'Locomotor Disability',
    'Dwarfism',
    'Intellectual Disability',
    'Mental Illness',
    'Autism Spectrum Disorder',
    'Cerebral Palsy',
    'Muscular Dystrophy',
    'Chronic Neurological Conditions',
    'Specific Learning Disabilities',
    'Multiple Sclerosis',
    'Speech and Language Disability',
    'Thalassemia',
    'Hemophilia',
    'Sickle Cell Disease',
    'Multiple Disabilities',
    'Acid Attack Victim',
    'Parkinson\'s Disease'
];

const Search: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { showToast } = useNotificationStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    // Filter States
    const [filters, setFilters] = useState({
        minAge: 18,
        maxAge: 40,
        gender: '',
        religion: '',
        maritalStatus: '',
        country: '',
        state: '',
        city: '',
        highestEducation: '',
        occupation: '',
        minIncome: 0,
        maxIncome: 10000000,
        dietaryHabits: '',
        smoking: '',
        drinking: '',
        disabilityType: '',
    });

    const fetchResults = useCallback(async () => {
        setLoading(true);
        try {
            // Map frontend filter names to backend expected names
            const searchParams = {
                ageMin: filters.minAge,
                ageMax: filters.maxAge,
                gender: filters.gender || undefined,
                religion: filters.religion || undefined,
                maritalStatus: filters.maritalStatus || undefined,
                country: filters.country || undefined,
                state: filters.state || undefined,
                city: filters.city || undefined,
                highestEducation: filters.highestEducation || undefined,
                occupation: filters.occupation || undefined,
                incomeMin: filters.minIncome || undefined,
                incomeMax: filters.maxIncome || undefined,
                dietaryHabits: filters.dietaryHabits || undefined,
                smoking: filters.smoking || undefined,
                drinking: filters.drinking || undefined,
                disabilityType: filters.disabilityType || undefined,
            };
            const response = await userApi.searchProfiles(searchParams);
            setResults(response.data || []);
        } catch (err) {
            console.error('Search failed', err);
            showToast('Search failed. Please try again.', 'error');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    const handleFilterChange = (field: string, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFilters({
            minAge: 18,
            maxAge: 40,
            gender: '',
            religion: '',
            maritalStatus: '',
            country: '',
            state: '',
            city: '',
            highestEducation: '',
            occupation: '',
            minIncome: 0,
            maxIncome: 10000000,
            dietaryHabits: '',
            smoking: '',
            drinking: '',
            disabilityType: '',
        });
    };

    const FilterContent = (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                    Filters
                </Typography>
                <Button
                    startIcon={<RestartAlt />}
                    onClick={handleReset}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                >
                    Reset
                </Button>
            </Box>

            <Stack spacing={3}>
                {/* Age Range */}
                <Box>
                    <Typography gutterBottom fontWeight={600}>
                        Age Range: {filters.minAge} - {filters.maxAge}
                    </Typography>
                    <Slider
                        value={[filters.minAge, filters.maxAge]}
                        onChange={(_, newValue) => {
                            const [min, max] = newValue as number[];
                            setFilters((prev) => ({ ...prev, minAge: min, maxAge: max }));
                        }}
                        valueLabelDisplay="auto"
                        min={18}
                        max={70}
                        sx={{ color: '#e91e63' }}
                    />
                </Box>

                {/* Gender */}
                <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        value={filters.gender}
                        label="Gender"
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>

                {/* Religion */}
                <FormControl fullWidth size="small">
                    <InputLabel>Religion</InputLabel>
                    <Select
                        value={filters.religion}
                        label="Religion"
                        onChange={(e) => handleFilterChange('religion', e.target.value)}
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="Hindu">Hindu</MenuItem>
                        <MenuItem value="Muslim">Muslim</MenuItem>
                        <MenuItem value="Christian">Christian</MenuItem>
                        <MenuItem value="Sikh">Sikh</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                {/* Marital Status */}
                <FormControl fullWidth size="small">
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                        value={filters.maritalStatus}
                        label="Marital Status"
                        onChange={(e) => handleFilterChange('maritalStatus', e.target.value)}
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="Never Married">Never Married</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                    </Select>
                </FormControl>

                {/* Location */}
                <TextField
                    label="Country"
                    size="small"
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="City"
                    size="small"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    fullWidth
                />

                <Divider textAlign="left"><Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>PROFESSIONAL</Typography></Divider>

                {/* Education */}
                <TextField
                    label="Education"
                    size="small"
                    value={filters.highestEducation}
                    onChange={(e) => handleFilterChange('highestEducation', e.target.value)}
                    fullWidth
                />

                {/* Occupation */}
                <TextField
                    label="Occupation"
                    size="small"
                    value={filters.occupation}
                    onChange={(e) => handleFilterChange('occupation', e.target.value)}
                    fullWidth
                />

                {/* Income Range */}
                <Box>
                    <Typography gutterBottom variant="body2" fontWeight={600}>
                        Annual Income (in Lakhs)
                    </Typography>
                    <Slider
                        value={[filters.minIncome / 100000, filters.maxIncome / 100000]}
                        onChange={(_, newValue) => {
                            const [min, max] = newValue as number[];
                            setFilters((prev) => ({ ...prev, minIncome: min * 100000, maxIncome: max * 100000 }));
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{ color: '#e91e63' }}
                    />
                </Box>

                <Divider textAlign="left"><Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>LIFESTYLE</Typography></Divider>

                {/* Dietary Habits */}
                <FormControl fullWidth size="small">
                    <InputLabel>Diet</InputLabel>
                    <Select
                        value={filters.dietaryHabits}
                        label="Diet"
                        onChange={(e) => handleFilterChange('dietaryHabits', e.target.value)}
                    >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                        <MenuItem value="Eggetarian">Eggetarian</MenuItem>
                    </Select>
                </FormControl>

                {/* Smoking/Drinking */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Smoking</InputLabel>
                        <Select
                            value={filters.smoking}
                            label="Smoking"
                            onChange={(e) => handleFilterChange('smoking', e.target.value)}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                            <MenuItem value="Occasionally">Occasionally</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel>Drinking</InputLabel>
                        <Select
                            value={filters.drinking}
                            label="Drinking"
                            onChange={(e) => handleFilterChange('drinking', e.target.value)}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                            <MenuItem value="Occasionally">Occasionally</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Divider textAlign="left"><Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>DIVYANGJAN</Typography></Divider>

                {/* Disability Type */}
                <FormControl fullWidth size="small">
                    <InputLabel>Disability Type</InputLabel>
                    <Select
                        value={filters.disabilityType}
                        label="Disability Type"
                        onChange={(e) => handleFilterChange('disabilityType', e.target.value)}
                    >
                        <MenuItem value="">Any</MenuItem>
                        {DISABILITY_TYPES.filter(d => d !== 'None').map(d => (
                            <MenuItem key={d} value={d}>{d}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SearchIcon />}
                    onClick={fetchResults}
                    sx={{
                        bgcolor: '#e91e63',
                        '&:hover': { bgcolor: '#c2185b' },
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    Apply Filters
                </Button>
            </Stack>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh' }}>
            <PageHeader
                title="Find Your Match"
                subtitle="Search through thousands of verified profiles to find your perfect partner."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80"
            />

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, gap: 4 }}>
                    {/* Filters - Desktop */}
                    {!isMobile && (
                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'auto' } }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    position: 'sticky',
                                    top: 24,
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                {FilterContent}
                            </Paper>
                        </Box>
                    )}

                    {/* Results */}
                    <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
                        {/* Mobile Filter Toggle */}
                        {isMobile && (
                            <Button
                                startIcon={<FilterList />}
                                variant="outlined"
                                fullWidth
                                onClick={() => setMobileOpen(true)}
                                sx={{ mb: 3 }}
                            >
                                Show Filters
                            </Button>
                        )}

                        {/* Results Count */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight={700}>
                                {loading ? 'Searching...' : `${results.length} Profiles Found`}
                            </Typography>
                        </Box>

                        {loading ? (
                            <LoadingState type="skeleton-cards" count={6} />
                        ) : results.length === 0 ? (
                            <EmptyState
                                type="search"
                                title="No Profiles Found"
                                message="Try adjusting your filters to see more results."
                                ctaButton={{ label: 'Clear Filters', onClick: handleReset }}
                            />
                        ) : (
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
                                <AnimatePresence>
                                    {results.map((profile, index) => (
                                        <Box key={profile._id || index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <ProfileCard profile={profile} />
                                            </motion.div>
                                        </Box>
                                    ))}
                                </AnimatePresence>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: { width: 300 },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton onClick={() => setMobileOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider />
                {FilterContent}
            </Drawer>
        </Box>
    );
};

export default Search;
