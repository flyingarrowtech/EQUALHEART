import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Stepper, Step, StepLabel, Button, Typography, Box, TextField,
    MenuItem, CircularProgress, IconButton, Card, CardMedia, Chip
} from '@mui/material';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import {
    CloudUpload as UploadIcon,
    Delete as DeleteIcon,
    StarBorder as StarBorderIcon,
    ArrowForward,
    ArrowBack,
    CheckCircle
} from '@mui/icons-material';
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

// --- Shared Zod Schema (Subset of ProfileEdit) ---
const profileWizardSchema = z.object({
    // Step 1: Basic
    fullName: z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
    }),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    height: z.string().min(1, 'Height is required'),
    maritalStatus: z.string().min(1, 'Marital status is required'),
    motherTongue: z.string().min(1, 'Mother tongue is required'),
    religion: z.string().min(1, 'Religion is required'),
    community: z.string().optional(),
    caste: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Transgender']),
    isDisabled: z.union([z.boolean(), z.string().transform(v => v === 'true')]).optional(),
    disabilityType: z.string().optional(),
    disabilityDescription: z.string().optional(),

    // Step 2: Location
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
    citizenship: z.string().min(1, 'Citizenship is required'),
    nativePlace: z.string().optional(),
    residentialType: z.enum(['Own', 'Rented']),

    // Step 3: Education & Profession
    highestEducation: z.string().min(1, 'Education is required'),
    collegeName: z.string().optional(),
    occupation: z.string().min(1, 'Occupation is required'),
    annualIncome: z.preprocess((val) => Number(val), z.number()),
    officeAddress: z.string().optional(),

    // Step 4: Family
    fatherOccupation: z.string().optional(),
    motherOccupation: z.string().optional(),
    familyType: z.enum(['Joint Family', 'Nuclear Family']),
    familyValues: z.enum(['Traditional', 'Modern', 'Moderate']),
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

    // Step 5: Lifestyle
    dietaryHabits: z.enum(['Vegetarian', 'Non-Vegetarian', 'Eggetarian']).optional(),
    smoking: z.enum(['Yes', 'No', 'Occasionally']).optional(),
    drinking: z.enum(['Yes', 'No', 'Occasionally']).optional(),
    interestsString: z.string().optional(),
    hobbiesString: z.string().optional(),
    partnerPreferences: z.object({
        ageRange: z.object({
            min: z.preprocess((val) => Number(val), z.number()),
            max: z.preprocess((val) => Number(val), z.number())
        }).optional(),
        heightRange: z.object({ min: z.string(), max: z.string() }).optional(),
    }).optional()
});

type ProfileWizardValues = z.infer<typeof profileWizardSchema>;

const steps = [
    'Basic Details',
    'Location',
    'Education & Profession',
    'Family Details',
    'Lifestyle & Preferences',
    'Photos'
];

const Step1Basic = () => {
    const { register, formState: { errors }, watch } = useFormContext<ProfileWizardValues>();
    const isDisabled = watch('isDisabled');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="First Name" {...register('fullName.firstName')} error={!!errors.fullName?.firstName} helperText={errors.fullName?.firstName?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Last Name" {...register('fullName.lastName')} error={!!errors.fullName?.lastName} helperText={errors.fullName?.lastName?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} {...register('dateOfBirth')} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth select label="Gender" {...register('gender')} error={!!errors.gender} helperText={errors.gender?.message}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Transgender">Transgender</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Height (e.g. 5'7&quot;)" {...register('height')} error={!!errors.height} helperText={errors.height?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth select label="Marital Status" {...register('maritalStatus')} error={!!errors.maritalStatus} helperText={errors.maritalStatus?.message}>
                        <MenuItem value="Never Married">Never Married</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                        <MenuItem value="Separated">Separated</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Mother Tongue" {...register('motherTongue')} error={!!errors.motherTongue} helperText={errors.motherTongue?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Religion" {...register('religion')} error={!!errors.religion} helperText={errors.religion?.message} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth select label="Any Disability?" {...register('isDisabled')} defaultValue="false">
                        <MenuItem value="false">No</MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Community" {...register('community')} />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                    <TextField fullWidth label="Caste" {...register('caste')} />
                </Box>
            </Box>

            {isDisabled && (
                <Box sx={{ mt: 1 }}>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <TextField fullWidth select label="Type of Disability" {...register('disabilityType')} defaultValue="">
                                {DISABILITY_TYPES.filter(d => d !== 'None').map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <TextField fullWidth multiline rows={2} label="Disability Description" {...register('disabilityDescription')} />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

const Step2Location = () => {
    const { register, formState: { errors } } = useFormContext<ProfileWizardValues>();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="Country" {...register('country')} error={!!errors.country} helperText={errors.country?.message} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="State" {...register('state')} error={!!errors.state} helperText={errors.state?.message} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="Citizenship" {...register('citizenship')} error={!!errors.citizenship} helperText={errors.citizenship?.message} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="Native Place" {...register('nativePlace')} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                <TextField fullWidth select label="Residential Type" {...register('residentialType')} defaultValue="Own">
                    <MenuItem value="Own">Own House</MenuItem>
                    <MenuItem value="Rented">Rented</MenuItem>
                </TextField>
            </Box>
        </Box>
    );
};

const Step3Education = () => {
    const { register, formState: { errors } } = useFormContext<ProfileWizardValues>();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField fullWidth label="Highest Education" {...register('highestEducation')} error={!!errors.highestEducation} helperText={errors.highestEducation?.message} />
            <TextField fullWidth label="University/College" {...register('collegeName')} />
            <TextField fullWidth label="Occupation" {...register('occupation')} error={!!errors.occupation} helperText={errors.occupation?.message} />
            <TextField fullWidth label="Annual Income" type="number" {...register('annualIncome')} />
            <TextField fullWidth label="Office Address" {...register('officeAddress')} />
        </Box>
    );
};

const Step4Family = () => {
    const { register } = useFormContext<ProfileWizardValues>();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="Father's Occupation" {...register('fatherOccupation')} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}><TextField fullWidth label="Mother's Occupation" {...register('motherOccupation')} /></Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                <TextField fullWidth select label="Family Type" {...register('familyType')} defaultValue="Nuclear Family">
                    {['Joint Family', 'Nuclear Family'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                <TextField fullWidth select label="Family Values" {...register('familyValues')} defaultValue="Moderate">
                    {['Traditional', 'Modern', 'Moderate'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}><Typography variant="subtitle2">Siblings</Typography></Box>
            <Box sx={{ flex: { xs: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}><TextField fullWidth label="Brothers (Married)" type="number" {...register('numberOfSiblings.brothers.married')} /></Box>
            <Box sx={{ flex: { xs: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}><TextField fullWidth label="Brothers (Unmarried)" type="number" {...register('numberOfSiblings.brothers.unmarried')} /></Box>
            <Box sx={{ flex: { xs: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}><TextField fullWidth label="Sisters (Married)" type="number" {...register('numberOfSiblings.sisters.married')} /></Box>
            <Box sx={{ flex: { xs: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}><TextField fullWidth label="Sisters (Unmarried)" type="number" {...register('numberOfSiblings.sisters.unmarried')} /></Box>
        </Box>
    );
};

const Step5Lifestyle = () => {
    const { register } = useFormContext<ProfileWizardValues>();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <TextField fullWidth select label="Diet" {...register('dietaryHabits')} defaultValue="Vegetarian">
                    {['Vegetarian', 'Non-Vegetarian', 'Eggetarian'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <TextField fullWidth select label="Smoking" {...register('smoking')} defaultValue="No">
                    {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <TextField fullWidth select label="Drinking" {...register('drinking')} defaultValue="No">
                    {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}><TextField fullWidth label="Interests (comma separated)" {...register('interestsString')} /></Box>
            <Box sx={{ flex: '1 1 100%' }}><TextField fullWidth label="Hobbies (comma separated)" {...register('hobbiesString')} /></Box>
            <Box sx={{ flex: '1 1 100%' }}><Typography variant="subtitle2" sx={{ mb: 1 }}>Partner Preference</Typography></Box>
            <Box sx={{ flex: '1 1 calc(50% - 12px)' }}><TextField fullWidth label="Min Age" type="number" {...register('partnerPreferences.ageRange.min')} /></Box>
            <Box sx={{ flex: '1 1 calc(50% - 12px)' }}><TextField fullWidth label="Max Age" type="number" {...register('partnerPreferences.ageRange.max')} /></Box>
            <Box sx={{ flex: '1 1 calc(50% - 12px)' }}><TextField fullWidth label="Min Height" {...register('partnerPreferences.heightRange.min')} /></Box>
            <Box sx={{ flex: '1 1 calc(50% - 12px)' }}><TextField fullWidth label="Max Height" {...register('partnerPreferences.heightRange.max')} /></Box>
        </Box>
    );
};

const Step6Photos = ({ photos }: { photos: any[], setPhotos: any }) => {
    const [uploading, setUploading] = useState(false);
    // const theme = useTheme();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);

        try {
            await userApi.uploadPhotos(Array.from(e.target.files));
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (photoId: string) => {
        try {
            await userApi.deletePhoto(photoId);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleMain = async (photoId: string) => {
        try {
            await userApi.setMainPhoto(photoId);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Box>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
                    disabled={uploading || photos.length >= 5}
                    size="large"
                    sx={{ borderRadius: 3, px: 4, py: 1.5 }}
                >
                    Upload Photos
                    <input type="file" hidden multiple accept="image/*" onChange={handleUpload} />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>Max 5 photos. First photo is display picture.</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {photos.map((photo: any) => (
                    <Box sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '1 1 calc(33.333% - 11px)' } }} key={photo._id}>
                        <Card sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                            <CardMedia component="img" height="180" image={`${import.meta.env.VITE_API_URL}${photo.metadata?.thumbnailUrl || photo.url}`} alt="User Photo" />
                            {photo.isMain && <Chip label="Main" color="primary" size="small" sx={{ position: 'absolute', top: 8, left: 8 }} />}
                            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', p: 0.5 }}>
                                {!photo.isMain && <IconButton size="small" sx={{ color: 'white' }} onClick={() => handleMain(photo._id)}><StarBorderIcon /></IconButton>}
                                <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleDelete(photo._id)}><DeleteIcon /></IconButton>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const ProfileCreationWizard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const navigate = useNavigate();
    // const theme = useTheme();

    const methods = useForm<ProfileWizardValues>({
        resolver: zodResolver(profileWizardSchema) as any,
        mode: 'onBlur',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userApi.getProfile();
                const data = res.data;
                setProfile(data);

                // Pre-fill form
                methods.reset({
                    ...data,
                    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
                    hobbiesString: data.hobbies?.join(', ') || '',
                    interestsString: data.interests?.join(', ') || '', // Added interestsString
                    numberOfSiblings: data.numberOfSiblings || {
                        brothers: { married: 0, unmarried: 0 },
                        sisters: { married: 0, unmarried: 0 }
                    },
                    partnerPreferences: data.partnerPreferences || {
                        ageRange: { min: 18, max: 40 },
                        heightRange: { min: "4'0\"", max: "7'0\"" }
                    }
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [methods]);

    const handleNext = async () => {
        const stepsKeys = [
            ['fullName', 'dateOfBirth', 'height', 'maritalStatus', 'religion'], // Step 1
            ['country', 'state', 'city'], // Step 2
            ['highestEducation', 'occupation', 'annualIncome'], // Step 3
            ['familyType', 'familyValues'], // Step 4
            [], // Step 5 (Optional usually)
            [] // Step 6 Photos
        ];

        const output = await methods.trigger(stepsKeys[activeStep] as any);
        if (output) {
            // Save current progress
            try {
                const data = methods.getValues();
                const payload: any = {
                    ...data,
                };

                if (payload.hobbiesString) {
                    payload.hobbies = payload.hobbiesString.split(',').map((s: string) => s.trim());
                    delete payload.hobbiesString;
                }
                if (payload.interestsString) {
                    payload.interests = payload.interestsString.split(',').map((s: string) => s.trim());
                    delete payload.interestsString;
                }

                // Ensure number conversions where needed
                if (payload.annualIncome) payload.annualIncome = Number(payload.annualIncome);
                if (payload.numberOfSiblings) {
                    payload.numberOfSiblings.brothers.married = Number(payload.numberOfSiblings.brothers.married);
                    payload.numberOfSiblings.brothers.unmarried = Number(payload.numberOfSiblings.brothers.unmarried);
                    payload.numberOfSiblings.sisters.married = Number(payload.numberOfSiblings.sisters.married);
                    payload.numberOfSiblings.sisters.unmarried = Number(payload.numberOfSiblings.sisters.unmarried);
                }
                if (payload.partnerPreferences?.ageRange) {
                    payload.partnerPreferences.ageRange.min = Number(payload.partnerPreferences.ageRange.min);
                    payload.partnerPreferences.ageRange.max = Number(payload.partnerPreferences.ageRange.max);
                }

                await userApi.updateProfile(payload);
            } catch (e) {
                console.error("Auto-save failed", e);
            }

            if (activeStep === steps.length - 1) {
                navigate('/dashboard');
            } else {
                setActiveStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => setActiveStep(prev => prev - 1);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f3f0' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Complete Your Profile"
                subtitle="Just a few more steps to find your perfect match!"
                gradient
                backgroundImage="https://images.unsplash.com/photo-1522673607200-1645062cd958?w=1920&q=80"
            />

            <Container maxWidth="md" sx={{ mt: -6 }}>
                <Paper elevation={0} sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.05)'
                }}>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
                        {steps.map((label) => (
                            <Step key={label}><StepLabel>{label}</StepLabel></Step>
                        ))}
                    </Stepper>

                    <FormProvider {...methods}>
                        <Box sx={{ minHeight: 400 }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeStep === 0 && <Step1Basic />}
                                    {activeStep === 1 && <Step2Location />}
                                    {activeStep === 2 && <Step3Education />}
                                    {activeStep === 3 && <Step4Family />}
                                    {activeStep === 4 && <Step5Lifestyle />}
                                    {activeStep === 5 && <Step6Photos photos={profile?.photos || []} setPhotos={() => { }} />}
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </FormProvider>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            size="large"
                            startIcon={<ArrowBack />}
                            sx={{ borderRadius: 3, px: 3 }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            size="large"
                            endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
                            sx={{ borderRadius: 3, px: 5, fontWeight: 700 }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish & Go to Dashboard' : 'Save & Continue'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfileCreationWizard;
