import type { Metadata, Viewport } from 'next'
import SmoothScroll from '../components/SmoothScroll'
import { Inter } from 'next/font/google'
import '../index.css'
import Background from '../sections/Background'
import ClientWrapper from './ClientWrapper'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nicolas Rivera - Desarrollador Full Stack',
  description: 'Portafolio de Nicolas Rivera, desarrollador full stack especializado en React, Next.js, Node.js y más.',
  keywords: 'desarrollador full stack, React, Next.js, Node.js, TypeScript, JavaScript, portfolio',
  authors: [{ name: 'Nicolas Rivera' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Nicolas Rivera - Desarrollador Full Stack',
    description: 'Portafolio de Nicolas Rivera, desarrollador full stack especializado en React, Next.js, Node.js y más.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicolas Rivera - Desarrollador Full Stack',
    description: 'Portafolio de Nicolas Rivera, desarrollador full stack especializado en React, Next.js, Node.js y más.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SmoothScroll />
        <Background />
        <LanguageProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}

