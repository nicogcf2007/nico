import React, { useEffect, useRef } from 'react';
import socialLinks from '../utils/contacts';
import { useLanguage } from '../hooks/useLanguage';
import { Download, Eye, Mail, ChevronDown } from 'lucide-react';
// @ts-ignore
import gsap from 'gsap';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Usar Lenis para scroll suave si está disponible
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 0.8, // Duración consistente para todas las plataformas
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // easeOutExpo
        });
      } else {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animar la aparición del contenedor principal
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1 });
    }

    // Secuencia de animaciones
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
        '-=0.4'
      );
    }

    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      tl.fromTo(buttons, 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, 
        '-=0.3'
      );
    }

    if (socialRef.current) {
      const socialLinks = socialRef.current.children;
      tl.fromTo(socialLinks, 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, 
        '-=0.2'
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current, 
        { opacity: 0, y: 30, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 
        '-=0.1'
      );
      
      // Animación de rebote continua más llamativa
      gsap.to(scrollIndicatorRef.current.querySelector('.scroll-arrow'), {
        y: 8,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });

      // Animación de parpadeo sutil para el texto
      gsap.to(scrollIndicatorRef.current.querySelector('span'), {
        opacity: 0.7,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="inicio" 
      className="relative flex flex-col justify-center min-h-screen pt-24 pb-12 sm:pt-16 sm:pb-0" 
      style={{ opacity: 0 }}
    >
      {/* Contenedor principal que se ajusta para móvil y escritorio */}
      <div className="flex flex-col justify-center md:flex-grow-0">
        <div className="px-4 w-full mx-auto max-w-6xl text-center">
          <h1 ref={titleRef} className="mb-4 text-5xl font-bold sm:text-6xl md:text-7xl text-text-primary" style={{ opacity: 0 }}>
            {t.hero.title}{' '}
            <span className="text-accent-light">
              Nicolas
            </span>
          </h1>
          <p ref={subtitleRef} className="mb-8 text-base sm:text-lg md:text-2xl text-text-secondary" style={{ opacity: 0 }}>
            {t.hero.role}
          </p>
          
          {/* Botones de acción */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-accent hover:bg-accent-hover text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ opacity: 0 }}
            >
              <Eye size={20} />
              {t.hero.viewProjects}
            </button>
            
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-surface hover:bg-border text-text-primary rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ opacity: 0 }}
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </a>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="group flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base border-2 border-accent text-accent-light hover:bg-accent hover:text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ opacity: 0 }}
            >
              <Mail size={20} />
              {t.hero.contactMe}
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor unificado para social y scroll en la parte inferior */}
      <div className="w-full flex flex-col items-center gap-4 pt-4 md:pt-8 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2">
        {/* Iconos de redes sociales */}
        <div ref={socialRef} className="flex justify-center gap-x-4">
          {socialLinks.map(([href, icon, hoverColor], index) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 text-text-secondary transition-all duration-300 ease-in-out hover:scale-110"
              style={{ opacity: 0 }}
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-border group-hover:border-border-accent transition-all duration-300 transform group-hover:scale-110 shadow-lg flex items-center justify-center">
                {icon}
                <div className="absolute inset-0 bg-border-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-full bg-border-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          ))}
        </div>

        {/* Indicador de scroll */}
        <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2 text-text-secondary" style={{ opacity: 0 }}>
          <span className="text-xs sm:text-sm font-medium tracking-wide">{t.hero.scrollDown}</span>
          <div className="scroll-arrow flex flex-col items-center">
            <ChevronDown size={24} className="text-accent-light" />
            <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-accent-light/60 to-transparent mt-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;