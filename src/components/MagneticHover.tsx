'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticHoverProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: 'div' | 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function MagneticHover({
  children,
  strength = 0.3,
  className = '',
  as: Tag = 'div',
  href,
  target,
  rel,
  onClick,
}: MagneticHoverProps) {
  const elRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = elRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const commonProps = {
    ref: elRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
  };

  if (Tag === 'a') {
    return (
      <a {...(commonProps as any)} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  if (Tag === 'button') {
    return (
      <button {...(commonProps as any)} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div {...commonProps}>{children}</div>;
}
