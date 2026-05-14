import React, { useEffect, useRef } from 'react';
import socialLinks from '../utils/contacts';
import { useLanguage } from '../hooks/useLanguage';
import { getAssetPath } from '../utils/imagePaths';
import { Download, Eye, Mail, ChevronDown } from 'lucide-react';
// @ts-ignore
import gsap from 'gsap';
import SplitText from '../components/SplitText';
import MagneticHover from '../components/MagneticHover';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 0.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1 });
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      tl.fromTo(buttons,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }

    if (socialRef.current) {
      const socialEls = socialRef.current.children;
      tl.fromTo(socialEls,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.2'
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        '-=0.1'
      );

      gsap.to(scrollIndicatorRef.current.querySelector('.scroll-arrow'), {
        y: 8,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to(scrollIndicatorRef.current.querySelector('span'), {
        opacity: 0.7,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-6 sm:pb-0 lg:px-8"
      style={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8 lg:gap-12">

        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-4 lg:mb-8">
            <SplitText
              text={`${t.hero.title} `}
              as="h1"
              className="inline text-5xl font-bold text-text-primary sm:text-6xl md:text-7xl"
              stagger={0.03}
              duration={0.5}
            />
            <SplitText
              text="Nicolas"
              as="span"
              className="inline text-5xl font-bold text-accent-light sm:text-6xl md:text-7xl"
              stagger={0.03}
              duration={0.5}
            />
          </div>
          <p ref={subtitleRef} className="mb-6 md:mb-8 text-base text-text-secondary sm:text-lg md:text-2xl lg:mb-14" style={{ opacity: 0 }}>
            {t.hero.role}
          </p>

          <div ref={buttonsRef} className="flex flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row">
            <MagneticHover as="button" onClick={() => scrollToSection('projects')} strength={0.15}>
              <div className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm text-white transition-all duration-300 hover:shadow-lg hover:bg-accent-hover sm:w-auto sm:px-6 sm:py-3 sm:text-base">
                <Eye size={20} />
                {t.hero.viewProjects}
              </div>
            </MagneticHover>

            <MagneticHover as="a" href={getAssetPath('/cv.pdf')} target="_blank" rel="noopener noreferrer" strength={0.15}>
              <div className="group flex w-full items-center justify-center gap-2 rounded-lg bg-surface px-5 py-2.5 text-sm text-text-primary transition-all duration-300 hover:shadow-lg hover:bg-border sm:w-auto sm:px-6 sm:py-3 sm:text-base">
                <Download size={20} />
                {t.hero.downloadCV}
              </div>
            </MagneticHover>

            <MagneticHover as="button" onClick={() => scrollToSection('contact')} strength={0.15}>
              <div className="group flex w-full items-center justify-center gap-2 rounded-lg border-2 border-accent px-5 py-2.5 text-sm text-accent-light transition-all duration-300 hover:shadow-lg hover:bg-accent hover:text-white sm:w-auto sm:px-6 sm:py-3 sm:text-base">
                <Mail size={20} />
                {t.hero.contactMe}
              </div>
            </MagneticHover>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-8 lg:gap-12">
          <div ref={socialRef} className="flex justify-center gap-x-4">
            {socialLinks.map(([href, icon]) => (
              <MagneticHover key={href} as="a" href={href} target="_blank" rel="noopener noreferrer" strength={0.2}>
                <div className="group relative p-2 text-text-secondary transition-all duration-300 ease-in-out">
                  <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-border-accent sm:h-10 sm:w-10" style={{ opacity: 0 }}>
                    {icon}
                    <div className="absolute inset-0 bg-border-accent/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                  <div className="absolute inset-0 -z-10 rounded-full bg-border-accent/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </MagneticHover>
            ))}
          </div>

          <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2 text-text-secondary" style={{ opacity: 0 }}>
            <span className="text-xs font-medium tracking-wide sm:text-sm">{t.hero.scrollDown}</span>
            <div className="scroll-arrow flex flex-col items-center">
              <ChevronDown size={24} className="text-accent-light" />
              <div className="mt-1 h-6 w-px bg-gradient-to-b from-accent-light/60 to-transparent sm:h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
