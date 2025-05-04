import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../utils/projects';
// Añadir ImagePopup a la importación
import { VideoPopup, CodeNotAvailablePopup, ImagePopup } from '../components/PopUps';
import { ExternalLink, Video, Github } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { LanguageTranslations } from '../utils/translations';

interface ProjectsProps {
  t: LanguageTranslations[keyof LanguageTranslations];
  language: keyof LanguageTranslations;
}

const Projects: React.FC<ProjectsProps> = ({ t, language }) => {
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [codeNotAvailablePopupOpen, setCodeNotAvailablePopupOpen] = useState(false);
  // Nuevo estado para el popup de imagen
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  // --------------------------------------
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const projects = getProjects(language);

  // Función para abrir el popup de imagen
  const openImagePopup = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setImagePopupOpen(true);
  };

  return (
    <section id="projects" className="py-20">
      <motion.div
        className="px-4 mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
          variants={fadeInUp}
        >
          {t.projects.title}
        </motion.h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border shadow-md transition-all duration-300 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.1 }}
            >
              {/* --- Contenedor de Imagen Clickeable --- */}
              <div
                className="aspect-video cursor-pointer bg-light-background-tertiary dark:bg-dark-background-tertiary"
                onClick={() => openImagePopup(project.image)} // Abre el popup al hacer clic
                title="Click to enlarge image" // Tooltip opcional
              >
                <img
                  src={project.image}
                  alt={project.title} // Usa el título como alt text
                  className="object-cover w-full h-full"
                  loading="lazy" // Añadido para lazy loading
                />
              </div>
              {/* ------------------------------------ */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                   {project.title}
                </h3>
                <p className="mb-4 text-light-text-secondary dark:text-dark-text-secondary">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                       key={tech}
                       className="px-3 py-1 text-xs rounded-full border transition-colors duration-200 cursor-default bg-light-secondary text-light-text-secondary border-light-border/50 hover:bg-light-secondary-hover dark:bg-dark-secondary dark:text-dark-text-primary dark:border-dark-border dark:hover:bg-dark-secondary-hover"
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
                      className="inline-flex items-center transition-colors text-light-link hover:text-light-link-hover dark:text-dark-link dark:hover:text-dark-link-hover"
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
                       className="inline-flex items-center transition-colors text-light-link hover:text-light-link-hover dark:text-dark-link dark:hover:text-dark-link-hover"
                    >
                      {t.projects.video} <Video size={16} className="mt-1 ml-1" />
                    </button>
                  )}
                  {project.codeUrl ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-colors text-light-link hover:text-light-link-hover dark:text-dark-link dark:hover:text-dark-link-hover"
                    >
                      {t.projects.code} <Github size={16} className="ml-1" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setCodeNotAvailablePopupOpen(true)}
                      className="inline-flex items-center transition-colors text-light-link hover:text-light-link-hover dark:text-dark-link dark:hover:text-dark-link-hover"
                    >
                      {t.projects.code} <Github size={16} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Renderizar todos los popups */}
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
        {/* Renderizar el nuevo ImagePopup */}
        <ImagePopup
          isOpen={imagePopupOpen}
          onClose={() => setImagePopupOpen(false)}
          imageUrl={currentImageUrl}
          altText="Project Image Preview" // Puedes pasar project.title si lo almacenas en estado también
        />
        {/* ---------------------------- */}
      </motion.div>
    </section>
  );
};

export default Projects;