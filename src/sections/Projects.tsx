'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getProjects, Project } from '../utils/projects';
import { VideoPopup, CodeNotAvailablePopup, ImagePopup, DescriptionPopup } from '../components/PopUps';
import OptimizedImage from '../components/OptimizedImage';
import { ExternalLink, Video, Github, ArrowUpRight, Play, Code2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline>();
  
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [codeNotAvailablePopupOpen, setCodeNotAvailablePopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [descriptionPopupOpen, setDescriptionPopupOpen] = useState(false);
  const [currentProjectDetails, setCurrentProjectDetails] = useState<{ title: string; description: string } | null>(null);

  const projects = useMemo(() => getProjects(language), [language]);

  const openImagePopup = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setImagePopupOpen(true);
  };

  const openDescriptionPopup = (project: Project) => {
    setCurrentProjectDetails({ title: project.title, description: project.description });
    setDescriptionPopupOpen(true);
  };

  const updateProgress = useCallback((index: number) => {
    setCurrentProjectIndex(index);
  }, []);

  const projectCardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    projectCardsRef.current = gsap.utils.toArray('.gsap-project-card') as HTMLElement[];
  }, [projects]);


  const goToProject = (index: number) => {
    if (masterTimelineRef.current) {
      // Find the correct scroll position in the timeline
      // This is a simplified example. A more robust solution might be needed.
      const scrollTrigger = masterTimelineRef.current.scrollTrigger;
      if (scrollTrigger) {
        const projectCards = projectCardsRef.current;
        if (projectCards.length > 0) {
          const isMobile = window.innerWidth < 1024;
          let accumulatedX = 0;
          for (let i = 1; i <= index; i++) {
            const prevCard = projectCards[i-1];
            const card = projectCards[i];
            const cardWidth = prevCard.offsetWidth;
            const gap = isMobile ? 40 : 80;
            const moveDistance = cardWidth / 2 + card.offsetWidth / 2 + gap;
            accumulatedX += moveDistance;
          }
          
          const totalScroll = scrollTrigger.end - scrollTrigger.start;
          const containerWidth = gridRef.current?.offsetWidth || 0;
          const totalWidth = (projectCards[projectCards.length - 1] as HTMLElement).offsetLeft + (projectCards[projectCards.length-1] as HTMLElement).offsetWidth - (projectCards[0] as HTMLElement).offsetLeft;
          
          const progress = accumulatedX / (totalWidth - containerWidth);

          gsap.to(window, { 
            scrollTo: { y: scrollTrigger.start + totalScroll * progress, autoKill: false },
            duration: 1,
            ease: 'power2.inOut'
          });
        }
      }
    }
  };


  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      const projectCards = projectCardsRef.current;
      const numProjects = projectCards.length;
      
      if (!gridRef.current || !sectionRef.current || numProjects === 0) return;

      const projectsContainer = gridRef.current;
      gsap.set(projectCards, { transformOrigin: 'center center' });

      const setActiveCard = (activeIndex: number) => {
        projectCards.forEach((card, index) => {
          const isActive = (index === activeIndex);
          gsap.killTweensOf(card);
          gsap.to(card, {
            scale: isActive ? 1 : 0.88,
            opacity: isActive ? 1 : 0.4,
            filter: isActive ? 'blur(0px)' : 'blur(2px)',
            duration: 0.8,
            ease: 'power3.out',
          });
        });
        updateProgress(activeIndex);
      };
      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          start: 'center center',
          end: () => `+=${numProjects * (isMobile ? 800 : 1000)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Find which card should be active based on progress
            // This is a rough estimation
            const progress = self.progress;
            const activeIndex = Math.floor(progress * numProjects);
            // setActiveCard(Math.min(activeIndex, numProjects - 1));
          }
        }
      });
      
      masterTimelineRef.current = timeline;

      timeline.call(() => setActiveCard(0)).to({}, { duration: 0.5 }); // Pinned duration

      let accumulatedX = 0;
      projectCards.forEach((card, index) => {
        if (index > 0) {
          const prevCard = projectCards[index - 1];
          const cardWidth = prevCard.offsetWidth;
          const gap = isMobile ? 40 : 80;
          const moveDistance = (cardWidth / 2) + (card.offsetWidth / 2) + gap;
          accumulatedX += moveDistance;
          
          timeline
            .to(projectsContainer, {
               x: -accumulatedX,
               duration: 1,
               ease: 'power2.inOut',
               onStart: () => setActiveCard(index),
               onReverseComplete: () => setActiveCard(index - 1),
            })
            .to({}, { duration: 0.5 }); // Pinned duration
        }
      });

    });

    return () => ctx.revert();
  }, [language, projects.length, updateProgress]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-light/5 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-light/10 via-transparent to-transparent" />
      
      <div className="mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 ref={titleRef} className="mb-4 text-3xl font-bold md:text-4xl text-text-primary px-4 max-w-7xl mx-auto">
            {t.projects.title}
          </h2>
        </div>
        
        <div className="relative h-[60vh] lg:h-[65vh] flex items-center">
            <div 
              ref={gridRef} 
              className="flex items-center gap-10 lg:gap-20 px-[5vw] sm:px-[10vw] md:px-[15vw]"
            >
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="gsap-project-card flex-shrink-0 w-[90vw] sm:w-[80vw] md:w-[70vw] max-w-4xl"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface/80 via-surface/60 to-surface/40 backdrop-blur-xl border border-border/30 shadow-2xl h-full flex flex-col">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center h-full p-4 sm:p-6 md:p-8">
                      <div className="lg:order-2 flex items-center justify-center max-h-[25vh] lg:max-h-full">
                        <div className="relative group/image w-full aspect-video">
                          <OptimizedImage
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl cursor-pointer transition-all duration-700 hover:scale-105 shadow-lg hover:shadow-2xl ring-1 ring-border/20"
                            onClick={() => openImagePopup(project.image)}
                            title={t.projects.clickToEnlarge}
                            quality={90}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500 rounded-xl flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 md:p-4 transform scale-75 group-hover/image:scale-100 transition-all duration-500 shadow-lg">
                              <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:order-1 flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4 pt-4 lg:pt-0 pb-4">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                          {project.title}
                        </h3>
                        
                        <div className="flex-grow">
                          <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div className="!mt-auto pt-2">
                          <button 
                            onClick={() => openDescriptionPopup(project)} 
                            className="inline-flex items-center text-xs sm:text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                          >
                            <BookOpen size={14} className="mr-2"/>
                            {t.projects.readMore}
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-surface/90 to-surface/70 text-text-secondary border border-border/40 hover:border-accent-light/40 hover:text-accent-light transition-all duration-300 cursor-default backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-accent-light/10 to-accent-light/5 text-accent-light border border-accent-light/30 cursor-default backdrop-blur-sm shadow-sm">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-accent-light to-accent-light/80 text-white font-semibold rounded-lg sm:rounded-xl hover:from-accent-light/90 hover:to-accent-light/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn text-xs sm:text-sm"
                            >
                              {t.projects.demo} 
                              <ExternalLink size={14} className="ml-1.5 sm:ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                            </a>
                          )}
                          {project.videoUrl && (
                            <button
                              onClick={() => {
                                setCurrentVideoUrl(project.videoUrl!);
                                setVideoPopupOpen(true);
                              }}
                              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-surface/90 to-surface/70 text-text-primary font-semibold rounded-lg sm:rounded-xl border border-border/40 hover:border-accent-light/50 hover:bg-gradient-to-r hover:from-accent-light/15 hover:to-accent-light/10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group/btn backdrop-blur-sm text-xs sm:text-sm"
                            >
                              <Play size={14} className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
                              Video
                            </button>
                          )}
                          {project.codeUrl ? (
                            <a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-surface/90 to-surface/70 text-text-primary font-semibold rounded-lg sm:rounded-xl border border-border/40 hover:border-accent-light/50 hover:bg-gradient-to-r hover:from-accent-light/15 hover:to-accent-light/10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group/btn backdrop-blur-sm text-xs sm:text-sm"
                            >
                              <Code2 size={14} className="mr-1.5 group-hover/btn:rotate-12 transition-transform duration-300" />
                              Code
                            </a>
                          ) : (
                            <button
                              onClick={() => setCodeNotAvailablePopupOpen(true)}
                              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-surface/90 to-surface/70 text-text-primary font-semibold rounded-lg sm:rounded-xl border border-border/40 hover:border-accent-light/50 hover:bg-gradient-to-r hover:from-accent-light/15 hover:to-accent-light/10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group/btn backdrop-blur-sm text-xs sm:text-sm"
                            >
                              <Code2 size={14} className="mr-1.5 group-hover/btn:rotate-12 transition-transform duration-300" />
                              Code
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Indicador de progreso lateral para desktop */}
            <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-2 h-8 rounded-full transition-all duration-500 ${
                    index === currentProjectIndex 
                      ? 'bg-accent-light shadow-lg shadow-accent-light/30' 
                      : 'bg-surface/40 hover:bg-surface/60'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
        </div>

        {/* Indicador de progreso inferior para móvil */}
        <div className="lg:hidden absolute bottom-[-8vh] left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {projects.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToProject(index)}
              className={`w-6 h-2 rounded-full transition-all duration-300 ${currentProjectIndex === index ? 'bg-accent w-8' : 'bg-gray-500/50'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <VideoPopup
        isOpen={videoPopupOpen}
        onClose={() => setVideoPopupOpen(false)}
        videoUrl={currentVideoUrl}
      />
      <CodeNotAvailablePopup
        isOpen={codeNotAvailablePopupOpen}
        onClose={() => setCodeNotAvailablePopupOpen(false)}
      />
      <ImagePopup
        isOpen={imagePopupOpen}
        onClose={() => setImagePopupOpen(false)}
        imageUrl={currentImageUrl}
      />

      {descriptionPopupOpen && currentProjectDetails && (
        <DescriptionPopup
          isOpen={descriptionPopupOpen}
          onClose={() => setDescriptionPopupOpen(false)}
          title={currentProjectDetails.title}
          description={currentProjectDetails.description}
        />
      )}

      <style jsx>{`
        :global(body) {
          overflow-x: hidden;
        }
        :global(.gsap-project-card) {
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  );
};

export default Projects;