import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, CircularProgress, Container, Avatar } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import userApi from '../../api/userApi';
import { useNotificationStore } from '../../store/useNotificationStore';
import {
    Person as PersonIcon,
    LocationOn as LocationIcon,
    TempleHindu as TempleIcon,
    Work as WorkIcon,
    FamilyRestroom as FamilyIcon,
    LocalDining as LifestyleIcon,
    Accessibility as PhysicalIcon,
    Favorite as PreferencesIcon,
    PhotoCamera as PhotoIcon,
    ChevronRight,
    Edit as EditIcon
} from '@mui/icons-material';

// Import modular components
import EditPersonal from '../../components/profile/EditPersonal';
import EditLocation from '../../components/profile/EditLocation';
import EditReligion from '../../components/profile/EditReligion';
import EditProfessional from '../../components/profile/EditProfessional';
import EditFamily from '../../components/profile/EditFamily';
import EditLifestyle from '../../components/profile/EditLifestyle';
import EditPhysical from '../../components/profile/EditPhysical';
import EditPreferences from '../../components/profile/EditPreferences';
import EditPhotos from '../../components/profile/EditPhotos';

// Define strict Zod schema matching backend model
// (Schema remains the same as before for data consistency)
const profileSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(1, "First Name is required"),
        lastName: z.string().min(1, "Last Name is required"),
        middleName: z.string().nullish(),
    }),
    profileCreatedFor: z.string().nullish(),
    gender: z.enum(['Male', 'Female', 'Transgender']).nullish(),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid Date" }),
    maritalStatus: z.string().nullish(),
    motherTongue: z.string().nullish(),
    country: z.string().nullish(),
    state: z.string().nullish(),
    city: z.string().nullish(),
    citizenship: z.string().nullish(),
    nativePlace: z.string().nullish(),
    residentialType: z.string().nullish(),
    nriStatus: z.boolean().nullish(),
    religion: z.string().nullish(),
    community: z.string().nullish(),
    caste: z.string().nullish(),
    subCaste: z.string().nullish(),
    gotra: z.string().nullish(),
    nakshatram: z.string().nullish(),
    rashi: z.string().nullish(),
    manglik: z.string().nullish(),
    highestEducation: z.string().nullish(),
    collegeName: z.string().nullish(),
    professionalQualification: z.string().nullish(),
    occupation: z.string().nullish(),
    annualIncome: z.number().nullish(),
    officeAddress: z.string().nullish(),
    fatherName: z.string().nullish(),
    fatherOccupation: z.string().nullish(),
    motherName: z.string().nullish(),
    motherOccupation: z.string().nullish(),
    numberOfSiblings: z.object({
        brothers: z.object({ married: z.number().nullish(), unmarried: z.number().nullish() }),
        sisters: z.object({ married: z.number().nullish(), unmarried: z.number().nullish() }),
    }).nullish(),
    familyType: z.string().nullish(),
    familyValues: z.string().nullish(),
    familyFinancialStatus: z.string().nullish(),
    dietaryHabits: z.string().nullish(),
    drinking: z.string().nullish(),
    smoking: z.string().nullish(),
    hobbiesString: z.string().nullish(),
    interestsString: z.string().nullish(),
    aboutMe: z.string().nullish(),
    height: z.string().nullish(),
    bodyType: z.string().nullish(),
    complexion: z.string().nullish(),
    isDisabled: z.boolean().nullish(),
    disabilityType: z.string().nullish(),
    disabilityDescription: z.string().nullish(),
    partnerPreferences: z.object({
        ageRange: z.object({ min: z.number().nullish(), max: z.number().nullish() }).nullish(),
        heightRange: z.object({ min: z.string().nullish(), max: z.string().nullish() }).nullish(),
    }).nullish(),
    photos: z.array(z.any()).nullish(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const TABS = [
    { icon: <PersonIcon />, label: "Personal Details" },
    { icon: <LocationIcon />, label: "Location" },
    { icon: <TempleIcon />, label: "Religion & Community" },
    { icon: <WorkIcon />, label: "Education & Career" },
    { icon: <FamilyIcon />, label: "Family Details" },
    { icon: <LifestyleIcon />, label: "Lifestyle" },
    { icon: <PhysicalIcon />, label: "Physical Attributes" },
    { icon: <PreferencesIcon />, label: "Partner Preferences" },
    { icon: <PhotoIcon />, label: "Photos" },
];

const ProfileEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useNotificationStore();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [userName, setUserName] = useState("User");

    const methods = useForm<ProfileFormInputs>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: { firstName: '', lastName: '', middleName: '' },
            gender: 'Male',
            maritalStatus: 'Never Married',
            profileCreatedFor: 'Self',
            country: '',
            state: '',
            city: '',
            citizenship: '',
            nativePlace: '',
            residentialType: 'Own',
            nriStatus: false,
            isDisabled: false,
            disabilityType: '',
            disabilityDescription: '',
            religion: '',
            community: '',
            caste: '',
            subCaste: '',
            gotra: '',
            nakshatram: '',
            rashi: '',
            manglik: 'No',
            highestEducation: '',
            collegeName: '',
            professionalQualification: '',
            occupation: '',
            annualIncome: 0,
            officeAddress: '',
            fatherName: '',
            fatherOccupation: '',
            motherName: '',
            motherOccupation: '',
            familyType: 'Nuclear Family',
            familyValues: 'Moderate',
            familyFinancialStatus: '',
            dietaryHabits: 'Vegetarian',
            drinking: 'No',
            smoking: 'No',
            hobbiesString: '',
            interestsString: '',
            aboutMe: '',
            height: '',
            bodyType: '',
            complexion: '',
            dateOfBirth: new Date().toISOString().split('T')[0],
            numberOfSiblings: {
                brothers: { married: 0, unmarried: 0 },
                sisters: { married: 0, unmarried: 0 }
            },
            partnerPreferences: {
                ageRange: { min: 18, max: 50 },
                heightRange: { min: '', max: '' }
            },
            photos: []
        }
    });

    const { reset, handleSubmit } = methods;

    useEffect(() => {
        if (location.pathname === '/profile/photos') setActiveTab(8);
        else if (location.pathname === '/profile/preferences') setActiveTab(7);
        else setActiveTab(0);
    }, [location.pathname]);

    const fetchProfileData = async () => {
        try {
            const response = await userApi.getProfile();
            const data = response.data || response;

            if (data.fullName?.firstName) {
                setUserName(data.fullName.firstName);
            }

            const formData = {
                ...data,
                fullName: {
                    firstName: data.fullName?.firstName || '',
                    lastName: data.fullName?.lastName || '',
                    middleName: data.fullName?.middleName || ''
                },
                profileCreatedFor: data.profileCreatedFor || 'Self',
                gender: data.gender || 'Male',
                maritalStatus: data.maritalStatus || 'Never Married',
                motherTongue: data.motherTongue || '',
                country: data.country || '',
                state: data.state || '',
                city: data.city || '',
                citizenship: data.citizenship || '',
                nativePlace: data.nativePlace || '',
                residentialType: data.residentialType || 'Own',
                nriStatus: !!data.nriStatus,
                religion: data.religion || '',
                community: data.community || '',
                caste: data.caste || '',
                subCaste: data.subCaste || '',
                gotra: data.gotra || '',
                nakshatram: data.nakshatram || '',
                rashi: data.rashi || '',
                manglik: data.manglik || 'No',
                highestEducation: data.highestEducation || '',
                collegeName: data.collegeName || '',
                professionalQualification: data.professionalQualification || '',
                occupation: data.occupation || '',
                annualIncome: Number(data.annualIncome) || 0,
                officeAddress: data.officeAddress || '',
                fatherName: data.fatherName || '',
                fatherOccupation: data.fatherOccupation || '',
                motherName: data.motherName || '',
                motherOccupation: data.motherOccupation || '',
                familyType: data.familyType || 'Nuclear Family',
                familyValues: data.familyValues || 'Moderate',
                familyFinancialStatus: data.familyFinancialStatus || '',
                dietaryHabits: data.dietaryHabits || 'Vegetarian',
                drinking: data.drinking || 'No',
                smoking: data.smoking || 'No',
                aboutMe: data.aboutMe || '',
                height: data.height || '',
                bodyType: data.bodyType || '',
                complexion: data.complexion || '',
                isDisabled: !!data.isDisabled,
                disabilityType: data.disabilityType || '',
                disabilityDescription: data.disabilityDescription || '',
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
                hobbiesString: data.hobbies?.join(', ') || '',
                interestsString: data.interests?.join(', ') || '',
                numberOfSiblings: {
                    brothers: {
                        married: data.numberOfSiblings?.brothers?.married ?? 0,
                        unmarried: data.numberOfSiblings?.brothers?.unmarried ?? 0
                    },
                    sisters: {
                        married: data.numberOfSiblings?.sisters?.married ?? 0,
                        unmarried: data.numberOfSiblings?.sisters?.unmarried ?? 0
                    }
                },
                partnerPreferences: {
                    ageRange: {
                        min: data.partnerPreferences?.ageRange?.min ?? 18,
                        max: data.partnerPreferences?.ageRange?.max ?? 50
                    },
                    heightRange: {
                        min: data.partnerPreferences?.heightRange?.min ?? '',
                        max: data.partnerPreferences?.heightRange?.max ?? ''
                    }
                }
            };

            reset(formData);
        } catch (error) {
            console.error("Failed to fetch profile", error);
            showToast("Failed to load profile data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const onFormError = (errors: any) => {
        console.error("Form Validation Errors:", errors);
        showToast("Please fix the errors in the form before saving", "error");
    };

    const onSubmit = async (data: ProfileFormInputs) => {
        setUpdating(true);
        try {
            // Clean up the data to match API expectations (remove nulls, convert hobbies/interests)
            const payload: any = {
                ...data,
                hobbies: data.hobbiesString ? data.hobbiesString.split(',').map(s => s.trim()).filter(Boolean) : [],
                interests: data.interestsString ? data.interestsString.split(',').map(s => s.trim()).filter(Boolean) : [],
            };

            // Recursively remove nulls and use undefined instead for the API
            const cleanPayload = (obj: any): any => {
                const newObj: any = Array.isArray(obj) ? [] : {};
                for (const key in obj) {
                    if (obj[key] === null) {
                        // Skip nulls, API prefers missing or undefined
                    } else if (typeof obj[key] === 'object' && obj[key] !== null && !(obj[key] instanceof Date)) {
                        newObj[key] = cleanPayload(obj[key]);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
                return newObj;
            };

            const finalPayload = cleanPayload(payload);
            delete finalPayload.hobbiesString;
            delete finalPayload.interestsString;

            await userApi.updateProfile(finalPayload);
            showToast("Profile updated successfully", "success");
            fetchProfileData();
        } catch (error) {
            console.error("Update failed", error);
            showToast("Failed to update profile", "error");
        } finally {
            setUpdating(false);
        }
    };

    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue);
        if (newValue === 8) navigate('/profile/photos');
        else if (newValue === 7) navigate('/profile/preferences');
        else navigate('/profile/edit');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, height: '60vh', alignItems: 'center' }}>
                <CircularProgress size={60} thickness={4} sx={{ color: '#e91e63' }} />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header Banner */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                    mb: 4,
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -50, right: -50,
                        width: 200, height: 200,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                    }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, position: 'relative', zIndex: 1 }}>
                    <Avatar sx={{ width: 80, height: 80, border: '4px solid rgba(255,255,255,0.3)', bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight="800">
                            Hello, {userName}!
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            Keep your profile updated to find the best matches.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                {/* Glass Sidebar */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    sx={{
                        width: { md: 300 },
                        flexShrink: 0,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            position: 'sticky',
                            top: 100
                        }}
                    >
                        <Typography variant="overline" sx={{ px: 2, color: 'text.secondary', fontWeight: 700 }}>
                            Profile Sections
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {TABS.map((tab, index) => (
                                <Button
                                    key={index}
                                    startIcon={React.cloneElement(tab.icon as any, {
                                        sx: { color: activeTab === index ? 'white' : 'text.secondary' }
                                    })}
                                    endIcon={activeTab === index && <ChevronRight />}
                                    onClick={() => handleTabChange(index)}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        py: 1.5,
                                        px: 2,
                                        borderRadius: 3,
                                        color: activeTab === index ? 'white' : 'text.primary',
                                        background: activeTab === index ? 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)' : 'transparent',
                                        boxShadow: activeTab === index ? '0 4px 12px rgba(233, 30, 99, 0.3)' : 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: activeTab === index ? '' : 'rgba(0,0,0,0.05)',
                                            transform: 'translateX(5px)'
                                        },
                                        textTransform: 'none',
                                        fontWeight: activeTab === index ? 600 : 400,
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    <Box sx={{ flex: 1, textAlign: 'left' }}>{tab.label}</Box>
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                </Box>

                {/* Main Content Area */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 3, md: 5 },
                                    borderRadius: 4,
                                    bgcolor: 'rgba(255, 255, 255, 0.8)', // Glassy white
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    minHeight: 500,
                                    // GLOBAL INPUT STYLING
                                    '& .MuiTextField-root': {
                                        mb: 1
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(255, 255, 255, 0.6)',
                                        backdropFilter: 'blur(5px)',
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                                        },
                                        '&.Mui-focused': {
                                            bgcolor: 'white',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                        },
                                        '& fieldset': {
                                            borderColor: 'rgba(0,0,0,0.1)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0,0,0,0.2)',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'text.secondary',
                                        fontWeight: 500
                                    }
                                }}
                            >
                                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                                        {TABS[activeTab].label}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', bgcolor: 'background.paper', px: 2, py: 0.5, borderRadius: 10 }}>
                                        Step {activeTab + 1} of {TABS.length}
                                    </Typography>
                                </Box>

                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmit, onFormError)}>
                                        <Box sx={{ mb: 4 }}>
                                            {activeTab === 0 && <EditPersonal />}
                                            {activeTab === 1 && <EditLocation />}
                                            {activeTab === 2 && <EditReligion />}
                                            {activeTab === 3 && <EditProfessional />}
                                            {activeTab === 4 && <EditFamily />}
                                            {activeTab === 5 && <EditLifestyle />}
                                            {activeTab === 6 && <EditPhysical />}
                                            {activeTab === 7 && <EditPreferences />}
                                            {activeTab === 8 && <EditPhotos onPhotoChange={fetchProfileData} />}
                                        </Box>

                                        {activeTab !== 8 && (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                pt: 3,
                                                borderTop: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    disabled={updating}
                                                    startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <EditIcon />}
                                                    sx={{
                                                        borderRadius: 3,
                                                        px: 5,
                                                        py: 1.2,
                                                        background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                                                        boxShadow: '0 8px 16px rgba(233, 30, 99, 0.25)',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {updating ? 'Saving Changes...' : 'Save & Update'}
                                                </Button>
                                            </Box>
                                        )}
                                    </form>
                                </FormProvider>
                            </Paper>
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfileEdit;
