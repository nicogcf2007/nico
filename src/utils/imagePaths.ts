/**
 * Utilidad para manejar rutas de imágenes en Next.js con basePath
 */

/**
 * Obtiene la ruta correcta para una imagen considerando el basePath de Next.js
 */
export const getImagePath = (imagePath: string | { src: string } | any): string => {
  // Si es un objeto de Next.js con src, extraer la propiedad src
  if (imagePath && typeof imagePath === 'object' && imagePath.src) {
    return imagePath.src;
  }
  
  // Validar que imagePath sea un string válido
  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('getImagePath received invalid imagePath:', imagePath);
    return '/images/logo2.png'; // Imagen por defecto
  }
  
  // Si ya es una URL completa, data URL o protocolo relativo, no modificar
  if (imagePath.startsWith('http') || imagePath.startsWith('data:') || imagePath.startsWith('//')) {
    return imagePath;
  }
  
  // En desarrollo, usar la ruta directa
  if (process.env.NODE_ENV === 'development') {
    return imagePath;
  }
  
  // En producción, aplicar el basePath
  const basePath = '/NRDev';
  return `${basePath}${imagePath}`;
};

/**
 * Lista de imágenes del proyecto para verificación
 */
export const PROJECT_IMAGES = {
  logo: '/images/logo2.png',
  logoAlt: '/images/logo.png',
  // Agregar más imágenes según sea necesario
} as const; 