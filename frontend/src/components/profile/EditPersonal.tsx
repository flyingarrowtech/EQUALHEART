import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditPersonal: React.FC = () => {
    const { control, formState: { errors: formErrors } } = useFormContext();
    const errors: any = formErrors;

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Controller
                name="fullName.firstName"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="First Name"
                        {...field}
                        error={!!errors.fullName?.firstName}
                        helperText={errors.fullName?.firstName?.message as string}
                    />
                )}
            />
            <Controller
                name="fullName.lastName"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Last Name"
                        {...field}
                        error={!!errors.fullName?.lastName}
                        helperText={errors.fullName?.lastName?.message as string}
                    />
                )}
            />
            <Controller
                name="profileCreatedFor"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Profile Created For"
                        {...field}
                        error={!!errors.profileCreatedFor}
                        helperText={errors.profileCreatedFor?.message as string}
                    >
                        {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'].map(o => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Gender"
                        {...field}
                        error={!!errors.gender}
                        helperText={errors.gender?.message as string}
                    >
                        {['Male', 'Female', 'Transgender'].map(o => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        type="date"
                        label="Date of Birth"
                        InputLabelProps={{ shrink: true }}
                        {...field}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth?.message as string}
                    />
                )}
            />
            <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Marital Status"
                        {...field}
                        error={!!errors.maritalStatus}
                        helperText={errors.maritalStatus?.message as string}
                    >
                        {['Never Married', 'Divorced', 'Widowed', 'Separated'].map(o => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                name="motherTongue"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label="Mother Tongue"
                        {...field}
                        error={!!errors.motherTongue}
                        helperText={errors.motherTongue?.message as string}
                    />
                )}
            />
        </Box>
    );
};

export default EditPersonal;
