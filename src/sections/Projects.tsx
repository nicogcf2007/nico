'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getProjects } from '../utils/projects';
import { VideoPopup, CodeNotAvailablePopup, ImagePopup } from '../components/PopUps';
import OptimizedImage from '../components/OptimizedImage';
import { ExternalLink, Video, Github } from 'lucide-react';
import { LanguageTranslations } from '../utils/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  t: LanguageTranslations[keyof LanguageTranslations];
  language: keyof LanguageTranslations;
}

const Projects: React.FC<ProjectsProps> = ({ t, language }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [codeNotAvailablePopupOpen, setCodeNotAvailablePopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const projects = useMemo(() => getProjects(language), [language]);

  const openImagePopup = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setImagePopupOpen(true);
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

    // Título con ScrollTrigger
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

    // Cards de proyectos
    if (gridRef.current) {
      const projectCards = gsap.utils.toArray('.gsap-project-card');
      if (projectCards.length > 0) {
        const tween = gsap.fromTo(projectCards,
          { opacity: 0, y: config.yDistance, scale: config.scale },
          {
            opacity: 1, y: 0, scale: 1, stagger: config.stagger,
            duration: config.duration, ease: 'power1.out',
            scrollTrigger: { 
              trigger: gridRef.current, 
              start: isMobile ? 'top 90%' : 'top 85%', 
              toggleActions: 'restart none none reverse',
              fastScrollEnd: true
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
    <section ref={sectionRef} id="projects" className="py-20" style={{ opacity: 0 }}>
      <div className="px-4 mx-auto max-w-6xl">
        <h2 ref={titleRef} className="mb-12 text-3xl font-bold text-center md:text-4xl text-gray-100" style={{ opacity: 0 }}>
          {t.projects.title}
        </h2>
        <div ref={gridRef} className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="gsap-project-card overflow-hidden rounded-lg border shadow-md transition-all duration-300 bg-gray-800/35 border-gray-600/60 hover:border-gray-500/80 hover:shadow-lg hover:-translate-y-1"
              style={{ opacity: 0 }}
            >
              <OptimizedImage
                src={project.image}
                alt={project.title}
                className="aspect-video cursor-pointer"
                onClick={() => openImagePopup(project.image)}
                title="Click para ampliar imagen"
                priority={false}
                quality={80}
              />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-100">
                   {project.title}
                </h3>
                <p className="mb-4 text-gray-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                       key={tech}
                       className="px-3 py-1 text-xs rounded-full border transition-colors duration-200 cursor-default bg-gray-700 text-gray-200 border-gray-600/50 hover:bg-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-colors text-indigo-400 hover:text-indigo-300"
                    >
                      {t.projects.demo} <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                  {project.videoUrl && (
                    <button
                      onClick={() => {
                        setCurrentVideoUrl(project.videoUrl!);
                        setVideoPopupOpen(true);
                      }}
                       className="inline-flex items-center transition-colors text-indigo-400 hover:text-indigo-300"
                    >
                      {t.projects.video} <Video size={16} className="mt-1 ml-1" />
                    </button>
                  )}
                  {project.codeUrl ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-colors text-indigo-400 hover:text-indigo-300"
                    >
                      {t.projects.code} <Github size={16} className="ml-1" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setCodeNotAvailablePopupOpen(true)}
                      className="inline-flex items-center transition-colors text-indigo-400 hover:text-indigo-300"
                    >
                      {t.projects.code} <Github size={16} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <VideoPopup
          isOpen={videoPopupOpen}
          onClose={() => setVideoPopupOpen(false)}
          videoUrl={currentVideoUrl}
          t={t}
        />
        <CodeNotAvailablePopup
          isOpen={codeNotAvailablePopupOpen}
          onClose={() => setCodeNotAvailablePopupOpen(false)}
          t={t}
        />
        <ImagePopup
          isOpen={imagePopupOpen}
          onClose={() => setImagePopupOpen(false)}
          imageUrl={currentImageUrl}
          altText="Vista previa del proyecto"
        />
      </div>
    </section>
  );
};

export default Projects;