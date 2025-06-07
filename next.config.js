/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo usar output export para production builds
  ...(process.env.NODE_ENV === 'production' && { 
    output: 'export',
    basePath: '/NRDev',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig 