'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Globe, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const Navigator: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const navRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const lenis = (window as any).lenis;
    const element = document.getElementById(sectionId);
    if (lenis && element) {
      lenis.scrollTo(element, {
        offset: 0,
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const sections = ['inicio', 'about', 'projects', 'contact'];
    const triggers = sections.map(id => 
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => self.isActive && setActiveSection(id),
      })
    );

    const navTrigger = ScrollTrigger.create({
      start: 'top -60',
      onUpdate: self => setIsScrolled(self.progress > 0),
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
      navTrigger.kill();
    };
  }, []);

  useEffect(() => {
    gsap.to(backgroundRef.current, {
      opacity: isScrolled ? 1 : 0,
      duration: 0.2,
      ease: 'power1.out',
    });
  }, [isScrolled]);
  
  const navigation = [
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <div className="flex fixed top-0 right-0 left-0 z-40 justify-center pt-2 px-2">
      <nav ref={navRef} className="relative flex items-center px-1 py-1 sm:py-1.5 space-x-1 rounded-full shadow-md">
        <div ref={backgroundRef} className="absolute inset-0 bg-background/70 backdrop-blur-sm rounded-full -z-20" />
        
        <div className="flex items-center space-x-0 sm:space-x-1">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }} className={`relative px-2 sm:px-3 py-2 text-[11px] sm:text-sm rounded-full transition-colors duration-200 text-text-secondary hover:text-text-primary ${activeSection === item.id ? 'bg-accent/80 text-text-primary' : ''}`}>
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <div className="flex items-center space-x-1">
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors">
            <FileText size={16} />
          </a>
          <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors">
            <Globe size={16} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigator;