import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define el tipo de los valores del contexto
interface DarkModeContextType {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

// Proporciona un valor predeterminado para el contexto
const DarkModeContext = createContext<DarkModeContextType>({
    isDarkMode: false,
    setIsDarkMode: () => {},
});

interface DarkModeProviderProps {
    children: ReactNode;
}

const getInitialTheme = (): boolean => {
    if (typeof window !== 'undefined') {
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

// Proveedor del contexto
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    // Efecto para manejar cambios en la preferencia del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (!localStorage.getItem('darkMode')) {
                setIsDarkMode(mediaQuery.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Efecto para aplicar la clase 'dark' en el <html> cuando cambia isDarkMode
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (isDarkMode) {
            htmlElement?.classList.add('dark');
        } else {
            htmlElement?.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useDarkMode = () => useContext(DarkModeContext);