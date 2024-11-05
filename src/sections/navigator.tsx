import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageTranslations, Translations } from '../utils/translations';
import { Globe, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../Contexts/darkModeContext';

type NavigatorProps = {
  t: Translations;
  language: keyof LanguageTranslations;
  setLanguage: (value: keyof LanguageTranslations) => void;
};

const Navigator: React.FC<NavigatorProps> = ({ t, language, setLanguage }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 mt-2 left-1/2 -translate-x-1/2 w-full max-w-[100%] md:max-w-fit">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex justify-center rounded-full"
      >
        <motion.div
          className="rounded-full bg-light-background-primary/60 dark:bg-dark-background-secondary/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hasScrolled ? 1 : 0,
            transition: { duration: 0.4 }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
        />
        <div className="px-1 flex items-center space-x-4">
          <div className="flex items-center justify-center min-w-0 h-9 space-x-3">
            {/* Enlaces de navegación */}
            <motion.a
              href="#projects"
              className="px-2 py-2 transition-all rounded-full text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover hover:text-light-link-hover dark:hover:text-dark-link-hover whitespace-nowrap"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.projects}
            </motion.a>
            <motion.a
              href="#about"
              className="px-2 py-2 transition-all rounded-full text-light-text-secondary dark:text-dark-text-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover hover:text-light-link-hover dark:hover:text-dark-link-hover whitespace-nowrap"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.about}
            </motion.a>
            <motion.a
              href="#contact"
              className="px-2 py-2 transition-all rounded-full text-light-text-secondary dark:text-dark-text-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover hover:text-light-link-hover dark:hover:text-dark-link-hover whitespace-nowrap"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.contact}
            </motion.a>
          </div>
          <div className="flex items-center space-x-1 pl-3 border-l border-light-border dark:border-dark-border">
            {/* Cambiar idioma */}
            <motion.button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="p-1 transition-all rounded-full hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover hover:text-light-link-hover dark:hover:text-dark-link-hover"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={18} />
            </motion.button>
            {/* Cambiar modo oscuro */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 transition-all rounded-full hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover hover:text-light-link-hover dark:hover:text-dark-link-hover"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navigator;
