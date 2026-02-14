import React from 'react';
import { Box, TextField, MenuItem, Paper } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

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

const EditPhysical: React.FC = () => {
    const { control, watch, formState: { errors } } = useFormContext();
    const isDisabled = watch('isDisabled') === true;

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Height"
                            {...field}
                            error={!!errors.height}
                            helperText={errors.height?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="bodyType"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Body Type"
                            {...field}
                            error={!!errors.bodyType}
                            helperText={errors.bodyType?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="complexion"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Complexion"
                            {...field}
                            error={!!errors.complexion}
                            helperText={errors.complexion?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <Controller
                    name="isDisabled"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            select
                            label="Any Disability?"
                            {...field}
                            error={!!errors.isDisabled}
                            helperText={errors.isDisabled?.message as string}
                        >
                            <MenuItem value={false as any}>No</MenuItem>
                            <MenuItem value={true as any}>Yes</MenuItem>
                        </TextField>
                    )}
                />
            </Box>

            {isDisabled && (
                <Box sx={{ gridColumn: '1 / -1' }}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <Controller
                                name="disabilityType"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        select
                                        label="Type of Disability"
                                        {...field}
                                        error={!!errors.disabilityType}
                                        helperText={errors.disabilityType?.message as string}
                                    >
                                        {DISABILITY_TYPES.filter(d => d !== 'None').map(d => (
                                            <MenuItem key={d} value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <Controller
                                    name="disabilityDescription"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            label="Description"
                                            {...field}
                                            error={!!errors.disabilityDescription}
                                            helperText={errors.disabilityDescription?.message as string}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default EditPhysical;
