import { useState } from 'react';
import { motion } from 'framer-motion';
import translations, { LanguageTranslations } from './utils/translations';
import socialLinks from './utils/contacts';
import Navigator from './sections/navigator'; // Assuming navigator uses context now
import Background from './sections/background'; // Assuming background uses context now
import { Code, Server, Database, TerminalSquare, BrainCircuit, ExternalLink, Video, Github } from 'lucide-react';
import { getProjects } from './utils/projects';
import { VideoPopup, CodeNotAvailablePopup } from './components/ProjectPopups'; // Assuming popups use context
import SkillCard from './components/SkillCard'; // Assuming SkillCard uses context
// NOTE: No longer need theme state or useEffect here if using context
// import { useDarkMode } from './Contexts/darkModeContext'; // Uncomment if needed directly here, but likely handled by child components

const Portfolio = () => {
  const [language, setLanguage] = useState<keyof LanguageTranslations>(
    navigator.language.startsWith("es") ? "es" : "en"
  );
  const t = translations[language];
  // const { isDarkMode } = useDarkMode(); // Get context value if needed directly

  // Popup state remains the same
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [codeNotAvailablePopupOpen, setCodeNotAvailablePopupOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const skillData = [
    // Ensure these titles/skills match translation keys if needed
    {
      title: t.about.skillCategories?.frontend ?? "Frontend",
      skills: ['React.js', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
      icon: <Code size={20} />
    },
    {
      title: t.about.skillCategories?.backend ?? "Backend",
      skills: ['Node.js', 'Express.js', 'WebSockets', 'FastAPI', 'Django REST framework', 'Python', 'PHP'],
      icon: <Server size={20} />
    },
    {
      title: t.about.skillCategories?.databases ?? "Databases",
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'DBeaver Community'],
      icon: <Database size={20} />
    },
    {
      title: t.about.skillCategories?.devops ?? "DevOps & Tools",
      skills: ['Git', 'Docker', 'Amazon Web Services (AWS)', 'Linux', 'Postman'],
      icon: <TerminalSquare size={20} />
    },
    {
      title: t.about.skillCategories.softSkills, // Assuming title translation exists
      // Use the new translation array for soft skills
      skills: t.about.softSkillsList,
      icon: <BrainCircuit size={20} /> // Example icon for soft skills
    },
  ];

  // --- Animation variants (Keep as is) ---
  const gridContainerVariants = { /* ... */ };
  const fadeInUp = { /* ... */ };
  const staggerContainer = { /* ... */ };

  return (
    // Base styles using theme config
    <div className="relative min-h-screen transition-colors duration-300 bg-light-background-primary text-light-text-primary dark:bg-dark-background-primary dark:text-dark-text-primary">
      {/* Background and Navigator now use context internally */}
      <Background />
      <Navigator t={t} language={language} setLanguage={setLanguage} />

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="inicio" className="flex justify-center items-center pt-16 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-4 py-20 mx-auto max-w-6xl text-center"
          >
            <motion.h1
              // Use theme text colors
              className="mb-6 text-5xl font-bold md:text-7xl text-light-text-primary dark:text-dark-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.hero.title}{' '}
              <motion.span
                 // Use theme primary colors
                className="text-light-primary dark:text-dark-primary" // Changed from gradient
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Nicolas
              </motion.span>
            </motion.h1>
            <motion.p
              // Use theme secondary text colors
              className="mb-8 text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.hero.role}
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {socialLinks.map(([href, icon], index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Use theme text colors and primary for hover
                  className="p-2 transition-colors transform text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:scale-110"
                  variants={fadeInUp}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            className="px-4 mx-auto max-w-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              // Use theme text colors
              className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.projects.title}
            </motion.h2>
            <motion.div
              className="grid gap-8 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {getProjects(language).map((project) => (
                <motion.article
                  key={project.id}
                  variants={fadeInUp}
                  // Use theme background, border, shadow for card
                  className="overflow-hidden rounded-lg border shadow-md transition-all duration-300 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
                  whileHover={{ y: -5 }}
                >
                   {/* Image container background */}
                  <div className="aspect-video bg-light-background-tertiary dark:bg-dark-background-tertiary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="mb-2 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                       {project.title}
                    </h3>
                    {/* Description */}
                    <p className="mb-4 text-light-text-secondary dark:text-dark-text-secondary">
                      {project.description}
                    </p>
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                           key={tech}
                           // Use theme secondary colors for tags
                           className="px-3 py-1 text-xs rounded-full border transition-colors duration-200 cursor-default bg-light-secondary text-light-text-secondary border-light-border hover:bg-light-secondary-hover dark:bg-dark-secondary dark:text-dark-text-primary dark:border-dark-border dark:hover:bg-dark-secondary-hover"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Links */}
                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          // Use theme link colors
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
                          // Use theme link colors
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
                          // Use theme link colors
                          className="inline-flex items-center transition-colors text-light-link hover:text-light-link-hover dark:text-dark-link dark:hover:text-dark-link-hover"
                        >
                          {t.projects.code} <Github size={16} className="ml-1" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setCodeNotAvailablePopupOpen(true)}
                          // Use theme link colors
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

            {/* Popups now use context internally */}
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
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <motion.div
            className="px-4 mx-auto max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              // Use theme text colors
              className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.about.title}
            </motion.h2>

            {/* Main content card */}
            <motion.div
              // Use theme background, border, shadow for card
              className="p-6 rounded-lg border shadow-md transition-all duration-300 md:p-8 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Description Paragraph */}
              <motion.p
                // Use theme text secondary color
                className="mb-8 text-light-text-secondary dark:text-dark-text-secondary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t.about.description}
              </motion.p>

              {/* --- Single Column Layout for Skills and Roles --- */}
              <motion.div
                // CHANGED: grid-cols-1 and added gap-y
                className="grid grid-cols-1 gap-y-12"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {/* --- Skills Section --- */}
                <motion.div variants={fadeInUp}>
                  <h3 className="mb-6 text-xl font-bold text-light-primary dark:text-dark-primary"> {/* Use theme primary color */}
                    {t.about.skills}
                  </h3>
                  <motion.div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2" // SkillCard grid
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {skillData.map((category) => (
                       // SkillCard uses context internally now
                      <SkillCard
                         key={category.title}
                         title={category.title}
                         skills={category.skills}
                         icon={category.icon}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                {/* --- Roles/Experience Section --- */}
                <motion.div variants={fadeInUp}>
                   {/* Title */}
                  <h3 className="mb-6 text-xl font-bold text-light-primary dark:text-dark-primary">
                    {t.about.experienceTitle} {/* Use the correct translation key */}
                  </h3>

                  {/* Container for all experience entries */}
                  <div className="space-y-8"> {/* Add space between each experience block */}
                    {t.about.experienceDetails.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        className="p-4 rounded-md border bg-light-background-secondary/50 border-light-border/60 dark:bg-dark-background-tertiary/30 dark:border-dark-border/40" // Subtle background and border
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }} // Staggered entry
                      >
                        {/* Experience Title and Company */}
                        <h4 className="mb-1 font-semibold text-md text-light-text-primary dark:text-dark-text-primary">
                            {exp.title} - <span className="font-medium text-light-primary dark:text-dark-primary">{exp.company}</span>
                        </h4>
                        {/* Optional: Duration could go here */}
                        {/* <p className="mb-3 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">{exp.duration}</p> */}

                        {/* Summary Paragraph */}
                        <p className="mb-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {exp.summary}
                        </p>

                        {/* Details List */}
                        <ul className="pl-0 mb-4 space-y-2 list-none">
                          {exp.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex gap-2 items-start text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              <span className="mt-1 opacity-80 text-light-primary dark:text-dark-primary">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills Associated */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="pt-3 mt-3 border-t border-light-border/50 dark:border-dark-border/30">
                             <p className="mb-2 text-xs font-medium text-light-text-tertiary dark:text-dark-text-tertiary">Key Skills:</p>
                             <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map(skill => (
                                <span
                                  key={skill}
                                  // Re-use tag styling (adjust padding/font if needed)
                                  className="px-2 py-0.5 text-xs rounded-full border cursor-default bg-light-secondary text-light-text-secondary border-light-border hover:bg-light-secondary-hover dark:bg-dark-secondary dark:text-dark-text-primary dark:border-dark-border dark:hover:bg-dark-secondary-hover transition-colors duration-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <motion.div
            className="px-4 mx-auto max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              // Use theme text colors
              className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
            <motion.div
               // Use theme background, border, shadow for card
              className="p-8 rounded-lg border shadow-md transition-all duration-300 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.form
                className="space-y-6"
                onSubmit={(e) => { e.preventDefault(); alert('Form submission not implemented yet!'); }}
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    required
                    // Use theme styles for input
                    className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    required
                     // Use theme styles for input
                    className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                     // Use theme styles for textarea
                    className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  // Use theme primary button styles
                  className="px-6 py-3 w-full font-medium text-white rounded-lg border transition-colors duration-200 bg-light-primary border-light-primary hover:bg-light-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:bg-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary-hover dark:focus:ring-dark-primary dark:text-dark-text-primary dark:focus:ring-offset-dark-background-secondary" // Adjusted focus offset for dark
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.contact.send}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-light-text-tertiary dark:text-dark-text-tertiary"> {/* Use theme tertiary text */}
          <div className="px-4 mx-auto max-w-6xl">
            <p>© {new Date().getFullYear()} Nicolas Rivera. {t.footer.rights}</p>
          </div>
        </footer>
      </div>
    </div >
  )
}

export default Portfolio;