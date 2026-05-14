'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const ticker = () => {
      gsap.set(glow, {
        x: posRef.current.x - 150,
        y: posRef.current.y - 150,
      });
    };

    gsap.ticker.add(ticker);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[300px] w-[300px] rounded-full opacity-30"
      style={{
        background:
          'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'transform',
      }}
    />
  );
}
