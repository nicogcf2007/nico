import React, { useEffect, useRef } from 'react';
import { LanguageTranslations } from '../utils/translations';
import { Heart, Code, Coffee, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const footerRef = useRef<HTMLElement>(null);
  const authorRef = useRef<HTMLHeadingElement>(null);
  const madeWithRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const heroElement = document.getElementById('inicio');
    if (heroElement) {
      // Usar Lenis para scroll suave si está disponible
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(heroElement, {
          offset: 0,
          duration: 1.0, // Un poco más lento para ir hasta arriba
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // easeOutExpo
        });
      } else {
        heroElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Fallback a scroll al top de la página
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const allTweens: gsap.core.Tween[] = [];
    const allScrollTriggers: ScrollTrigger[] = [];

    const isMobile = isMobileDevice();

    // Configuración optimizada para móvil y performance del footer
    const config = {
      duration: isMobile ? 0.4 : 0.6, // Duración más corta
      stagger: isMobile ? 0.05 : 0.08, // Stagger más rápido
      yDistance: isMobile ? 10 : 15, // Distancia reducida
      scale: isMobile ? 0.98 : 0.95
    };

    // Animación del contenedor principal
    if (footerRef.current) {
      allTweens.push(gsap.to(footerRef.current, { 
        opacity: 1, 
        duration: 0.3, 
        delay: 0.02, // Delay reducido
        ease: 'sine.out'
      }));
    }

    // Título del autor
    if (authorRef.current) {
      const tween = gsap.fromTo(authorRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out',
          scrollTrigger: { 
            trigger: authorRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // "Made with" section - Sin delay
    if (madeWithRef.current) {
      const tween = gsap.fromTo(madeWithRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out', delay: 0.05, // Delay mínimo
          scrollTrigger: { 
            trigger: madeWithRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Divider - Animación más rápida
    if (dividerRef.current) {
      const tween = gsap.fromTo(dividerRef.current,
        { opacity: 0, scaleX: 0 },
        { 
          opacity: 1, scaleX: 1, duration: config.duration * 0.8, ease: 'power2.out', delay: 0.1, // Delay reducido
          scrollTrigger: { 
            trigger: dividerRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Technologies section - Se activa antes
    if (techRef.current) {
      const tween = gsap.fromTo(techRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { 
            trigger: techRef.current, 
            start: isMobile ? 'top 98%' : 'top 92%', // Se activa mucho antes
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Back to top button - Se activa antes para mejor flujo
    if (backToTopRef.current) {
      const tween = gsap.fromTo(backToTopRef.current,
        { opacity: 0, y: config.yDistance, scale: config.scale },
        { 
          opacity: 1, y: 0, scale: 1, duration: config.duration, ease: 'back.out(1.2)', delay: 0.2,
          scrollTrigger: { 
            trigger: backToTopRef.current, 
            start: isMobile ? 'top 98%' : 'top 92%', // Se activa antes también
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Copyright - Delay reducido
    if (copyrightRef.current) {
      const tween = gsap.fromTo(copyrightRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out', delay: 0.25, // Era 0.5, ahora es 0.25
          scrollTrigger: { 
            trigger: copyrightRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    return () => {
      allTweens.forEach(tween => tween.kill());
      allScrollTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative text-center py-8 border-t border-border/50 overflow-hidden bg-background/50 backdrop-blur-sm" style={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
      
      <div className="relative z-10 px-4 mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h3 ref={authorRef} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-border-accent" style={{ opacity: 0 }}>
            {t.footer.author}
          </h3>
          
          <div ref={madeWithRef} className="flex items-center gap-2 text-text-secondary text-sm" style={{ opacity: 0 }}>
            <span>{t.footer.madeWith.text1}</span>
            <Heart size={16} className="text-red-400" />
            <span>{t.footer.madeWith.text2}</span>
            <Coffee size={16} className="text-amber-400" />
            <span>{t.footer.madeWith.text3}</span>
            <Code size={16} className="text-blue-400" />
          </div>
          
          <div ref={dividerRef} className="w-24 h-px bg-gradient-to-r from-transparent via-border-accent/50 to-transparent my-2" style={{ opacity: 0 }}></div>
          
          <div ref={techRef} className="text-xs text-text-secondary/80" style={{ opacity: 0 }}>
            <p>{t.footer.builtWith} <span className="font-semibold text-text-secondary">{t.footer.technologies}</span></p>
          </div>
          
          {/* Botón de volver al inicio */}
          <button
            ref={backToTopRef}
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 text-xs text-text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-105 rounded-full hover:bg-white/5"
            style={{ opacity: 0 }}
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span>{t.footer.backToTop}</span>
          </button>
          
          <div ref={copyrightRef} className="text-xs text-text-secondary/50 mt-2" style={{ opacity: 0 }}>
            <p>© {currentYear} {t.footer.author}. {t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;