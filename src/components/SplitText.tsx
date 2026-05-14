'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  stagger?: number;
  duration?: number;
}

export default function SplitText({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.02,
  duration = 0.6,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.split-char');
    if (chars.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      chars,
      { opacity: 0, y: 30, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        ease: 'back.out(1.7)',
      }
    );

    return () => {
      tl.kill();
    };
  }, [stagger, duration]);

  const wrappedChars = text.split('').map((char, i) => {
    if (char === ' ') {
      return (
        <span key={i} className="inline-block">
          &nbsp;
        </span>
      );
    }
    return (
      <span key={i} className="split-char inline-block" style={{ opacity: 0 }}>
        {char}
      </span>
    );
  });

  return (
    <Tag ref={containerRef as any} className={className}>
      {wrappedChars}
    </Tag>
  );
}
