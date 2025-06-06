'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import NoSSR from '../components/NoSSR';
import { useIsMobile } from '../utils/deviceDetection';

// Importación dinámica para evitar problemas con SSR
const ThreeJSParticles = dynamic(() => import('../components/ThreeJSParticles'), {
    ssr: false,
    loading: () => null
});

const Background = () => {
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Configuración adaptativa para móvil
    const mouseParallaxFactor = useMemo(() => isMobile ? 0.5 : 1.5, [isMobile]);
    const scrollParallaxFactor = useMemo(() => isMobile ? 0.015 : 0.03, [isMobile]);

    // Throttle para eventos
    const throttleRef = useRef<{
        mouse: NodeJS.Timeout | null;
        scroll: NodeJS.Timeout | null;
    }>({ mouse: null, scroll: null });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isMobile && throttleRef.current.mouse) return;
        
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 2 - 1;
            const y = (e.clientY - rect.top) / rect.height * 2 - 1;
            setMousePosition({ x, y });
            
            if (isMobile) {
                throttleRef.current.mouse = setTimeout(() => {
                    throttleRef.current.mouse = null;
                }, 16);
            }
        }
    }, [isMobile]);

    const handleScroll = useCallback(() => {
        if (isMobile && throttleRef.current.scroll) return;
        
        setScrollY(window.scrollY);
        
        if (isMobile) {
            throttleRef.current.scroll = setTimeout(() => {
                throttleRef.current.scroll = null;
            }, 16);
        }
    }, [isMobile]);

    useEffect(() => {
        setMounted(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (throttleRef.current.mouse) clearTimeout(throttleRef.current.mouse);
            if (throttleRef.current.scroll) clearTimeout(throttleRef.current.scroll);
        };
    }, [handleMouseMove, handleScroll]);

    // Cálculos de paralaje
    const mouseParallax = useMemo(() => ({
        x: mousePosition.x * mouseParallaxFactor,
        y: mousePosition.y * mouseParallaxFactor
    }), [mousePosition, mouseParallaxFactor]);

    const scrollParallax = useMemo(() => scrollY * scrollParallaxFactor, [scrollY, scrollParallaxFactor]);

    // Lógica de animación de nebulosas
    const nebulaAnimations = useMemo(() => {
        const scrollEffectStart = isMobile ? 200 : 100;
        const scrollEffectRange = Math.max(1, isMobile ? 11200 : 4500);
        
        const currentScrollValue = scrollY > scrollEffectStart ? scrollY - scrollEffectStart : 0;
        const overallScrollProgress = Math.min(currentScrollValue / scrollEffectRange, 1);

        // FASE 1: Aparición (0% a 25%)
        const appearancePhaseEndProgress = 0.25;
        const appearanceProgress = Math.min(overallScrollProgress / appearancePhaseEndProgress, 1);

        // FASE 2: Fusión (25% a 100%)
        const mergePhaseStartProgress = 0.25;
        let mergeProgress = 0;
        if (overallScrollProgress >= mergePhaseStartProgress) {
            mergeProgress = Math.min((overallScrollProgress - mergePhaseStartProgress) / (1 - mergePhaseStartProgress), 1);
        }

        // Configuración base de nebulosas
        const nebulas = {
            nebula1: {
                baseOpacity: 0.25,
                baseScale: 1.15,
                opacity: 0,
                scale: 1,
                translateX: 0,
                translateY: 0
            },
            nebula2: {
                baseOpacity: 0.35,
                baseScale: 1.1,
                opacity: 0,
                scale: 1,
                translateX: 0,
                translateY: 0
            },
            nebula3: {
                baseOpacity: 0.4,
                baseScale: 1.08,
                opacity: 0,
                scale: 1,
                translateX: 0,
                translateY: 0
            },
            centralPurple: {
                opacity: 0,
                scale: 1
            }
        };

        // Aplicar animaciones de aparición
        nebulas.nebula1.opacity = nebulas.nebula1.baseOpacity * appearanceProgress;
        nebulas.nebula1.scale = 1 + (nebulas.nebula1.baseScale - 1) * appearanceProgress;
        
        nebulas.nebula2.opacity = nebulas.nebula2.baseOpacity * appearanceProgress;
        nebulas.nebula2.scale = 1 + (nebulas.nebula2.baseScale - 1) * appearanceProgress;
        
        nebulas.nebula3.opacity = nebulas.nebula3.baseOpacity * appearanceProgress;
        nebulas.nebula3.scale = 1 + (nebulas.nebula3.baseScale - 1) * appearanceProgress;

        // Aplicar animaciones de fusión
        if (mergeProgress > 0) {
            const centerX = window.innerWidth * 0.5;
            const centerY = window.innerHeight * 0.5;

            // Nebula 1
            const n1_targetX = centerX - (window.innerWidth * 0.9);
            const n1_targetY = centerY - (window.innerHeight * 0.85);
            nebulas.nebula1.translateX = n1_targetX * mergeProgress * 0.6;
            nebulas.nebula1.translateY = n1_targetY * mergeProgress * 0.6;
            nebulas.nebula1.opacity = nebulas.nebula1.baseOpacity * (1 - mergeProgress * 0.8);
            nebulas.nebula1.scale = nebulas.nebula1.baseScale * (1 - mergeProgress * 0.5);

            // Nebula 3
            const n3_targetX = centerX - (window.innerWidth * 0.15);
            const n3_targetY = centerY - (window.innerHeight * 0.8);
            nebulas.nebula3.translateX = n3_targetX * mergeProgress * 0.6;
            nebulas.nebula3.translateY = n3_targetY * mergeProgress * 0.6;
            nebulas.nebula3.opacity = nebulas.nebula3.baseOpacity * (1 - mergeProgress * 0.8);
            nebulas.nebula3.scale = nebulas.nebula3.baseScale * (1 - mergeProgress * 0.5);

            // Nebula 2
            nebulas.nebula2.translateX = (centerX - (window.innerWidth * 0.75)) * mergeProgress * 0.3;
            nebulas.nebula2.translateY = (centerY - (window.innerHeight * 0.7)) * mergeProgress * 0.3;
            nebulas.nebula2.opacity = nebulas.nebula2.baseOpacity * (1 - mergeProgress * 0.6);
            nebulas.nebula2.scale = nebulas.nebula2.baseScale * (1 - mergeProgress * 0.4);

            // Nebulosa central
            const centralPurpleStartProgress = 0.5;
            if (mergeProgress >= centralPurpleStartProgress) {
                const centralPurpleProgress = (mergeProgress - centralPurpleStartProgress) / (1 - centralPurpleStartProgress);
                nebulas.centralPurple.opacity = Math.min(centralPurpleProgress * 0.8, 0.5);
                nebulas.centralPurple.scale = 1 + centralPurpleProgress * 1.0;
            }
        }

        return nebulas;
    }, [scrollY, isMobile]);

    if (!mounted) {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 transition-colors duration-500 bg-gradient-to-br from-black via-indigo-950 to-black" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
            {/* Gradiente base */}
            <div 
                className="absolute inset-0 transition-colors duration-500 bg-gradient-to-br from-black via-indigo-950 to-black"
                style={{
                    transform: `translate3d(${mouseParallax.x * 0.05}px, ${mouseParallax.y * 0.05 - scrollParallax * 0.1}px, 0)`,
                    transition: 'transform 0.8s ease-out'
                }}
            />
            
            <NoSSR fallback={null}>
                {mounted && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <ThreeJSParticles mousePosition={mousePosition} scrollY={scrollY} />
                    </div>
                )}

                <div className="absolute inset-0">
                    {/* Nebulosa rosa/magenta principal */}
                    <div 
                        className={`absolute rounded-full blur-3xl ${isMobile ? 'w-80 h-64' : 'w-[500px] h-[400px]'}`}
                        style={{
                            background: 'radial-gradient(ellipse 70% 100%, #ec4899 0%, #f472b6 20%, #a855f7 40%, transparent 80%)',
                            right: '10%',
                            bottom: '15%',
                            opacity: nebulaAnimations.nebula1.opacity,
                            transform: `translate3d(${(mouseParallax.x * (isMobile ? -0.01 : -0.03)) + nebulaAnimations.nebula1.translateX}px, ${(mouseParallax.y * (isMobile ? -0.01 : -0.03) - scrollParallax * (isMobile ? 0.02 : 0.04)) + nebulaAnimations.nebula1.translateY}px, 0) scale(${(1 + mousePosition.y * (isMobile ? 0.001 : 0.002)) * nebulaAnimations.nebula1.scale})`,
                            animationName: (nebulaAnimations.nebula1.opacity < 0.2 || isMobile) ? 'none' : 'float',
                            animationDuration: isMobile ? '35s' : '25s',
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            animationDirection: 'alternate',
                            transition: `transform ${isMobile ? '0.3s' : '0.6s'} ease-out, opacity 0.4s linear`,
                            willChange: 'transform, opacity'
                        }}
                    />
                    
                    {/* Nebulosa púrpura secundaria - solo desktop */}
                    {!isMobile && (
                        <div 
                            className="absolute w-80 h-60 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(ellipse, #8b5cf6 0%, #a855f7 30%, #ec4899 60%, transparent 85%)',
                                right: '25%',
                                bottom: '30%',
                                opacity: nebulaAnimations.nebula2.opacity,
                                transform: `translate3d(${(mouseParallax.x * 0.02) + nebulaAnimations.nebula2.translateX}px, ${(mouseParallax.y * 0.02 - scrollParallax * 0.03) + nebulaAnimations.nebula2.translateY}px, 0) scale(${(1 + mousePosition.x * 0.003) * nebulaAnimations.nebula2.scale})`,
                                animationName: nebulaAnimations.nebula2.opacity < 0.2 ? 'none' : 'float',
                                animationDuration: '20s',
                                animationTimingFunction: 'ease-in-out',
                                animationIterationCount: 'infinite',
                                animationDirection: 'alternate',
                                animationDelay: '5s',
                                transition: 'transform 0.6s ease-out, opacity 0.4s linear',
                                willChange: 'transform, opacity'
                            }}
                        />
                    )}
                    
                    {/* Nebulosa azul */}
                    <div 
                        className={`absolute rounded-full blur-3xl ${isMobile ? 'w-64 h-64' : 'w-96 h-96'}`}
                        style={{
                            background: 'radial-gradient(circle, #3b82f6 0%, #6366f1 25%, transparent 70%)',
                            left: '15%',
                            top: '20%',
                            opacity: nebulaAnimations.nebula3.opacity * (isMobile ? 0.7 : 1),
                            transform: `translate3d(${(mouseParallax.x * (isMobile ? 0.02 : 0.04)) + nebulaAnimations.nebula3.translateX}px, ${(mouseParallax.y * (isMobile ? 0.02 : 0.04) - scrollParallax * (isMobile ? 0.03 : 0.06)) + nebulaAnimations.nebula3.translateY}px, 0) scale(${(1 + mousePosition.x * (isMobile ? 0.002 : 0.004)) * nebulaAnimations.nebula3.scale})`,
                            animationName: (nebulaAnimations.nebula3.opacity < 0.2 || isMobile) ? 'none' : 'float',
                            animationDuration: isMobile ? '40s' : '30s',
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            animationDirection: 'alternate',
                            animationDelay: '10s',
                            transition: `transform ${isMobile ? '0.3s' : '0.6s'} ease-out, opacity 0.4s linear`,
                            willChange: 'transform, opacity'
                        }}
                    />

                    {/* Nebulosa púrpura central */}
                    {nebulaAnimations.centralPurple.opacity > 0 && (
                        <div 
                            className="absolute w-[380px] h-[380px] rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, #a855f7 0%, #8b5cf6 20%, #ec4899 40%, #6366f1 60%, transparent 80%)',
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) scale(${nebulaAnimations.centralPurple.scale})`,
                                opacity: nebulaAnimations.centralPurple.opacity,
                                transition: 'transform 0.8s ease-out, opacity 0.6s ease-out'
                            }}
                        />
                    )}
                </div>
            </NoSSR>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    50% { transform: translateY(-30px) rotate(5deg) scale(1.08); }
                }
            `}</style>
        </div>
    );
};

export default Background;