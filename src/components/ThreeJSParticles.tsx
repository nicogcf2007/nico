'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { isMobileDevice, isLowEndDevice } from '../utils/deviceDetection';

// --- Configuración Optimizada ---
const getOptimizedConfig = () => {
    const isMobile = isMobileDevice();
    const isLowEnd = isLowEndDevice();
    return {
        particleCount: isLowEnd ? 100 : isMobile ? 200 : 300,
        spread: isLowEnd ? 60 : isMobile ? 80 : 100,
        velocityMultiplier: isLowEnd ? 0.2 : isMobile ? 0.3 : 0.4,
        scrollMultiplier: isLowEnd ? 0.004 : isMobile ? 0.006 : 0.008,
        mouseMultiplier: isLowEnd ? 0.03 : isMobile ? 0.045 : 0.09,
        pixelRatio: Math.min(window.devicePixelRatio, isLowEnd ? 1 : isMobile ? 1.2 : 1.5),
        maxFPS: isLowEnd ? 25 : isMobile ? 45 : 60,
        zRange: isLowEnd ? 120 : isMobile ? 150 : 180,
    };
};

// --- Types ---
interface ThreeJSProps {
    mousePosition: { x: number; y: number };
    scrollY: number;
}

interface ThreeJSParticlesProps {
    propsRef: React.RefObject<ThreeJSProps>;
}

// --- Componente Principal ---
const ThreeJSParticles: React.FC<ThreeJSParticlesProps> = ({ propsRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const config = useMemo(() => getOptimizedConfig(), []);

    useEffect(() => {
        console.log('[ThreeJSParticles] ✨ Component mounted & Three.js scene initialized');
        if (!containerRef.current) return;

        let animationId: number;
        const parentElement = containerRef.current;
        
        // --- Inicialización ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({
            alpha: true, powerPreference: 'low-power', antialias: false,
            depth: false, stencil: false,
        });
        renderer.setPixelRatio(config.pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        parentElement.appendChild(renderer.domElement);

        const positions = new Float32Array(config.particleCount * 3);
        const sizes = new Float32Array(config.particleCount);
        const velocities = new Float32Array(config.particleCount * 3);

        const Z_POS_MIN_LOCAL = -config.zRange;
        const SPREAD_XY = config.spread;

        for (let i = 0; i < config.particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * SPREAD_XY;
            positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_XY;
            positions[i3 + 2] = Math.random() * Z_POS_MIN_LOCAL;
            sizes[i] = Math.random() * 3.5 + 1.5;
            
            const baseVelocity = 0.002 * config.velocityMultiplier;
            velocities[i3] = (Math.random() - 0.5) * baseVelocity;
            velocities[i3 + 1] = (Math.random() - 0.5) * baseVelocity;
            velocities[i3 + 2] = (0.015 + Math.random() * 0.02) * config.velocityMultiplier;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (90.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 - smoothstep(0.0, 0.5, dist));
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        let lastFrameTime = -1;
        let frameCount = 0;
        let lastLogTime = performance.now();

        // --- Bucle de Animación ---
        const animate = (time: number) => {
            animationId = requestAnimationFrame(animate);

            if (!propsRef.current || document.hidden) return;

            const now = performance.now();
            frameCount++;
            if (now - lastLogTime > 5000) { // Log every 5 seconds
                const fps = frameCount / ((now - lastLogTime) / 1000);
                console.log(`[ThreeJSParticles] rAF Loop FPS: ${fps.toFixed(2)}`);
                frameCount = 0;
                lastLogTime = now;
            }

            const targetFrameTime = 1000 / config.maxFPS;
            const deltaTime = time - lastFrameTime;

            if (deltaTime < targetFrameTime) return;
            
            lastFrameTime = time;
            const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;

            const timeScale = deltaTime / 16.67;
            for (let i = 0; i < config.particleCount; i++) {
                const i3 = i * 3;
                positionAttribute.array[i3] += velocities[i3] * timeScale;
                positionAttribute.array[i3 + 1] += velocities[i3 + 1] * timeScale;
                positionAttribute.array[i3 + 2] += velocities[i3 + 2] * timeScale;

                if (stars.position.z + positionAttribute.array[i3 + 2] > camera.position.z + 10) {
                    positionAttribute.array[i3 + 2] = -config.zRange - Math.random() * 0.2;
                    positionAttribute.array[i3] = (Math.random() - 0.5) * config.spread;
                    positionAttribute.array[i3 + 1] = (Math.random() - 0.5) * config.spread;
                }
            }
            positionAttribute.needsUpdate = true;
            
            const { mousePosition, scrollY } = propsRef.current;
            stars.position.x = mousePosition.x * config.mouseMultiplier;
            stars.position.y = -mousePosition.y * config.mouseMultiplier;
            stars.position.z = scrollY * config.scrollMultiplier;

            renderer.render(scene, camera);
        };

        // --- Manejadores de Eventos ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        
        animate(0);

        // --- Limpieza ---
        return () => {
            console.log('[ThreeJSParticles] 🧹 Component unmounted & Three.js resources cleaned up');
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);

            // Vaciar y destruir la escena de Three.js
            scene.traverse(object => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(mat => mat.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            scene.clear();
            
            renderer.dispose();
            renderer.forceContextLoss();

            if (parentElement.contains(renderer.domElement)) {
                parentElement.removeChild(renderer.domElement);
            }
        };
    }, [config, propsRef]);

    return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ThreeJSParticles; 