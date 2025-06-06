import type { Metadata } from 'next'
import '../index.css'
import SmoothScroll from '../components/SmoothScroll'

export const metadata: Metadata = {
  title: 'NRDev Portfolio',
  description: 'Portfolio personal de Nicolas Rojas - Desarrollador Full Stack especializado en React, Next.js y Three.js',
  keywords: 'portfolio, desarrollador, full stack, react, next.js, three.js, typescript',
  authors: [{ name: 'Nicolas Rojas' }],
  openGraph: {
    title: 'NRDev Portfolio',
    description: 'Portfolio personal de Nicolas Rojas - Desarrollador Full Stack',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

