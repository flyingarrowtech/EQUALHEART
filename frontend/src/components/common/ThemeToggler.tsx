import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '../../store/useThemeStore';

const ThemeToggler: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 sx={{ color: '#ffea00' }} /> : <Brightness4 />}
        </IconButton>
    );
};

export default ThemeToggler;
