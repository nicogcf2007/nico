import { useState, useEffect } from 'react';

export function useDarkMode() {
    // Función para obtener la preferencia inicial
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            // Primero checa localStorage
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return JSON.parse(saved);
            }

            // Si no hay preferencia guardada, checa la preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark;
        }
        return false;
    };

    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    // Efecto para manejar cambios en la preferencia del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            // Solo actualiza si no hay preferencia guardada en localStorage
            if (!localStorage.getItem('darkMode')) {
                setIsDarkMode(mediaQuery.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Efecto para aplicar los cambios
    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}