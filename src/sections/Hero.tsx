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
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-6 sm:pb-0 lg:px-8" 
      style={{ opacity: 0 }}
    >
      {/* Contenedor único para todo el contenido, gestionando el espaciado con flex y gap */}
      <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8 lg:gap-12">
        
        {/* Bloque de contenido principal */}
        <div className="mx-auto w-full max-w-6xl">
          <h1 ref={titleRef} className="mb-4 text-5xl font-bold text-text-primary sm:text-6xl md:text-7xl lg:mb-8" style={{ opacity: 0 }}>
            {t.hero.title}{' '}
            <span className="text-accent-light">
              Nicolas
            </span>
          </h1>
          <p ref={subtitleRef} className="mb-6 md:mb-8 text-base text-text-secondary sm:text-lg md:text-2xl lg:mb-14" style={{ opacity: 0 }}>
            {t.hero.role}
          </p>
          
          <div ref={buttonsRef} className="flex flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row">
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-accent-hover sm:w-auto sm:px-6 sm:py-3 sm:text-base"
              style={{ opacity: 0 }}
            >
              <Eye size={20} />
              {t.hero.viewProjects}
            </button>
            
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-surface px-5 py-2.5 text-sm text-text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-border sm:w-auto sm:px-6 sm:py-3 sm:text-base"
              style={{ opacity: 0 }}
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </a>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="group flex w-full items-center justify-center gap-2 rounded-lg border-2 border-accent px-5 py-2.5 text-sm text-accent-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-accent hover:text-white sm:w-auto sm:px-6 sm:py-3 sm:text-base"
              style={{ opacity: 0 }}
            >
              <Mail size={20} />
              {t.hero.contactMe}
            </button>
          </div>
        </div>

        {/* Bloque de redes sociales e indicador de scroll */}
        <div className="flex flex-col items-center gap-4 md:gap-8 lg:gap-12">
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
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-border-accent sm:h-10 sm:w-10">
                  {icon}
                  <div className="absolute inset-0 bg-border-accent/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
                {/* Efecto de brillo */}
                <div className="absolute inset-0 -z-10 rounded-full bg-border-accent/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
            ))}
          </div>

          <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2 text-text-secondary" style={{ opacity: 0 }}>
            <span className="text-xs font-medium tracking-wide sm:text-sm">{t.hero.scrollDown}</span>
            <div className="scroll-arrow flex flex-col items-center">
              <ChevronDown size={24} className="text-accent-light" />
              <div className="mt-1 h-6 w-px bg-gradient-to-b from-accent-light/60 to-transparent sm:h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;