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
    const [isMobile, setIsMobile] = React.useState(() => {
        // Inicializar con el valor correcto desde el principio
        if (typeof window === 'undefined') return false;
        return isMobileDevice();
    });
    
    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        
        const checkMobile = () => {
            // Cancelar el timeout anterior si existe
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            // Throttle: solo verificar después de que el usuario haya dejado de cambiar el tamaño por 300ms
            timeoutId = setTimeout(() => {
                const newIsMobile = isMobileDevice();
                setIsMobile(prevIsMobile => {
                    // Solo actualizar si realmente cambió
                    if (prevIsMobile !== newIsMobile) {
                        return newIsMobile;
                    }
                    return prevIsMobile;
                });
            }, 300);
        };
        
        // Verificar una vez al montar por si el valor inicial cambió
        checkMobile();
        
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => {
            window.removeEventListener('resize', checkMobile);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);
    
    return isMobile;
}; 