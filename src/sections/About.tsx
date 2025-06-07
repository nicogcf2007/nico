import React, { useEffect, useRef } from 'react';
import SkillCard from '../components/SkillCard';
import { LanguageTranslations, ExperienceDetail } from '../utils/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const About: React.FC<AboutProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement>(null);
  const experienceContainerRef = useRef<HTMLDivElement>(null);

  const skillData = [
    {
      title: t.about.skillCategories?.webFrontend ?? "Web Frontend",
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
      icon: <span className="text-xl">💻</span>
    },
    {
      title: t.about.skillCategories?.appDevelopment ?? "Application Development",
      skills: ['React Native', 'Expo', 'Solito', 'Tamagui', 'Electron'],
      icon: <span className="text-xl">📱</span>
    },
    {
      title: t.about.skillCategories?.backend ?? "Backend",
      skills: ['Node.js', 'Express.js', 'WebSockets', 'FastAPI', 'Django REST framework', 'Python', 'PHP'],
      icon: <span className="text-xl">⚙️</span>
    },
    {
      title: t.about.skillCategories?.databases ?? "Databases & BaaS",
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'DBeaver Community'],
      icon: <span className="text-xl">🗄️</span>
    },
    {
      title: t.about.skillCategories?.devopsPlatforms ?? "DevOps & Platforms",
      skills: ['Git', 'Docker', 'Amazon Web Services (AWS)', 'Linux', 'SSH', 'Postman', 'n8n', 'WordPress'],
      icon: <span className="text-xl">🛠️</span>
    },
    {
      title: t.about.skillCategories.softSkills,
      skills: t.about.softSkillsList,
      icon: <span className="text-xl">🧠</span>
    },
  ];

  const experienceDetails: readonly ExperienceDetail[] = t.about.experienceDetails;

  useEffect(() => {
    const allTweens: gsap.core.Tween[] = [];
    const allScrollTriggers: ScrollTrigger[] = [];

    const isMobile = isMobileDevice();

    // Configuración optimizada para móvil y rendimiento
    const config = {
      duration: isMobile ? 0.5 : 0.8, // Duración más corta para mejor rendimiento
      stagger: isMobile ? 0.08 : 0.12, // Stagger más rápido
      yDistance: isMobile ? 15 : 25, // Distancia reducida
      scale: isMobile ? 0.95 : 0.9 // Escala menos extrema
    };

    // Animación del contenedor principal
    if (sectionRef.current) {
      allTweens.push(gsap.to(sectionRef.current, { 
        opacity: 1, 
        duration: 0.3, 
        delay: 0.05,
        ease: 'sine.out'
      }));
    }

    // Título principal con ScrollTrigger
    if (titleRef.current) {
      const tween = gsap.fromTo(titleRef.current,
        { opacity: 0, y: isMobile ? 30 : 50 },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out',
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: isMobile ? 'top 95%' : 'top 90%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1 // Menor prioridad para optimización
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
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out',
          scrollTrigger: { 
            trigger: descriptionRef.current, 
            start: isMobile ? 'top 95%' : 'top 90%', 
            toggleActions: 'restart none none reverse',
            fastScrollEnd: true,
            refreshPriority: -1
          }
        }
      );
      allTweens.push(tween);
      if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
    }

    // Título de habilidades
    if (skillsTitleRef.current) {
      const tween = gsap.fromTo(skillsTitleRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out',
          scrollTrigger: { 
            trigger: skillsTitleRef.current, 
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

    // Cards de habilidades - OPTIMIZADAS con efecto POP
    if (skillsGridRef.current) {
      const skillCards = gsap.utils.toArray('.gsap-skill-card');
      if (skillCards.length > 0) {
        // Configurar will-change para optimización GPU
        gsap.set(skillCards, { 
          willChange: 'transform, opacity',
          force3D: true // Forzar aceleración GPU
        });

        const tween = gsap.fromTo(skillCards,
          { 
            opacity: 0, 
            y: config.yDistance, 
            scale: 0.8, // Escala más pequeña para efecto pop
            rotationY: -15, // Rotación en Y para efecto 3D
            transformOrigin: 'center center'
          },
          {
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotationY: 0,
            stagger: {
              amount: config.stagger * skillCards.length,
              from: 'start',
              ease: 'power2.out'
            },
            duration: config.duration * 1.2, // Duración ligeramente mayor para el efecto pop
            ease: 'back.out(2.5)', // Efecto bounce más pronunciado
            scrollTrigger: { 
              trigger: skillsGridRef.current, 
              start: isMobile ? 'top 85%' : 'top 80%', 
              toggleActions: 'restart none none reverse',
              fastScrollEnd: true,
              refreshPriority: -1
            },
            onComplete: () => {
              // Limpiar will-change después de la animación
              gsap.set(skillCards, { willChange: 'auto' });
            }
          }
        );
        allTweens.push(tween);
        if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
      }
    }

    // Título de experiencia
    if (experienceTitleRef.current) {
      const tween = gsap.fromTo(experienceTitleRef.current,
        { opacity: 0, y: config.yDistance },
        { 
          opacity: 1, y: 0, duration: config.duration, ease: 'power2.out',
          scrollTrigger: { 
            trigger: experienceTitleRef.current, 
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

    // Cards de experiencia - OPTIMIZADAS
    if (experienceContainerRef.current) {
      const experienceCards = gsap.utils.toArray('.gsap-experience-card');
      if (experienceCards.length > 0) {
        // Configurar will-change para optimización GPU
        gsap.set(experienceCards, { 
          willChange: 'transform, opacity',
          force3D: true
        });

        const tween = gsap.fromTo(experienceCards,
          { 
            opacity: 0, 
            y: config.yDistance, 
            scale: config.scale,
            transformOrigin: 'center center'
          },
          {
            opacity: 1, 
            y: 0, 
            scale: 1, 
            stagger: config.stagger,
            duration: config.duration, 
            ease: 'power2.out',
            scrollTrigger: { 
              trigger: experienceContainerRef.current, 
              start: isMobile ? 'top 85%' : 'top 80%', 
              toggleActions: 'restart none none reverse',
              fastScrollEnd: true,
              refreshPriority: -1
            },
            onComplete: () => {
              gsap.set(experienceCards, { willChange: 'auto' });
            }
          }
        );
        allTweens.push(tween);
        if (tween.scrollTrigger) allScrollTriggers.push(tween.scrollTrigger);
      }
    }

    return () => {
      allTweens.forEach(tween => tween.kill());
      allScrollTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-24 px-4 sm:py-32" 
    >
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            {t.about.title}
          </h2>
          <p ref={descriptionRef} className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* Sección de Habilidades */}
        <div className="mb-20">
          <h3 ref={skillsTitleRef} className="text-2xl sm:text-3xl font-bold text-center mb-8 text-text-primary">
            {t.about.skillsTitle}
          </h3>
          <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillData.map((category) => (
              <SkillCard
                key={category.title}
                title={category.title}
                skills={category.skills}
                icon={category.icon}
                className="gsap-skill-card"
              />
            ))}
          </div>
        </div>

        {/* Sección de Experiencia */}
        <div>
          <h3 ref={experienceTitleRef} className="text-2xl sm:text-3xl font-bold text-center mb-10 text-text-primary">
            {t.about.experienceTitle}
          </h3>
          <div ref={experienceContainerRef} className="relative space-y-12">
            {/* Línea de tiempo vertical */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            {experienceDetails.map((exp, index) => (
              <div
                key={index}
                className={`gsap-experience-card md:flex items-center w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Contenido de la tarjeta */}
                <div className={`w-full md:w-5/12 p-6 bg-surface rounded-lg shadow-lg border border-transparent hover:border-border-accent/50 transition-colors duration-300 ${
                  index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'
                }`}>
                  <h4 className="text-xl font-bold text-text-primary">{exp.role}</h4>
                  <p className="text-md text-accent-light mb-2">{exp.company}</p>
                  <p className="text-sm text-text-secondary mb-3">{exp.date}</p>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Punto en la línea de tiempo (escritorio) */}
                <div className="hidden md:flex justify-center w-2/12">
                  <div className="w-4 h-4 rounded-full bg-accent border-2 border-background shadow-md"></div>
                </div>

                {/* Espacio en blanco (escritorio) */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;