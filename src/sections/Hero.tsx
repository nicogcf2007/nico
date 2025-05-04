import React from 'react';
import { motion } from 'framer-motion';
import socialLinks from '../utils/contacts';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { LanguageTranslations } from '../utils/translations';

interface HeroProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section id="inicio" className="flex justify-center items-center pt-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-4 py-20 mx-auto max-w-6xl text-center"
      >
        <motion.h1
          className="mb-6 text-5xl font-bold md:text-7xl text-light-text-primary dark:text-dark-text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.hero.title}{' '}
          <motion.span
            className="text-light-primary dark:text-dark-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Nicolas
          </motion.span>
        </motion.h1>
        <motion.p
          className="mb-8 text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t.hero.role}
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={staggerContainer(0.1, 0.8)}
          initial="initial"
          animate="animate"
        >
          {socialLinks.map(([href, icon, hoverColor], index) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 transition-colors duration-150 ease-in-out ${hoverColor}`}
              variants={fadeInUp}
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;