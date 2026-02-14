import React from 'react';
import { Box, TextField, MenuItem, Divider, Chip } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditFamily: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <Controller
                    name="fatherName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Father's Name"
                            {...field}
                            error={!!errors.fatherName}
                            helperText={errors.fatherName?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <Controller
                    name="fatherOccupation"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Father's Occupation"
                            {...field}
                            error={!!errors.fatherOccupation}
                            helperText={errors.fatherOccupation?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <Controller
                    name="motherName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Mother's Name"
                            {...field}
                            error={!!errors.motherName}
                            helperText={errors.motherName?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <Controller
                    name="motherOccupation"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Mother's Occupation"
                            {...field}
                            error={!!errors.motherOccupation}
                            helperText={errors.motherOccupation?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}><Divider textAlign="left"><Chip label="Siblings Info" /></Divider></Box>
            <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                <Controller
                    name="numberOfSiblings.brothers.unmarried"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Brothers (Unmarried)"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                <Controller
                    name="numberOfSiblings.brothers.married"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Brothers (Married)"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                <Controller
                    name="numberOfSiblings.sisters.unmarried"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Sisters (Unmarried)"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                <Controller
                    name="numberOfSiblings.sisters.married"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Sisters (Married)"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}><Divider /></Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="familyType"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            select
                            label="Family Type"
                            {...field}
                            error={!!errors.familyType}
                            helperText={errors.familyType?.message as string}
                        >
                            {['Joint Family', 'Nuclear Family'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="familyValues"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            select
                            label="Family Values"
                            {...field}
                            error={!!errors.familyValues}
                            helperText={errors.familyValues?.message as string}
                        >
                            {['Traditional', 'Modern', 'Moderate'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                <Controller
                    name="familyFinancialStatus"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Financial Status"
                            {...field}
                            error={!!errors.familyFinancialStatus}
                            helperText={errors.familyFinancialStatus?.message as string}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default EditFamily;
