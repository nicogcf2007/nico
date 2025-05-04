import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from '../components/SkillCard';
import { Code, Server, Database, TerminalSquare, BrainCircuit, Smartphone } from 'lucide-react';
import { fadeInUp, staggerContainer, gridContainerVariants } from '../utils/animations';
import { LanguageTranslations, ExperienceDetail } from '../utils/translations';

interface AboutProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const About: React.FC<AboutProps> = ({ t }) => {

  const skillData = [
    {
      title: t.about.skillCategories?.webFrontend ?? "Web Frontend",
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
      icon: <Code size={20} />
    },
    {
      // Sección renombrada y Electron añadido
      title: t.about.skillCategories?.appDevelopment ?? "Application Development",
      skills: ['React Native', 'Expo', 'Solito', 'Tamagui', 'Electron'],
      icon: <Smartphone size={20} /> // Se mantiene el icono por ahora
    },
    {
      title: t.about.skillCategories?.backend ?? "Backend",
      skills: ['Node.js', 'Express.js', 'WebSockets', 'FastAPI', 'Django REST framework', 'Python', 'PHP'],
      icon: <Server size={20} />
    },
    {
      title: t.about.skillCategories?.databases ?? "Databases & BaaS",
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'DBeaver Community'],
      icon: <Database size={20} />
    },
    {
      title: t.about.skillCategories?.devopsPlatforms ?? "DevOps & Platforms",
      // Electron eliminado de aquí
      skills: ['Git', 'Docker', 'Amazon Web Services (AWS)', 'Linux', 'SSH', 'Postman', 'n8n', 'WordPress'],
      icon: <TerminalSquare size={20} />
    },
    {
      title: t.about.skillCategories.softSkills,
      skills: t.about.softSkillsList,
      icon: <BrainCircuit size={20} />
    },
  ];

  const experienceDetails: readonly ExperienceDetail[] = t.about.experienceDetails;

  return (
    <section id="about" className="py-20">
      <motion.div
        className="px-4 mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
          variants={fadeInUp}
        >
          {t.about.title}
        </motion.h2>

        <motion.div
          className="p-6 rounded-lg border shadow-md transition-all duration-300 md:p-8 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
          variants={fadeInUp}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.p
            className="mb-8 text-light-text-secondary dark:text-dark-text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {t.about.description}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-y-12"
            variants={staggerContainer(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-xl font-bold text-light-primary dark:text-dark-primary">
                {t.about.skills}
              </h3>
              <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-stretch"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {skillData.map((category) => (
                  <SkillCard
                     key={category.title}
                     title={category.title}
                     skills={category.skills}
                     icon={category.icon}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-xl font-bold text-light-primary dark:text-dark-primary">
                {t.about.experienceTitle}
              </h3>
              <div className="space-y-8">
                {experienceDetails.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="p-4 rounded-md border bg-light-background-secondary/50 border-light-border/60 dark:bg-dark-background-tertiary/30 dark:border-dark-border/40"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUp}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  >
                    <h4 className="mb-1 font-semibold text-md text-light-text-primary dark:text-dark-text-primary">
                        {exp.title} - <span className="font-medium text-light-primary dark:text-dark-primary">{exp.company}</span>
                    </h4>
                    <p className="mb-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {exp.summary}
                    </p>
                    <ul className="pl-0 mb-4 space-y-2 list-none">
                      {exp.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex gap-2 items-start text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          <span className="mt-1 opacity-80 text-light-primary dark:text-dark-primary">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-3 mt-3 border-t border-light-border/50 dark:border-dark-border/30">
                         <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map(skill => (
                            <span
                              key={skill}
                              className="inline-block whitespace-nowrap rounded-lg border border-light-border/50 bg-light-secondary px-3 py-1 text-xs text-light-text-secondary transition-colors duration-200 hover:bg-light-secondary-hover dark:border-dark-border dark:bg-dark-secondary dark:text-dark-text-primary dark:hover:bg-dark-secondary-hover"
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
  );
};

export default About;