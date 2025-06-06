'use client';

import React, { useRef, useEffect, ReactNode, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice } from '../utils/deviceDetection';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  stagger?: number;
  start?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 1.0,
  distance = 30,
  direction = 'up',
  scale = false,
  stagger = 0,
  start = 'top 85%',
  className = '',
  as: Component = 'div'
}) => {
  const ref = useRef<HTMLElement>(null);
  
  // Memorizar configuración adaptativa
  const adaptedConfig = useMemo(() => {
    const isMobile = isMobileDevice();
    return {
      duration: isMobile ? Math.min(duration, 0.8) : duration,
      distance: isMobile ? Math.min(distance, 20) : distance,
      start: isMobile ? 'top 95%' : start,
      stagger: isMobile ? Math.min(stagger, 0.05) : stagger,
      isMobile
    };
  }, [duration, distance, start, stagger]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { duration: adaptedDuration, distance: adaptedDistance, start: adaptedStart, stagger: adaptedStagger, isMobile } = adaptedConfig;

    // Configurar valores iniciales basados en la dirección
    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { opacity: 1, duration: adaptedDuration, delay };

    switch (direction) {
      case 'up':
        fromVars.y = adaptedDistance;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -adaptedDistance;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = adaptedDistance;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -adaptedDistance;
        toVars.x = 0;
        break;
    }

    if (scale) {
      fromVars.scale = 0.95;
      toVars.scale = 1;
    }

    // Si hay stagger, buscar elementos hijos
    let targets = element;
    if (adaptedStagger > 0) {
      const children = gsap.utils.toArray(element.children);
      if (children.length > 0) {
        targets = children as any;
        toVars.stagger = adaptedStagger;
      }
    }

    // Configurar ScrollTrigger con optimización para móvil
    toVars.scrollTrigger = {
      trigger: element,
      start: adaptedStart,
      toggleActions: 'restart none none reverse',
      fastScrollEnd: isMobile,
      preventOverlaps: isMobile
    };

    // Establecer estado inicial
    gsap.set(targets, fromVars);

    // Crear animación
    const animation = gsap.to(targets, toVars);

    return () => {
      animation.kill();
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
  }, [delay, direction, scale, adaptedConfig]);

  const ElementComponent = Component as any;

  return (
    <ElementComponent ref={ref} className={className}>
      {children}
    </ElementComponent>
  );
};

export default ScrollReveal; 