import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditReligion: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="religion"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Religion"
                            {...field}
                            error={!!errors.religion}
                            helperText={errors.religion?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="community"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Community"
                            {...field}
                            error={!!errors.community}
                            helperText={errors.community?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="caste"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Caste"
                            {...field}
                            error={!!errors.caste}
                            helperText={errors.caste?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="subCaste"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Sub-Caste"
                            {...field}
                            error={!!errors.subCaste}
                            helperText={errors.subCaste?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="gotra"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Gotra"
                            {...field}
                            error={!!errors.gotra}
                            helperText={errors.gotra?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
                <Controller
                    name="nakshatram"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Nakshatram"
                            {...field}
                            error={!!errors.nakshatram}
                            helperText={errors.nakshatram?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
                <Controller
                    name="rashi"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Rashi"
                            {...field}
                            error={!!errors.rashi}
                            helperText={errors.rashi?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Controller
                    name="manglik"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            select
                            label="Manglik"
                            {...field}
                            error={!!errors.manglik}
                            helperText={errors.manglik?.message as string}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </TextField>
                    )}
                />
            </Box>
        </Box>
    );
};

export default EditReligion;
