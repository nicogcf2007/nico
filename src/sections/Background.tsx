'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import NoSSR from '../components/NoSSR';
import { useIsMobile } from '../utils/deviceDetection';
import gsap from 'gsap';

// Importación dinámica para evitar problemas con SSR
const ThreeJSParticles = dynamic(() => import('../components/ThreeJSParticles'), { ssr: false });

// --- Types ---
interface DataRefType {
    mouse: { x: number; y: number; targetX: number; targetY: number };
    scroll: { progress: number; targetProgress: number };
    isMobile: boolean;
    mouseParallaxFactor: number;
    scrollParallaxFactor: number;
    nebulaRefs: { [key: string]: HTMLElement | null };
    gradientRef: HTMLElement | null;
}

interface ThreeJSProps {
    mousePosition: { x: number; y: number };
    scrollProgress: number;
}

const nebulaConfigs = (isMobile: boolean) => ({
    topLeft: {
        id: 'topLeftNebula',
        className: `absolute rounded-full blur-3xl opacity-0 ${isMobile ? 'w-80 h-80' : 'w-[500px] h-[500px]'}`,
        style: {
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 80%)',
            left: '-10%',
            top: '-10%',
            willChange: 'transform, opacity',
        },
        parallax: { x: 0.05, y: 0.05, scroll: 0.06, mouseScale: 0.003 },
    },
    bottomRight: {
        id: 'bottomRightNebula',
        className: `absolute rounded-full blur-3xl opacity-0 ${isMobile ? 'w-96 h-96' : 'w-[600px] h-[600px]'}`,
        style: {
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)',
            right: '-10%',
            bottom: '-15%',
            willChange: 'transform, opacity',
        },
        parallax: { x: -0.03, y: -0.03, scroll: 0.03, mouseScale: 0.001 },
    },
});

// --- Componente Principal ---
const Background = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    
    const dataRef = useRef<DataRefType>({
        mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
        scroll: { progress: 0, targetProgress: 0 },
        isMobile: false,
        mouseParallaxFactor: 1.0,
        scrollParallaxFactor: 0.02,
        nebulaRefs: {},
        gradientRef: null,
    });
    
    const threeJsPropsRef = useRef<ThreeJSProps>({ mousePosition: { x: 0, y: 0 }, scrollProgress: 0 });

    useEffect(() => {
        console.log('[Background] ✨ Component mounted & animations started');
        setMounted(true);
        const { current: data } = dataRef;
        data.isMobile = isMobile;
        data.mouseParallaxFactor = isMobile ? 0.3 : 1.0;
        data.scrollParallaxFactor = isMobile ? 0.008 : 0.02;

        const q = gsap.utils.selector(containerRef);
        const configs = nebulaConfigs(isMobile);
        data.nebulaRefs = {
            topLeft: q(`#${configs.topLeft.id}`)[0],
            bottomRight: q(`#${configs.bottomRight.id}`)[0],
        };
        data.gradientRef = q('#gradient-bg')[0] as HTMLElement | null;
        
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                data.mouse.targetX = (e.clientX - rect.left) / rect.width * 2 - 1;
                data.mouse.targetY = (e.clientY - rect.top) / rect.height * 2 - 1;
            }
        };

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            data.scroll.targetProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        let frameCount = 0;
        let lastLogTime = performance.now();

        const ticker = () => {
            frameCount++;
            const now = performance.now();
            if (now - lastLogTime > 5000) { // Log every 5 seconds
                const fps = frameCount / ((now - lastLogTime) / 1000);
                console.log(`[Background] GSAP Ticker FPS: ${fps.toFixed(2)}`);
                frameCount = 0;
                lastLogTime = now;
            }

            const lerpFactor = 0.08;
            
            data.mouse.x += (data.mouse.targetX - data.mouse.x) * lerpFactor;
            data.mouse.y += (data.mouse.targetY - data.mouse.y) * lerpFactor;
            data.scroll.progress += (data.scroll.targetProgress - data.scroll.progress) * lerpFactor;
            
            threeJsPropsRef.current = {
                mousePosition: { x: data.mouse.x, y: data.mouse.y },
                scrollProgress: data.scroll.progress,
            };

            const mouseParallax = {
                x: data.mouse.x * data.mouseParallaxFactor,
                y: data.mouse.y * data.mouseParallaxFactor,
            };
            const scrollParallax = data.scroll.progress * 100 * data.scrollParallaxFactor;

            const scrollEffectStart = isMobile ? 100 : 150;
            const scrollEffectRange = isMobile ? 2000 : 2500;
            const currentScrollValue = Math.max(0, data.scroll.progress * (document.documentElement.scrollHeight - window.innerHeight) - scrollEffectStart);
            const progress = Math.min(currentScrollValue / scrollEffectRange, 1);
            
            const configs = nebulaConfigs(data.isMobile);

            Object.entries(data.nebulaRefs).forEach(([key, nebulaRef]) => {
                if (!nebulaRef) return;
                
                const config = configs[key as keyof typeof configs];
                if (!config) return;

                gsap.set(nebulaRef, {
                    opacity: progress,
                    x: mouseParallax.x * config.parallax.x,
                    y: (mouseParallax.y * config.parallax.y) - (scrollParallax * config.parallax.scroll),
                    scale: 1 + (data.mouse.y * config.parallax.mouseScale),
                });
            });
            
            if (data.gradientRef) {
                gsap.set(data.gradientRef, {
                    x: mouseParallax.x * 0.03,
                    y: mouseParallax.y * 0.03 - scrollParallax * 0.05,
                });
            }
        };
        
        gsap.ticker.add(ticker);

        return () => {
            console.log('[Background] 🧹 Component unmounted & resources cleaned up');
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            gsap.ticker.remove(ticker);
        };
    }, [isMobile]);
    
    if (!mounted) {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-black" />
            </div>
        );
    }

    const configs = nebulaConfigs(isMobile);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
            <div 
                id="gradient-bg"
                className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-black"
                style={{ willChange: 'transform' }}
            />
            
            <NoSSR>
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <ThreeJSParticles propsRef={threeJsPropsRef} />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                    {Object.values(configs).map(config => (
                        <div key={config.id} id={config.id} className={config.className} style={config.style} />
                    ))}
                </div>
            </NoSSR>
        </div>
    );
};

export default Background;