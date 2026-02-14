import React from 'react';
import { Box, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditProfessional: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Controller
                name="highestEducation"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Highest Education"
                        {...field}
                        error={!!errors.highestEducation}
                        helperText={errors.highestEducation?.message as string}
                    />
                )}
            />
            <Controller
                name="collegeName"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="College/University"
                        {...field}
                        error={!!errors.collegeName}
                        helperText={errors.collegeName?.message as string}
                    />
                )}
            />
            <Controller
                name="professionalQualification"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Professional Qualification"
                        {...field}
                        error={!!errors.professionalQualification}
                        helperText={errors.professionalQualification?.message as string}
                    />
                )}
            />
            <Controller
                name="occupation"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Occupation"
                        {...field}
                        error={!!errors.occupation}
                        helperText={errors.occupation?.message as string}
                    />
                )}
            />
            <Controller
                name="annualIncome"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Annual Income"
                        type="number"
                        {...field}
                        error={!!errors.annualIncome}
                        helperText={errors.annualIncome?.message as string}
                        onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                )}
            />
            <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                    name="officeAddress"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Office Address"
                            {...field}
                            error={!!errors.officeAddress}
                            helperText={errors.officeAddress?.message as string}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default EditProfessional;
