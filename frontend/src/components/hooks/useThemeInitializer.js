// hooks/useThemeInitializer.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useThemeInitializer = () => {
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        // Apply the theme from Redux store
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
};

export default useThemeInitializer;
