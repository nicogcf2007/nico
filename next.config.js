/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Para GitHub Pages, NO usar basePath ni assetPrefix cuando usas GitHub Actions
  // porque GitHub Actions configura esto automáticamente
}

module.exports = nextConfig