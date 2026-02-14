import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    IconButton,
    Button,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert,
    Edit,
    Delete,
    Add,
} from '@mui/icons-material';

// Sample users data
const users = [
    {
        id: 1,
        name: 'Ashley Emry',
        email: 'ashley@example.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Elizabeth Taylor',
        email: 'elizabeth@example.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Angelina Jolie',
        email: 'angelina@example.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Free',
        status: 'Active',
    },
    {
        id: 4,
        name: 'Olivia Mia',
        email: 'olivia@example.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium Plus',
        status: 'Active',
    },
    {
        id: 5,
        name: 'Jennifer',
        email: 'jennifer@example.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
        status: 'Inactive',
    },
];

const Users: React.FC = () => {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Users Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage all registered users
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ fontWeight: 600 }}
                >
                    Add New User
                </Button>
            </Box>

            {/* Search and Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search users..."
                            size="small"
                            sx={{ flex: 1, minWidth: 250 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="outlined">Filter</Button>
                        <Button variant="outlined">Export</Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>USER</TableCell>
                                    <TableCell>PHONE</TableCell>
                                    <TableCell>JOIN DATE</TableCell>
                                    <TableCell>PLAN</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell align="right">ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ width: 40, height: 40 }}>{user.name[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="600">
                                                        {user.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {user.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.joinDate}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.plan}
                                                size="small"
                                                color={user.plan === 'Premium Plus' ? 'primary' : user.plan === 'Premium' ? 'success' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status}
                                                size="small"
                                                color={user.status === 'Active' ? 'success' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" color="primary">
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <Delete fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small">
                                                <MoreVert fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Users;
