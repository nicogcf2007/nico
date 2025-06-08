import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);
  const emailSectionRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+573165054616';
    const message = encodeURIComponent(t.contact.whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const allTweens: gsap.core.Tween[] = [];
    const allScrollTriggers: ScrollTrigger[] = [];

    const isMobile = isMobileDevice();

    // Configuración optimizada para móvil
    const config = {
      duration: isMobile ? 0.6 : 1.0,
      stagger: isMobile ? 0.1 : 0.15,
      yDistance: isMobile ? 20 : 30,
      scale: isMobile ? 0.98 : 0.95
    };

    // Animación del contenedor principal
    if (sectionRef.current) {
      allTweens.push(gsap.to(sectionRef.current, { 
        opacity: 1, 
        duration: 0.4, 
        delay: 0.05,
        ease: 'sine.out'
      }));
    }

    // Título principal con ScrollTrigger
    if (titleRef.current) {
      const tween = gsap.fromTo(titleRef.current,
        { opacity: 0, y: isMobile ? 30 : 50 },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power1.out',
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: isMobile ? 'top 95%' : 'top 90%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Contenedor principal
    if (containerRef.current) {
      const tween = gsap.fromTo(containerRef.current,
        { opacity: 0, y: config.yDistance, scale: config.scale },
        { 
          opacity: 1, y: 0, scale: 1, duration: config.duration, ease: 'power1.out',
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Descripción
    if (descriptionRef.current) {
      const tween = gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power1.out', delay: 0.1,
          scrollTrigger: { 
            trigger: descriptionRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Botón de WhatsApp
    if (whatsappButtonRef.current) {
      const tween = gsap.fromTo(whatsappButtonRef.current,
        { opacity: 0, y: config.yDistance, scale: config.scale },
        { 
          opacity: 1, y: 0, scale: 1, duration: config.duration, ease: 'back.out(1.4)', delay: 0.2,
          scrollTrigger: { 
            trigger: whatsappButtonRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Sección de email
    if (emailSectionRef.current) {
      const tween = gsap.fromTo(emailSectionRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power1.out', delay: 0.3,
          scrollTrigger: { 
            trigger: emailSectionRef.current, 
            start: isMobile ? 'top 95%' : 'top 85%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true
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
    <section ref={sectionRef} id="contact" className="relative pt-20 pb-10 z-10">
      <div className="px-4 mx-auto max-w-4xl text-center">
        <h2 ref={titleRef} className="mb-12 text-3xl font-bold text-center md:text-4xl text-text-primary" style={{ opacity: 0 }}>
          {t.contact.title}
        </h2>
        
        <div ref={containerRef} className="p-8 rounded-lg border shadow-md transition-all duration-300 bg-surface/50 border-border hover:border-accent/70 hover:shadow-lg" style={{ opacity: 0 }}>
          <p ref={descriptionRef} className="mb-8 text-text-secondary text-lg" style={{ opacity: 0 }}>
            {t.contact.description}
          </p>
          
          <button
            ref={whatsappButtonRef}
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white rounded-lg transition-all duration-300 bg-green-600 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            style={{ opacity: 0 }}
          >
            <svg 
              className="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488"/>
            </svg>
            {t.contact.whatsappButton}
          </button>
          
          <div ref={emailSectionRef} className="mt-8 text-text-secondary" style={{ opacity: 0 }}>
            <p>{t.contact.emailDescription}</p>
            <a 
              href="mailto:nr7dev@gmail.com" 
              className="text-accent-light hover:text-text-primary transition-colors"
            >
              nr7dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;