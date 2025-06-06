'use client'

import { useState, useEffect } from 'react';
import translations, { Translations, LanguageTranslations } from '../utils/translations';
import { getImagePath, PROJECT_IMAGES } from '../utils/imagePaths';
import Background from '../sections/Background';
import Navigator from '../sections/Navigator';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function ClientWrapper() {
  const [language, setLanguage] = useState<keyof LanguageTranslations>('es');
  const [t, setT] = useState<Translations>(translations.es);
  
  useEffect(() => {
    setT(translations[language]);
  }, [language]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Background />
      
      {/* Logo fijo en esquina inferior derecha */}
      <div className="fixed bottom-1 right-1 z-50">
        <button
          onClick={scrollToTop}
          className="group relative"
          aria-label="Volver arriba"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-purple-400 transition-all duration-300 transform group-hover:scale-110 shadow-lg p-1">
            <img 
              src={getImagePath(PROJECT_IMAGES.logo)}
              alt="NRD Logo" 
              className="w-full h-full object-cover rounded-full"
              loading="eager"
              onError={(e) => {
                // Primer fallback: intentar con logo alternativo
                const target = e.target as HTMLImageElement;
                if (target.src.includes('logo2.png')) {
                  target.src = getImagePath(PROJECT_IMAGES.logoAlt);
                } else {
                  // Segundo fallback: SVG generado
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%234b5563'/%3E%3Ctext x='24' y='30' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3ENR%3C/text%3E%3C/svg%3E";
                }
              }}
            />
            <div className="absolute inset-0 bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
          </div>
          {/* Efecto de brillo */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>
      
      <Navigator t={t} language={language} setLanguage={setLanguage} />
      <Hero t={t} />
      <Projects t={t} language={language} />
      <About t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}

