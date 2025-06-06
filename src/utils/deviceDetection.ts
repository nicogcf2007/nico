import * as React from 'react';

/**
 * Utilidades para detección de dispositivos y capacidades del navegador
 */

/**
 * Detecta si el dispositivo actual es móvil
 */
export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth < 768 ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
};

/**
 * Detecta si el dispositivo es de gama baja basado en cores del CPU y tipo
 */
export const isLowEndDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const isMobile = isMobileDevice();
    return isMobile && (
        /Android.*(?:(?:SM-[JG])|(?:GT-[IP])|(?:LG-)|(?:SAMSUNG))/i.test(navigator.userAgent) ||
        navigator.hardwareConcurrency < 4
    );
};

/**
 * Hook para usar la detección de dispositivo móvil con React
 */
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(isMobileDevice());
        checkMobile();
        
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return isMobile;
}; 