// src/Portfolio.tsx
import { useState } from 'react';
import translations, { LanguageTranslations } from './utils/translations';
import Navigator from './sections/Navigator';
import Background from './sections/Background';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const Portfolio = () => {
  const [language, setLanguage] = useState<keyof LanguageTranslations>(
    navigator.language.startsWith("es") ? "es" : "en"
  );
  const t = translations[language];

  return (
    <div className="relative min-h-screen transition-colors duration-300 bg-light-background-primary text-light-text-primary dark:bg-dark-background-primary dark:text-dark-text-primary">
      <Background />
      <Navigator t={t} language={language} setLanguage={setLanguage} />

      <div className="relative z-10">
        <Hero t={t} />
        <Projects t={t} language={language} />
        <About t={t} />
        <Contact t={t} />
        <Footer t={t} />
      </div>
    </div>
  );
};

export default Portfolio;