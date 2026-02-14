import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    AvatarGroup,
    Chip,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
} from '@mui/material';
import {
    PersonAdd,
    MoreVert,
    FiberManualRecord,
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';

// Sample data for charts
const monthlyEarningsData = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 6000 },
    { month: 'Mar', amount: 7000 },
    { month: 'Apr', amount: 8500 },
    { month: 'May', amount: 9000 },
    { month: 'Jun', amount: 10500 },
    { month: 'Jul', amount: 9500 },
    { month: 'Aug', amount: 8000 },
    { month: 'Sep', amount: 7500 },
    { month: 'Oct', amount: 9000 },
    { month: 'Nov', amount: 8500 },
    { month: 'Dec', amount: 6000 },
];

const membersPieData = [
    { name: 'Premium Plus', value: 2500, color: '#1976d2' },
    { name: 'Premium', value: 3000, color: '#ff9800' },
    { name: 'Free', value: 1400, color: '#9e9e9e' },
];

const earningsPieData = [
    { name: 'Premium Plus', value: 6000, color: '#1976d2' },
    { name: 'Premium', value: 4069, color: '#9c27b0' },
];

// Sample recent members data
const recentMembers = [
    {
        id: 1,
        name: 'Ashley emry',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 2,
        name: 'Elizabeth Taylor',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 3,
        name: 'Angelina Jolie',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 4,
        name: 'Olivia mia',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 5,
        name: 'Jennifer',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 6,
        name: 'Emmy jack',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        joinDate: '22 Feb 2024',
        plan: 'Premium',
    },
];

const renewalReminders = [
    {
        id: 1,
        name: 'Ashley emry',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 2,
        name: 'Elizabeth Taylor',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 3,
        name: 'Angelina Jolie',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 4,
        name: 'Olivia mia',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 5,
        name: 'Jennifer',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
    {
        id: 6,
        name: 'Emmy jack',
        email: 'ashley@example.mail.com',
        phone: '01 321 998 01',
        expiryDate: '22 Feb 2024',
        plan: 'Premium',
    },
];

const Dashboard: React.FC = () => {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Home / Library / Data
                </Typography>
            </Box>

            {/* Top Stats Row */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                {/* User Requests Card - Green Gradient */}
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
                    <Card
                        sx={{
                            background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                            color: 'white',
                            height: '100%',
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ opacity: 0.9, textTransform: 'uppercase' }}>
                                        New Users
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        User requests
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: 48, height: 48 }}>
                                    <PersonAdd />
                                </Avatar>
                            </Box>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                69
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                This could be today how many users can register
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* New Registrants */}
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                New Registrants
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                38
                            </Typography>
                            <AvatarGroup max={8} sx={{ justifyContent: 'flex-start' }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <Avatar key={i} sx={{ width: 32, height: 32, bgcolor: `hsl(${i * 45}, 70%, 60%)` }}>
                                        {String.fromCharCode(65 + i)}
                                    </Avatar>
                                ))}
                            </AvatarGroup>
                        </CardContent>
                    </Card>
                </Box>

                {/* Monthly Earnings with Chart */}
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Monthly Earnings
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                                $10,069
                            </Typography>
                            <ResponsiveContainer width="100%" height={80}>
                                <BarChart data={monthlyEarningsData}>
                                    <Bar dataKey="amount" fill="#e91e63" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                            <Typography variant="caption" color="text.secondary">
                                data-1
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* All Members with Pie Chart */}
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                All Members
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                6900
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <ResponsiveContainer width={80} height={80}>
                                    <PieChart>
                                        <Pie
                                            data={membersPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={20}
                                            outerRadius={35}
                                            dataKey="value"
                                        >
                                            {membersPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <Box>
                                    {membersPieData.map((item) => (
                                        <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: 1 }} />
                                            <Typography variant="caption">{item.name}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Middle Row */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                {/* Total Earnings */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Total Earnings
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                                $10,069
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                <ResponsiveContainer width={120} height={120}>
                                    <PieChart>
                                        <Pie
                                            data={earningsPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            dataKey="value"
                                        >
                                            {earningsPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <Box>
                                    {earningsPieData.map((item) => (
                                        <Box key={item.name} sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: 1 }} />
                                                <Typography variant="caption">{item.name}</Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(item.value / 10069) * 100}
                                                sx={{ height: 6, borderRadius: 3, bgcolor: 'grey.200' }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Live Visitors */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                    <Card sx={{ bgcolor: '#e3f2fd' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    Live Visitors
                                </Typography>
                                <Chip
                                    label="LIVE"
                                    size="small"
                                    icon={<FiberManualRecord sx={{ fontSize: 12 }} />}
                                    sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 'bold' }}
                                />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Currently Active Users
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                3600
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Currently 3600 visits survey in your website
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Leads & Enquiry */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                    <Card sx={{ bgcolor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Leads & Enquiry
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                28
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {['A', 'J', 'B', 'E', 'D', 'U', 'M'].map((letter) => (
                                    <Avatar
                                        key={letter}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: 'white',
                                            color: 'text.primary',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            border: '2px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        {letter}
                                    </Avatar>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Template Update Status */}
            <Box sx={{ mb: 3 }}>
                <Card
                    sx={{
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                        color: 'white',
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ flex: 1, minWidth: 200 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Template Update Status
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        • Current version you installed: <strong>3.6</strong>
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        • Latest version: <strong>4.2</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        • Template Activation: <strong>Yes</strong>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ fontSize: 60 }}>📧</Box>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#e91e63',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        px: 4,
                                        '&:hover': { bgcolor: '#c2185b' },
                                    }}
                                >
                                    Update
                                </Button>
                                <Button variant="text" sx={{ color: 'white', textDecoration: 'underline' }}>
                                    More details
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Tables Row */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {/* Recent Members Table */}
                <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Recent members
                                </Typography>
                                <IconButton size="small">
                                    <MoreVert />
                                </IconButton>
                            </Box>
                            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                Recently added members
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NO</TableCell>
                                            <TableCell>PROFILE</TableCell>
                                            <TableCell>PHONE</TableCell>
                                            <TableCell>JOIN DATE</TableCell>
                                            <TableCell>PLAN TYPE</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell>{member.id}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 32, height: 32 }}>{member.name[0]}</Avatar>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight="600">
                                                                {member.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {member.email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption">{member.phone}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption">{member.joinDate}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={member.plan} size="small" color="success" />
                                                </TableCell>
                                                <TableCell>
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

                {/* Renewal Reminder Table */}
                <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Renewal Reminder
                                </Typography>
                                <IconButton size="small">
                                    <MoreVert />
                                </IconButton>
                            </Box>
                            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                Below profile will expiry soon.
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NO</TableCell>
                                            <TableCell>PROFILE</TableCell>
                                            <TableCell>PHONE</TableCell>
                                            <TableCell>EXPIRY DATE</TableCell>
                                            <TableCell>PLAN TYPE</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renewalReminders.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell>{member.id}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 32, height: 32 }}>{member.name[0]}</Avatar>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight="600">
                                                                {member.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {member.email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption">{member.phone}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={member.expiryDate}
                                                        size="small"
                                                        sx={{ bgcolor: '#ffebee', color: '#d32f2f', fontWeight: 600 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={member.plan} size="small" color="success" />
                                                </TableCell>
                                                <TableCell>
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
            </Box>
        </Box>
    );
};

export default Dashboard;
