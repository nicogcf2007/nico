'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Navigator from '../sections/Navigator';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import gsap from 'gsap';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animación inicial del logo
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.5, rotate: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotate: 0, 
          duration: 1.2, 
          ease: 'back.out(1.7)', 
          delay: 1.5 // Aparece después de las otras animaciones iniciales
        }
      );
    }
  }, []);

  const scrollToTop = () => {
    // Usar Lenis para scroll suave si está disponible
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Logo fijo en esquina inferior derecha */}
      <div ref={logoRef} className="fixed bottom-1 right-1 z-50" style={{ opacity: 0 }}>
        <button
          onClick={scrollToTop}
          className="group relative"
          aria-label={t.common.backToTop}
        >
          <div className="p-1 relative w-10 h-10 rounded-full overflow-hidden border-2 border-border group-hover:border-border-accent transition-all duration-300 transform group-hover:scale-110 shadow-lg">
            <img 
              src="/logo.png" 
              alt="NRD Logo" 
              className="w-full h-full object-cover"
              width={48}
              height={48}
            />
            <div className="absolute inset-0 bg-border-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          {/* Efecto de brillo */}
          <div className="absolute inset-0 rounded-full bg-border-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>
      
      <Navigator />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
        {children}
      </main>
      <Footer />
    </>
  );
}

