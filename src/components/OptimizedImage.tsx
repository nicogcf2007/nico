'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { getImagePath } from '../utils/imagePaths';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  onClick?: () => void;
  title?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMWExYTFhIi8+CjxwYXRoIGQ9Ik0yMCAzMEM4Ljk1NDMgMzAgMCAyMS4wNDU3IDAgMTBTOC45NTQzIDAgMjAgMFMzMCA4Ljk1NDMgMzAgMjBTMjEuMDQ1NyAzMCAyMCAzMFoiIGZpbGw9IiM0YjViNjgiLz4KPHN2Zz4=',
  onClick,
  title
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const overlay = revealRef.current;
    if (!el || !overlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          gsap.to(overlay, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              overlay.style.display = 'none';
            },
          });
        }
      },
      { threshold: 0.2, rootMargin: '100px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => { setIsError(true); setIsLoaded(true); }, []);

  const imageSrc = getImagePath(src);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-900 ${className}`}
      style={{ width, height }}
      onClick={onClick}
      title={title}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={placeholder} alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        </div>
      )}

      <div
        ref={revealRef}
        className="absolute inset-0 z-10 origin-left bg-background"
        style={{ willChange: 'transform' }}
      />

      {(isInView || priority) && (
        <img
          src={isError ? placeholder : imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
