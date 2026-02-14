import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditLocation: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Controller
                name="country"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Country"
                        {...field}
                        error={!!errors.country}
                        helperText={errors.country?.message as string}
                    />
                )}
            />
            <Controller
                name="state"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="State"
                        {...field}
                        error={!!errors.state}
                        helperText={errors.state?.message as string}
                    />
                )}
            />
            <Controller
                name="city"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="City"
                        {...field}
                        error={!!errors.city}
                        helperText={errors.city?.message as string}
                    />
                )}
            />
            <Controller
                name="citizenship"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Citizenship"
                        {...field}
                        error={!!errors.citizenship}
                        helperText={errors.citizenship?.message as string}
                    />
                )}
            />
            <Controller
                name="nativePlace"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Native Place"
                        {...field}
                        error={!!errors.nativePlace}
                        helperText={errors.nativePlace?.message as string}
                    />
                )}
            />
            <Controller
                name="residentialType"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Residential Type"
                        {...field}
                        error={!!errors.residentialType}
                        helperText={errors.residentialType?.message as string}
                    >
                        <MenuItem value="Own">Own House</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                    </TextField>
                )}
            />
            <Controller
                name="nriStatus"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="NRI Status"
                        {...field}
                        error={!!errors.nriStatus}
                        helperText={errors.nriStatus?.message as string}
                    >
                        <MenuItem value={false as any}>No</MenuItem>
                        <MenuItem value={true as any}>Yes</MenuItem>
                    </TextField>
                )}
            />
        </Box>
    );
};

export default EditLocation;
