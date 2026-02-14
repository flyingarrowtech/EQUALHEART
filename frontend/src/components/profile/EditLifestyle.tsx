import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditLifestyle: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Controller
                name="dietaryHabits"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Dietary Habits"
                        {...field}
                        error={!!errors.dietaryHabits}
                        helperText={errors.dietaryHabits?.message as string}
                    >
                        {['Vegetarian', 'Non-Vegetarian', 'Eggetarian'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                    </TextField>
                )}
            />
            <Controller
                name="drinking"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Drinking"
                        {...field}
                        error={!!errors.drinking}
                        helperText={errors.drinking?.message as string}
                    >
                        {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                    </TextField>
                )}
            />
            <Controller
                name="smoking"
                control={control}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        select
                        label="Smoking"
                        {...field}
                        error={!!errors.smoking}
                        helperText={errors.smoking?.message as string}
                    >
                        {['Yes', 'No', 'Occasionally'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                    </TextField>
                )}
            />
            <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                    name="hobbiesString"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Hobbies (comma separated)"
                            {...field}
                            error={!!errors.hobbiesString}
                            helperText={errors.hobbiesString?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                    name="interestsString"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Interests (comma separated)"
                            {...field}
                            error={!!errors.interestsString}
                            helperText={errors.interestsString?.message as string}
                        />
                    )}
                />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                    name="aboutMe"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="About Me"
                            {...field}
                            error={!!errors.aboutMe}
                            helperText={errors.aboutMe?.message as string}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default EditLifestyle;
