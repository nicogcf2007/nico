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
  const [isScrolled, setIsScrolled] = useState(false); // Renamed for clarity
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Increased threshold slightly
    };
    // Initial check in case page loads scrolled down
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } }, // Faster fade in
  };

  return (
    <div className="flex fixed top-0 right-0 left-0 z-50 justify-center pt-3"> {/* Adjusted positioning */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative flex items-center px-2 py-1.5 space-x-2 rounded-full shadow-md" // Added shadow, adjusted padding/spacing
      >
        {/* Background element */}
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          animate={isScrolled ? "visible" : "hidden"}
          // Apply theme background/border/backdrop styles
          className={`absolute inset-0 rounded-full border backdrop-blur-md bg-light-background-primary/80 border-light-border/60 dark:bg-dark-background-secondary/80 dark:border-dark-border/60`}
          style={{ zIndex: -1 }}
        />

        {/* Navigation Links */}
        <div className="flex items-center space-x-1 min-w-0">
          {(['projects', 'about', 'contact'] as const).map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              // Use theme text and secondary hover colors
              className="px-3 py-1 text-sm whitespace-nowrap rounded-full transition-colors text-light-text-secondary hover:bg-light-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-secondary dark:hover:text-dark-text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav[section]}
            </motion.a>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-light-border dark:bg-dark-border"></div>

        {/* Controls */}
        <div className="flex items-center space-x-0.5">
          {/* Change Language */}
          <motion.button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="p-1.5 rounded-full transition-colors text-light-text-secondary hover:bg-light-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-secondary dark:hover:text-dark-text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe size={18} />
          </motion.button>

          {/* Change Theme */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-full transition-colors text-light-text-secondary hover:bg-light-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-secondary dark:hover:text-dark-text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navigator;