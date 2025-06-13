'use client';

import React, { useState, useMemo } from 'react';
import { getProjects, Project } from '../utils/projects';
import { VideoPopup, CodeNotAvailablePopup, ImagePopup, DescriptionPopup } from '../components/PopUps';
import OptimizedImage from '../components/OptimizedImage';
import { ExternalLink, Video, Github, ArrowUpRight, Play, Code2, BookOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { HorizontalScroll } from '../components/HorizontalScroll';
import SectionBackground from '../components/SectionBackground';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [codeNotAvailablePopupOpen, setCodeNotAvailablePopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
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
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const { sectionRef, trackRef, activeIndex, goToCard } = useHorizontalScroll({
    itemSelector: '.gsap-project-card',
  });

  const baseButtonClass = "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105";
  const primaryButtonClass = "bg-accent/80 text-white hover:bg-accent hover:shadow-lg hover:shadow-accent/30";
  const secondaryButtonClass = "bg-surface/70 text-text-secondary hover:bg-surface hover:text-text-primary border border-border/50 hover:border-border";

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className="gsap-project-card flex-shrink-0 w-[90vw] sm:w-[80vw] md:w-[70vw] max-w-4xl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface/80 via-surface/60 to-surface/40 backdrop-blur-xl border border-border/30 shadow-2xl h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-center h-full p-4 sm:p-6 md:p-8">
          <div className="lg:order-2 flex items-center justify-center max-h-[25vh] lg:max-h-full">
            <div 
              className="relative group/image w-full aspect-video cursor-pointer"
              onClick={() => openImagePopup(project.image)}
            >
              <OptimizedImage
                src={project.image}
                alt={project.title}
                className="rounded-xl transition-all duration-700 group-hover/image:brightness-110 ring-1 ring-border/20 object-contain"
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
          
          <div className="block lg:hidden w-full h-0.5 bg-gradient-to-r from-transparent via-border-accent to-transparent mx-auto mt-5 mb-3" />

          <div className="hidden lg:block lg:order-1 h-full w-0.5 bg-gradient-to-b from-transparent via-border-accent to-transparent self-center mr-4" />

          <div className="lg:order-0 flex flex-col justify-center space-y-1 sm:space-y-3 md:space-y-4 lg:pt-0 pb-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
              {project.title}
            </h3>
            
            <div className="flex-grow">
              <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                {project.shortDescription}
              </p>
            </div>

            <div className="!mt-auto pt-1">
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

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseButtonClass} ${primaryButtonClass}`}
                >
                  <Play size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>{t.projects.demo}</span>
                </a>
              )}
              {project.videoUrl && (
                <button
                  onClick={() => {
                    setCurrentVideoUrl(project.videoUrl!);
                    setVideoPopupOpen(true);
                  }}
                  className={`${baseButtonClass} ${primaryButtonClass}`}
                >
                  <Video size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>{t.projects.video}</span>
                </button>
              )}
              {project.codeUrl ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseButtonClass} ${secondaryButtonClass}`}
                >
                  <Github size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>{t.projects.code}</span>
                </a>
              ) : (
                <button
                  onClick={() => setCodeNotAvailablePopupOpen(true)}
                  className={`${baseButtonClass} ${secondaryButtonClass}`}
                >
                  <Code2 size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>{t.projects.code}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <div className="py-16 md:py-24 overflow-hidden relative">
        <SectionBackground />
        
        <div className="mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-text-primary px-4 max-w-7xl mx-auto">
              {t.projects.title}
            </h2>
          </div>
        </div>
      </div>
      <HorizontalScroll
        sectionRef={sectionRef}
        trackRef={trackRef}
        items={projects}
        renderItem={renderProjectCard}
        sectionId="projects"
        activeIndex={activeIndex}
        goToCard={goToCard}
      />
      
      {videoPopupOpen && <VideoPopup isOpen={videoPopupOpen} videoUrl={currentVideoUrl} onClose={() => setVideoPopupOpen(false)} />}
      {codeNotAvailablePopupOpen && <CodeNotAvailablePopup isOpen={codeNotAvailablePopupOpen} onClose={() => setCodeNotAvailablePopupOpen(false)} />}
      {imagePopupOpen && <ImagePopup isOpen={imagePopupOpen} imageUrl={currentImageUrl} onClose={() => setImagePopupOpen(false)} />}
      {descriptionPopupOpen && currentProjectDetails && (
        <DescriptionPopup
          isOpen={descriptionPopupOpen}
          title={currentProjectDetails.title}
          description={currentProjectDetails.description}
          onClose={() => setDescriptionPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Projects;