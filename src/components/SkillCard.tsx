'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function getSkillLevel(skill: string): number {
  const levels: Record<string, number> = {
    'React.js': 92, 'Next.js': 85, 'TypeScript': 90, 'JavaScript': 90,
    'Tailwind CSS': 88, 'HTML': 95, 'CSS': 90,
    'React Native': 75, 'Expo': 72, 'Solito': 65, 'Tamagui': 60, 'Electron': 55,
    'Node.js': 85, 'Express.js': 82, 'WebSockets': 78,
    'FastAPI': 70, 'Django REST framework': 65, 'Python': 80, 'PHP': 60,
    'MySQL': 85, 'PostgreSQL': 80, 'MongoDB': 75, 'Supabase': 70,
    'DBeaver Community': 65,
    'Git': 90, 'Docker': 72, 'Amazon Web Services (AWS)': 70,
    'Linux': 78, 'SSH': 75, 'Postman': 80, 'n8n': 60, 'WordPress': 50,
  };
  return levels[skill] ?? 70;
}

interface SkillCardProps {
  title: string;
  skills: readonly string[];
  icon?: React.ReactNode;
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon, className }) => {
  const barsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.skill-bar-fill');
    if (!bars || bars.length === 0) return;

    const isMobile = isMobileDevice();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: isMobile ? 'top 90%' : 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.fromTo(
      bars,
      { width: '0%' },
      {
        width: (i) => `${getSkillLevel(skills[i] ?? '')}%`,
        duration: 1.2,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, [skills]);

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col h-full overflow-hidden rounded-lg border shadow-md bg-surface/50 border-border hover:border-accent/70 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-surface/20">
        <span className="text-accent-light">
          {icon ? icon : <Layers size={20} />}
        </span>
        <h4 className="text-lg font-semibold tracking-wide text-text-primary">{title}</h4>
      </div>

      <div ref={barsRef} className="flex flex-col gap-2 p-4">
        {skills.map((skill) => (
          <div key={skill}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-text-secondary">{skill}</span>
              <span className="text-text-secondary/60">{getSkillLevel(skill)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/30">
              <div
                className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent-light to-purple-500"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
