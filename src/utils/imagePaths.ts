/**
 * Utilidad para manejar rutas de assets con basePath de Astro
 */

const getBase = () => {
  try {
    return import.meta.env.BASE_URL || '';
  } catch {
    return '';
  }
};

export const getAssetPath = (assetPath: string): string => {
  if (!assetPath || typeof assetPath !== 'string') {
    return assetPath;
  }

  if (assetPath.startsWith('http') || assetPath.startsWith('data:') || assetPath.startsWith('//')) {
    return assetPath;
  }

  const base = getBase();
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (normalizedBase && !assetPath.startsWith(normalizedBase)) {
    return `${normalizedBase}${assetPath}`;
  }
  return assetPath;
};

export const getImagePath = (imagePath: string | any): string => {
  if (imagePath && typeof imagePath === 'object' && imagePath.src) {
    return getAssetPath(imagePath.src);
  }

  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('getImagePath received invalid imagePath:', imagePath);
    return getAssetPath('/images/logo2.png');
  }

  return getAssetPath(imagePath);
};

/**
 * Lista de imágenes del proyecto para verificación
 */
export const PROJECT_IMAGES = {
  logo: '/images/logo2.png',
  logoAlt: '/images/logo.png',
  // Agregar más imágenes según sea necesario
} as const; 