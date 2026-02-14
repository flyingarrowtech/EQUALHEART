import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <Box sx={{ py: 2 }}>
            <MUIBreadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to="/"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    Home
                </Link>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const label = value.charAt(0).toUpperCase() + value.slice(1);

                    return last ? (
                        <Typography color="text.primary" key={to}>
                            {label}
                        </Typography>
                    ) : (
                        <Link
                            component={RouterLink}
                            underline="hover"
                            color="inherit"
                            to={to}
                            key={to}
                        >
                            {label}
                        </Link>
                    );
                })}
            </MUIBreadcrumbs>
        </Box>
    );
};

export default Breadcrumbs;
