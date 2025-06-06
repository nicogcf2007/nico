'use client';

import { useEffect, useState, useRef } from 'react';
import { LanguageTranslations, Translations } from '../utils/translations';
import { Globe, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { isMobileDevice } from '../utils/deviceDetection';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type NavigatorProps = {
  t: Translations;
  language: keyof LanguageTranslations;
  setLanguage: (value: keyof LanguageTranslations) => void;
};

const Navigator: React.FC<NavigatorProps> = ({ t, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  // Detectar dispositivo móvil solo en el cliente
  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Inicializar Lenis solo si no existe
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        autoRaf: true,
        duration: isMobile ? 0.8 : 1.2,
        lerp: isMobile ? 0.15 : 0.1,
        smoothWheel: !isMobile,
        touchMultiplier: isMobile ? 1.5 : 2,
      });

      // Exponer Lenis globalmente para que otros componentes puedan usarlo
      (window as any).lenis = lenisRef.current;

      // Sincronizar Lenis con GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);

      // Listener para actualizar el progreso de scroll
      lenisRef.current.on('scroll', (e: any) => {
        const progress = (e.animatedScroll / e.limit) * 100;
        setScrollProgress(Math.min(progress, 100));
        
        // Actualizar línea de progreso con requestAnimationFrame
        if (progressLineRef.current) {
          requestAnimationFrame(() => {
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;
            }
          });
        }
      });

      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Animación inicial del navigator - solo opacity para evitar movimiento
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power1.out', delay: 0.2 }
      );
    }

    // Configurar el background como invisible inicialmente
    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, { opacity: 0 });
    }

    // ScrollTriggers para detección de secciones
    const sections = ['inicio', 'about', 'projects', 'contact'];
    
    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    // ScrollTrigger para el background del nav
    ScrollTrigger.create({
      start: 'top -50',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrolled = self.progress > 0;
        setIsScrolled(scrolled);
        
        if (backgroundRef.current) {
          gsap.to(backgroundRef.current, {
            opacity: scrolled ? 1 : 0,
            duration: 0.15,
            ease: 'power1.out'
          });
        }
      },
    });

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, [mounted, isMobile]);

  const handleHover = (element: EventTarget | null, scale: number) => {
    if (element && !isMobile) {
      gsap.to(element, { scale, duration: 0.2, ease: 'power1.out' });
    }
  };

  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    const targetElement = document.getElementById(sectionId);
    if (targetElement && lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: 0,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navigation = [
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact }
  ];

  // Clases base sin condiciones de móvil
  const linkBaseClasses = "relative px-1.5 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap rounded-full transition-all duration-300 group overflow-hidden";
  const buttonBaseClasses = "relative p-1 sm:p-1.5 rounded-full transition-all duration-300 text-gray-400 hover:text-purple-400 group overflow-hidden flex-shrink-0";

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-2 sm:pt-3 px-2">
      <nav
        ref={navRef}
        className="relative flex items-center px-1 sm:px-2 py-1 sm:py-1.5 space-x-1 sm:space-x-2 rounded-full shadow-md max-w-[95vw] overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Background element */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 rounded-full border backdrop-blur-md bg-gray-900/50 border-gray-700/40"
          style={{ zIndex: -1, opacity: 0 }}
        />

        {/* Línea de progreso minimalista */}
        <div className="absolute bottom-0 left-2 right-4 h-0.5 bg-gray-700/20 rounded-full">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 min-w-0 flex-shrink">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(item.id, e)}
              className={`${linkBaseClasses} ${
                activeSection === item.id
                  ? 'bg-gray-700/40 text-gray-200 shadow-md'
                  : 'text-gray-400 hover:text-purple-400'
              } ${mounted && !isMobile ? 'transform hover:scale-105' : ''}`}
              onMouseEnter={(e) => handleHover(e.currentTarget, 1.05)}
              onMouseLeave={(e) => handleHover(e.currentTarget, 1)}
              onMouseDown={(e) => handleHover(e.currentTarget, 0.95)}
              onMouseUp={(e) => handleHover(e.currentTarget, 1.05)}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute inset-0 bg-gray-600/20 rounded-full blur-sm"></div>
              )}
              {activeSection !== item.id && (
                <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              )}
            </a>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-3 sm:h-4 bg-gray-700 flex-shrink-0"></div>

        {/* Resume Button - Solo ícono */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBaseClasses} ${mounted && !isMobile ? 'transform hover:scale-105' : ''}`}
          onMouseEnter={(e) => handleHover(e.currentTarget, 1.05)}
          onMouseLeave={(e) => handleHover(e.currentTarget, 1)}
          aria-label={t.nav.resume}
        >
          <FileText size={14} className="sm:w-4 sm:h-4" />
          <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </a>

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className={`${buttonBaseClasses} ${mounted && !isMobile ? 'transform hover:scale-105' : ''}`}
          onMouseEnter={(e) => handleHover(e.currentTarget, 1.05)}
          onMouseLeave={(e) => handleHover(e.currentTarget, 1)}
          onMouseDown={(e) => handleHover(e.currentTarget, 0.95)}
          onMouseUp={(e) => handleHover(e.currentTarget, 1.05)}
          aria-label={language === 'es' ? t.nav.switchToEnglish : t.nav.switchToSpanish}
        >
          <Globe size={14} className="sm:w-4 sm:h-4" />
          <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </nav>
    </div>
  );
};

export default Navigator;