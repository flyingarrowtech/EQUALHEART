import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container, Paper, Tabs, Tab, Box, Typography, TextField,
    Button, MenuItem, CircularProgress, Alert, Divider,
    IconButton, Avatar, Tooltip, Chip, useTheme, useMediaQuery,
    Card, CardMedia, Fade, alpha
} from '@mui/material';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import userApi from '../../api/userApi';
import {
    Delete as DeleteIcon,
    Save as SaveIcon,
    CloudUpload as UploadIcon,
    Person as PersonIcon,
    LocationOn as LocationIcon,
    Public as PublicIcon,
    Work as WorkIcon,
    FamilyRestroom as FamilyIcon,
    Restaurant as LifestyleIcon,
    Wc as GenderIcon,
    Favorite as FavoriteIcon,
    PhotoLibrary as PhotoIcon,
    StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';

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

// --- Zod Schema ---
const profileSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(2, 'First name is too short'),
        lastName: z.string().min(2, 'Last name is too short'),
    }),
    profileCreatedFor: z.enum(['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative']),
    gender: z.enum(['Male', 'Female', 'Transgender']),
    dateOfBirth: z.string(),
    maritalStatus: z.enum(['Never Married', 'Divorced', 'Widowed', 'Separated']),
    motherTongue: z.string().min(2),
    religion: z.string().min(2),
    community: z.string().optional(),
    caste: z.string().optional(),
    subCaste: z.string().optional(),
    nakshatram: z.string().optional(),
    rashi: z.string().optional(),
    manglik: z.enum(['Yes', 'No']),
    height: z.string(),
    bodyType: z.string(),
    complexion: z.string(),
    isDisabled: z.union([z.boolean(), z.string().transform(v => v === 'true')]),
    disabilityType: z.string().optional(),
    disabilityDescription: z.string().optional(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    citizenship: z.string(),
    nativePlace: z.string().optional(),
    residentialType: z.enum(['Own', 'Rented']),
    nriStatus: z.union([z.boolean(), z.string().transform(v => v === 'true')]),
    highestEducation: z.string(),
    collegeName: z.string().optional(),
    professionalQualification: z.string().optional(),
    occupation: z.string(),
    annualIncome: z.preprocess((val) => Number(val), z.number()),
    officeAddress: z.string().optional(),
    officePhoneNumber: z.string().optional(),
    fatherName: z.string(),
    fatherOccupation: z.string(),
    gotra: z.string().optional(),
    motherName: z.string(),
    motherOccupation: z.string(),
    numberOfSiblings: z.object({
        brothers: z.object({
            married: z.preprocess((val) => Number(val), z.number()),
            unmarried: z.preprocess((val) => Number(val), z.number())
        }),
        sisters: z.object({
            married: z.preprocess((val) => Number(val), z.number()),
            unmarried: z.preprocess((val) => Number(val), z.number())
        }),
    }),
    familyType: z.enum(['Joint Family', 'Nuclear Family']),
    familyValues: z.enum(['Traditional', 'Modern', 'Moderate']),
    familyFinancialStatus: z.string(),
    dietaryHabits: z.enum(['Vegetarian', 'Non-Vegetarian', 'Eggetarian']),
    smoking: z.enum(['Yes', 'No', 'Occasionally']),
    drinking: z.enum(['Yes', 'No', 'Occasionally']),
    interestsString: z.string().optional(),
    hobbiesString: z.string().optional(),
    aboutMe: z.string().min(20, 'Please write at least 20 characters about yourself'),
    partnerPreferences: z.object({
        ageRange: z.object({
            min: z.preprocess((val) => Number(val), z.number()),
            max: z.preprocess((val) => Number(val), z.number())
        }).optional(),
        heightRange: z.object({ min: z.string(), max: z.string() }).optional(),
        religions: z.array(z.string()).optional(),
        locations: z.array(z.string()).optional(),
    }).optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// --- Components ---

const TabPanel: React.FC<{ children?: React.ReactNode; index: number; value: number }> = ({ children, value, index }) => (
    <AnimatePresence mode="wait">
        {value === index && (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%' }}
            >
                <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>
            </motion.div>
        )}
    </AnimatePresence>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>{icon}</Avatar>
        <Typography variant="h5" fontWeight="600" color="text.primary">{title}</Typography>
    </Box>
);

const GlassPaper: React.FC<{ children: React.ReactNode, sx?: any }> = ({ children, sx = {} }) => (
    <Paper elevation={0} sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 4,
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        ...sx
    }}>
        {children}
    </Paper>
);

const ProfileEdit: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    // Determine initial tab based on URL
    const getInitialTab = () => {
        if (location.pathname === '/profile/preferences') return 7; // Index for Preferences tab
        return 0;
    };

    const [tabValue, setTabValue] = useState(getInitialTab());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema) as Resolver<ProfileFormValues>,
        defaultValues: {
            isDisabled: false,
            nriStatus: false,
            interestsString: '',
            hobbiesString: '',
            numberOfSiblings: {
                brothers: { married: 0, unmarried: 0 },
                sisters: { married: 0, unmarried: 0 }
            }
        }
    });

    const isDisabled = watch('isDisabled');

    const calculateCompletion = (data: any) => {
        const fields = [
            data.email, data.fullName?.firstName, data.fullName?.lastName, data.gender, data.dateOfBirth,
            data.height, data.maritalStatus, data.motherTongue, data.religion,
            data.country, data.state, data.city, data.citizenship,
            data.caste, data.manglik,
            data.highestEducation, data.occupation,
            data.fatherName, data.motherName, data.familyType, data.familyValues,
            data.dietaryHabits, data.smoking, data.drinking, data.aboutMe,
            data.bodyType, data.complexion,
            data.photos?.length > 0
        ];
        const filledFields = fields.filter(f => f !== undefined && f !== null && f !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const fetchProfile = async () => {
        try {
            const response = await userApi.getProfile();
            const data = response.data;
            setProfile(data);
            setCompletionPercentage(calculateCompletion(data));

            const formData = {
                ...data,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
                interestsString: data.interests?.join(', ') || '',
                hobbiesString: data.hobbies?.join(', ') || '',
                numberOfSiblings: data.numberOfSiblings || {
                    brothers: { married: 0, unmarried: 0 },
                    sisters: { married: 0, unmarried: 0 }
                },
                partnerPreferences: data.partnerPreferences || {
                    ageRange: { min: 18, max: 40 },
                    heightRange: { min: "4'0\"", max: "7'0\"" }
                }
            };
            reset(formData);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load profile data' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [reset]);

    const onSubmit = async (data: ProfileFormValues) => {
        setSaving(true);
        setMessage(null);
        try {
            const { _id, email, kycStatus, isVerified, role, createdAt, updatedAt, __v, ...cleanData } = data as any;

            const payload = {
                ...cleanData,
                interests: cleanData.interestsString ? cleanData.interestsString.split(',').map((s: string) => s.trim()) : [],
                hobbies: cleanData.hobbiesString ? cleanData.hobbiesString.split(',').map((s: string) => s.trim()) : [],
            };
            delete (payload as any).interestsString;
            delete (payload as any).hobbiesString;

            await userApi.updateProfile(payload);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            fetchProfile();
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoAction = async (action: 'upload' | 'delete' | 'main', photoId?: string, files?: FileList) => {
        setSaving(true);
        try {
            if (action === 'upload' && files?.length) {
                await userApi.uploadPhotos(Array.from(files));
                setMessage({ type: 'success', text: 'Photos uploaded!' });
            } else if (action === 'delete' && photoId) {
                await userApi.deletePhoto(photoId);
                setMessage({ type: 'success', text: 'Photo deleted' });
            } else if (action === 'main' && photoId) {
                await userApi.setMainPhoto(photoId);
                setMessage({ type: 'success', text: 'Main photo updated' });
            }
            await fetchProfile();
        } catch (err) {
            setMessage({ type: 'error', text: 'Action failed' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" color="text.secondary">Loading Profile...</Typography>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Edit Profile"
                subtitle="Keep your profile updated to get the best matches."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1598257006626-48b0c252070d?w=1920&q=80"
                ctaButton={{ label: 'View Public Profile', onClick: () => window.open('/profile/' + profile?._id, '_blank') }}
            />

            <Container maxWidth="xl" sx={{ mt: -6 }}>
                <Box sx={{ position: 'relative', zIndex: 2, mb: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'white', p: 3, borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant="determinate"
                            value={completionPercentage}
                            size={64}
                            thickness={4}
                            sx={{
                                color: completionPercentage < 50 ? '#ff9800' : completionPercentage < 80 ? '#2196f3' : '#4caf50'
                            }}
                        />
                        <Box sx={{
                            top: 0, left: 0, bottom: 0, right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography variant="caption" fontWeight="bold" color="text.secondary" fontSize={14}>
                                {completionPercentage}%
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="700">
                            Profile Completeness
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {completionPercentage < 50 ? 'Complete your profile to get better matches!' :
                                completionPercentage < 80 ? "You're doing great! Keep going!" :
                                    'Excellent! Your profile is almost complete!'}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                        gap: 4,
                        alignItems: 'start'
                    }}
                >
                    <Box>
                        <GlassPaper sx={{ p: 1 }}>
                            <Tabs
                                orientation={isMobile ? 'horizontal' : 'vertical'}
                                variant="scrollable"
                                value={tabValue}
                                onChange={(_, v) => setTabValue(v)}
                                sx={{
                                    borderRight: isMobile ? 0 : 1,
                                    borderBottom: isMobile ? 1 : 0,
                                    borderColor: 'divider',
                                    '& .MuiTab-root': {
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        borderRadius: 2,
                                        mb: isMobile ? 0 : 1,
                                        mr: isMobile ? 1 : 0,
                                        py: 2,
                                        px: 3,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        '&.Mui-selected': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                                            color: 'primary.main',
                                            fontWeight: 700
                                        }
                                    }
                                }}
                            >
                                <Tab icon={<PersonIcon sx={{ mr: 2 }} />} iconPosition="start" label="Personal" />
                                <Tab icon={<LocationIcon sx={{ mr: 2 }} />} iconPosition="start" label="Location" />
                                <Tab icon={<PublicIcon sx={{ mr: 2 }} />} iconPosition="start" label="Religious" />
                                <Tab icon={<WorkIcon sx={{ mr: 2 }} />} iconPosition="start" label="Professional" />
                                <Tab icon={<FamilyIcon sx={{ mr: 2 }} />} iconPosition="start" label="Family" />
                                <Tab icon={<LifestyleIcon sx={{ mr: 2 }} />} iconPosition="start" label="Lifestyle" />
                                <Tab icon={<GenderIcon sx={{ mr: 2 }} />} iconPosition="start" label="Physical" />
                                <Tab icon={<FavoriteIcon sx={{ mr: 2 }} />} iconPosition="start" label="Preferences" />
                                <Tab icon={<PhotoIcon sx={{ mr: 2 }} />} iconPosition="start" label="Photos" />
                            </Tabs>
                        </GlassPaper>
                    </Box>

                    <Box>
                        <form onSubmit={handleSubmit(onSubmit as any)}>
                            <GlassPaper sx={{ position: 'relative', minHeight: '600px' }}>
                                {message && (
                                    <Fade in={!!message}>
                                        <Box p={3} pb={0}>
                                            <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ borderRadius: 3 }}>
                                                {message.text}
                                            </Alert>
                                        </Box>
                                    </Fade>
                                )}

                                <TabPanel value={tabValue} index={0}>
                                    <SectionTitle icon={<PersonIcon />} title="Personal Details" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                        <TextField fullWidth label="First Name" {...register('fullName.firstName')} error={!!errors.fullName?.firstName} helperText={errors.fullName?.firstName?.message} />
                                        <TextField fullWidth label="Last Name" {...register('fullName.lastName')} error={!!errors.fullName?.lastName} helperText={errors.fullName?.lastName?.message} />
                                        <TextField fullWidth select label="Profile Created For" {...register('profileCreatedFor')}>
                                            {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <TextField fullWidth select label="Gender" {...register('gender')}>
                                            {['Male', 'Female', 'Transgender'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} {...register('dateOfBirth')} />
                                        <TextField fullWidth select label="Marital Status" {...register('maritalStatus')}>
                                            {['Never Married', 'Divorced', 'Widowed', 'Separated'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <TextField fullWidth label="Mother Tongue" {...register('motherTongue')} />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={1}>
                                    <SectionTitle icon={<LocationIcon />} title="Location Details" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                        <TextField fullWidth label="Country" {...register('country')} />
                                        <TextField fullWidth label="State" {...register('state')} />
                                        <TextField fullWidth label="City" {...register('city')} />
                                        <TextField fullWidth label="Citizenship" {...register('citizenship')} />
                                        <TextField fullWidth label="Native Place" {...register('nativePlace')} />
                                        <TextField fullWidth select label="Residential Type" {...register('residentialType')}>
                                            <MenuItem value="Own">Own House</MenuItem>
                                            <MenuItem value="Rented">Rented</MenuItem>
                                        </TextField>
                                        <TextField fullWidth select label="NRI Status" {...register('nriStatus')}>
                                            <MenuItem value="false">No</MenuItem>
                                            <MenuItem value="true">Yes</MenuItem>
                                        </TextField>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={2}>
                                    <SectionTitle icon={<PublicIcon />} title="Religion & Community" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}><TextField fullWidth label="Religion" {...register('religion')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}><TextField fullWidth label="Community" {...register('community')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}><TextField fullWidth label="Caste" {...register('caste')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}><TextField fullWidth label="Sub-Caste" {...register('subCaste')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}><TextField fullWidth label="Gotra" {...register('gotra')} /></Box>
                                        <Box sx={{ gridColumn: 'span 1' }}><TextField fullWidth label="Nakshatram" {...register('nakshatram')} /></Box>
                                        <Box sx={{ gridColumn: 'span 1' }}><TextField fullWidth label="Rashi" {...register('rashi')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                                            <TextField fullWidth select label="Manglik" {...register('manglik')}>
                                                <MenuItem value="Yes">Yes</MenuItem>
                                                <MenuItem value="No">No</MenuItem>
                                            </TextField>
                                        </Box>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={3}>
                                    <SectionTitle icon={<WorkIcon />} title="Education & Career" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                        <TextField fullWidth label="Highest Education" {...register('highestEducation')} />
                                        <TextField fullWidth label="College/University" {...register('collegeName')} />
                                        <TextField fullWidth label="Professional Qualification" {...register('professionalQualification')} />
                                        <TextField fullWidth label="Occupation" {...register('occupation')} />
                                        <TextField fullWidth label="Annual Income" type="number" {...register('annualIncome')} />
                                        <Box sx={{ gridColumn: '1 / -1' }}><TextField fullWidth label="Office Address" {...register('officeAddress')} /></Box>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={4}>
                                    <SectionTitle icon={<FamilyIcon />} title="Family Details" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 3 }}>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}><TextField fullWidth label="Father's Name" {...register('fatherName')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}><TextField fullWidth label="Father's Occupation" {...register('fatherOccupation')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}><TextField fullWidth label="Mother's Name" {...register('motherName')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}><TextField fullWidth label="Mother's Occupation" {...register('motherOccupation')} /></Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}><Divider textAlign="left"><Chip label="Siblings Info" /></Divider></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}><TextField fullWidth label="Brothers (Unmarried)" type="number" {...register('numberOfSiblings.brothers.unmarried')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}><TextField fullWidth label="Brothers (Married)" type="number" {...register('numberOfSiblings.brothers.married')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}><TextField fullWidth label="Sisters (Unmarried)" type="number" {...register('numberOfSiblings.sisters.unmarried')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}><TextField fullWidth label="Sisters (Married)" type="number" {...register('numberOfSiblings.sisters.married')} /></Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}><Divider /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                                            <TextField fullWidth select label="Family Type" {...register('familyType')}>
                                                {['Joint Family', 'Nuclear Family'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                            </TextField>
                                        </Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                                            <TextField fullWidth select label="Family Values" {...register('familyValues')}>
                                                {['Traditional', 'Modern', 'Moderate'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                            </TextField>
                                        </Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}><TextField fullWidth label="Financial Status" {...register('familyFinancialStatus')} /></Box>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={5}>
                                    <SectionTitle icon={<LifestyleIcon />} title="Lifestyle & Hobbies" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                                        <TextField fullWidth select label="Dietary Habits" {...register('dietaryHabits')}>
                                            {['Vegetarian', 'Non-Vegetarian', 'Eggetarian'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <TextField fullWidth select label="Drinking" {...register('drinking')}>
                                            {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <TextField fullWidth select label="Smoking" {...register('smoking')}>
                                            {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        </TextField>
                                        <Box sx={{ gridColumn: '1 / -1' }}><TextField fullWidth label="Hobbies (comma separated)" {...register('hobbiesString')} /></Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}><TextField fullWidth label="Interests (comma separated)" {...register('interestsString')} /></Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}><TextField fullWidth multiline rows={4} label="About Me" {...register('aboutMe')} error={!!errors.aboutMe} helperText={errors.aboutMe?.message} /></Box>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={6}>
                                    <SectionTitle icon={<GenderIcon />} title="Physical Attributes" />
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 3 }}>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}><TextField fullWidth label="Height" {...register('height')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}><TextField fullWidth label="Body Type" {...register('bodyType')} /></Box>
                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}><TextField fullWidth label="Complexion" {...register('complexion')} /></Box>

                                        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                                            <TextField fullWidth select label="Any Disability?" {...register('isDisabled')}>
                                                <MenuItem value="false">No</MenuItem>
                                                <MenuItem value="true">Yes</MenuItem>
                                            </TextField>
                                        </Box>

                                        {isDisabled && (
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <Paper variant="outlined" sx={{ p: 2 }}>
                                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                                        <TextField fullWidth select label="Type of Disability" {...register('disabilityType')}>
                                                            {DISABILITY_TYPES.filter(d => d !== 'None').map(d => (
                                                                <MenuItem key={d} value={d}>{d}</MenuItem>
                                                            ))}
                                                        </TextField>
                                                        <Box sx={{ gridColumn: '1 / -1' }}><TextField fullWidth multiline rows={2} label="Description" {...register('disabilityDescription')} /></Box>
                                                    </Box>
                                                </Paper>
                                            </Box>
                                        )}
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={7}>
                                    <SectionTitle icon={<FavoriteIcon />} title="Partner Preferences" />
                                    <Typography variant="body2" color="text.secondary" paragraph>Specify criteria for your ideal partner.</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                                        <TextField fullWidth label="Min Age" type="number" {...register('partnerPreferences.ageRange.min')} />
                                        <TextField fullWidth label="Max Age" type="number" {...register('partnerPreferences.ageRange.max')} />
                                        <TextField fullWidth label="Min Height" {...register('partnerPreferences.heightRange.min')} />
                                        <TextField fullWidth label="Max Height" {...register('partnerPreferences.heightRange.max')} />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={tabValue} index={8}>
                                    <SectionTitle icon={<PhotoIcon />} title="Manage Photos" />
                                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                                        <Button variant="contained" component="label" startIcon={<UploadIcon />} disabled={profile?.photos?.length >= 5} sx={{ borderRadius: 3, py: 1.5, px: 4 }}>
                                            Upload New Photo
                                            <input type="file" hidden multiple accept="image/*" onChange={(e) => handlePhotoAction('upload', undefined, e.target.files || undefined)} />
                                        </Button>
                                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>Max 5 photos. High quality preferred.</Typography>
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                                        {profile?.photos?.map((photo: any, i: number) => (
                                            <Box key={photo._id || i}>
                                                <Card sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: photo.isMain ? `3px solid ${theme.palette.primary.main}` : '1px solid #eee' }}>
                                                    <CardMedia component="img" height="180" image={`${import.meta.env.VITE_API_URL}${photo.url}`} alt="Profile" />
                                                    {photo.isMain && <Chip label="Main" size="small" color="primary" sx={{ position: 'absolute', top: 8, left: 8 }} />}
                                                    <Box sx={{
                                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                                        bgcolor: 'rgba(0,0,0,0.6)', p: 1, display: 'flex', justifyContent: 'center', gap: 1
                                                    }}>
                                                        {!photo.isMain && (
                                                            <Tooltip title="Set as Main">
                                                                <IconButton size="small" onClick={() => handlePhotoAction('main', photo._id)} sx={{ color: 'white' }}><StarBorderIcon fontSize="small" /></IconButton>
                                                            </Tooltip>
                                                        )}
                                                        <Tooltip title="Delete">
                                                            <IconButton size="small" onClick={() => handlePhotoAction('delete', photo._id)} sx={{ color: '#ff5252' }}><DeleteIcon fontSize="small" /></IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Card>
                                            </Box>
                                        ))}
                                    </Box>
                                </TabPanel>

                                <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                                    <Button size="large" onClick={() => window.history.back()}>Cancel</Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={saving}
                                        size="large"
                                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                        sx={{ borderRadius: 3, px: 5, fontWeight: 700 }}
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </Box>
                            </GlassPaper>
                        </form>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ProfileEdit;
