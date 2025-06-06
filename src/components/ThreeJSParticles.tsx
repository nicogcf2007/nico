'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { isMobileDevice, isLowEndDevice } from '../utils/deviceDetection';

interface ThreeJSParticlesProps {
    mousePosition?: { x: number; y: number };
    scrollY?: number;
}

const getOptimizedConfig = () => {
    const isMobile = isMobileDevice();
    const isLowEnd = isLowEndDevice();

    return {
        particleCount: isLowEnd ? 250 : isMobile ? 400 : 500,
        spread: isLowEnd ? 100 : isMobile ? 120 : 150,
        velocityMultiplier: isLowEnd ? 0.3 : isMobile ? 0.38 : 0.5,
        scrollMultiplier: isLowEnd ? 0.0039 : isMobile ? 0.0065 : 0.013,
        mouseMultiplier: isLowEnd ? 0.03 : isMobile ? 0.05 : 0.1,
        antialias: !isMobile,
        pixelRatio: isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio,
        renderOnDemand: isLowEnd,
        zRange: isLowEnd ? 180 : isMobile ? 220 : 200,
        recycleDistance: isLowEnd ? 8 : isMobile ? 10 : 6
    };
};

const ThreeJSParticles: React.FC<ThreeJSParticlesProps> = ({
    mousePosition: mousePositionProp = { x: 0, y: 0 }, 
    scrollY: scrollYProp = 0
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationIdRef = useRef<number | null>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        stars: THREE.Points;
        velocities: Float32Array;
        geometry: THREE.BufferGeometry;
        material: THREE.ShaderMaterial;
    } | null>(null);
    
    const lastFrameTime = useRef<number>(0);
    const frameCount = useRef<number>(0);
    const config = useMemo(() => getOptimizedConfig(), []);

    const mousePosPropRef = useRef(mousePositionProp);
    const scrollYPropRef = useRef(scrollYProp);

    const updateMousePosition = useCallback((mousePosition: { x: number; y: number }) => {
        mousePosPropRef.current = mousePosition;
    }, []);

    const updateScrollY = useCallback((scrollY: number) => {
        scrollYPropRef.current = scrollY;
    }, []);

    useEffect(() => {
        updateMousePosition(mousePositionProp);
    }, [mousePositionProp, updateMousePosition]);

    useEffect(() => {
        updateScrollY(scrollYProp);
    }, [scrollYProp, updateScrollY]);

    useEffect(() => {
        if (!containerRef.current) return;

        const currentConfig = config;

        // Crear escena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 4; 

        // Configuración optimizada del renderer
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: currentConfig.antialias,
            powerPreference: isMobileDevice() ? 'low-power' : 'high-performance',
            stencil: false,
            depth: false
        });
        
        renderer.setPixelRatio(currentConfig.pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        if (isMobileDevice()) {
            renderer.shadowMap.enabled = false;
            renderer.outputColorSpace = THREE.SRGBColorSpace;
        }

        // Limpiar contenedor
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);

        // Configurar partículas
        const particleCount = currentConfig.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);
        const localVelocities = new Float32Array(particleCount * 3);

        const Z_POS_MAX_LOCAL = -5;
        const Z_POS_MIN_LOCAL = -currentConfig.zRange;
        const SPREAD_XY = currentConfig.spread;

        // Generación optimizada de partículas
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            const centerBias = isMobileDevice() ? 0.8 : 0.7;
            const spreadMultiplier = isMobileDevice() ? 1.2 : 1.0;
            positions[i3] = (Math.random() - 0.5) * SPREAD_XY * centerBias * spreadMultiplier;
            positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_XY * centerBias * spreadMultiplier;
            const zDistribution = isMobileDevice() ? Math.random() * 1.3 : Math.random();
            positions[i3 + 2] = Math.min(zDistribution, 1.0) * (Z_POS_MAX_LOCAL - Z_POS_MIN_LOCAL) + Z_POS_MIN_LOCAL;

            // Tamaños
            const starType = Math.random();
            if (starType < 0.7) {
                sizes[i] = Math.random() * 1.8 + 0.8;
            } else {
                sizes[i] = Math.random() * 3.5 + 1.5;
            }

            // Colores
            const colorType = Math.random();
            if (colorType < 0.7) { 
                colors[i3] = colors[i3 + 1] = colors[i3 + 2] = 1.0; 
            } else { 
                colors[i3] = 1.0; 
                colors[i3 + 1] = 1.0; 
                colors[i3 + 2] = 0.8; 
            }

            const baseVelocity = 0.003 * currentConfig.velocityMultiplier;
            localVelocities[i3] = (Math.random() - 0.5) * baseVelocity;
            localVelocities[i3 + 1] = (Math.random() - 0.5) * baseVelocity;
            localVelocities[i3 + 2] = (0.02 + Math.random() * 0.03) * currentConfig.velocityMultiplier;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (60.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        // Guardar referencias
        sceneRef.current = {
            scene,
            camera,
            renderer,
            stars,
            velocities: localVelocities,
            geometry,
            material
        };

        const initialStarsZ = 0;

        const animate = (currentTime: number = 0) => {
            if (!sceneRef.current) return;

            const { stars, velocities, camera, renderer, scene } = sceneRef.current;

            // Control de FPS para dispositivos de baja gama
            if (currentConfig.renderOnDemand) {
                const deltaTime = currentTime - lastFrameTime.current;
                if (deltaTime < 50) {
                    animationIdRef.current = requestAnimationFrame(animate);
                    return;
                }
                lastFrameTime.current = currentTime;
            }

            const positionAttribute = stars.geometry.attributes.position as THREE.BufferAttribute;
            const positionsArray = positionAttribute.array as Float32Array;

            // Movimiento del grupo de estrellas con scroll
            stars.position.z = initialStarsZ + (scrollYPropRef.current * currentConfig.scrollMultiplier); 

            // Actualización de partículas
            frameCount.current++;
            const updateStep = currentConfig.renderOnDemand ? 3 : isMobileDevice() ? 2 : 1;
            
            if (frameCount.current % updateStep === 0) {
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    
                    positionsArray[i3] += velocities[i3];
                    positionsArray[i3 + 1] += velocities[i3 + 1];
                    positionsArray[i3 + 2] += velocities[i3 + 2];

                    const starGlobalZ = stars.position.z + positionsArray[i3 + 2];
                    
                    if (starGlobalZ > camera.position.z + currentConfig.recycleDistance) { 
                        positionsArray[i3 + 2] = Z_POS_MIN_LOCAL - (Math.random() * currentConfig.zRange * 0.3); 
                        const centerBias = isMobileDevice() ? 0.8 : 0.7;
                        const extraSpread = isMobileDevice() ? 1.2 : 1.0;
                        positionsArray[i3] = (Math.random() - 0.5) * SPREAD_XY * centerBias * extraSpread;
                        positionsArray[i3 + 1] = (Math.random() - 0.5) * SPREAD_XY * centerBias * extraSpread;
                        
                        const baseVelocity = 0.003 * currentConfig.velocityMultiplier;
                        velocities[i3] = (Math.random() - 0.5) * baseVelocity;
                        velocities[i3 + 1] = (Math.random() - 0.5) * baseVelocity;
                        velocities[i3 + 2] = (0.02 + Math.random() * 0.03) * currentConfig.velocityMultiplier;
                    }
                }
                positionAttribute.needsUpdate = true;
            }
            
            // Paralaje del ratón
            const mouseMultiplier = currentConfig.mouseMultiplier;
            stars.position.x = mousePosPropRef.current.x * mouseMultiplier;
            stars.position.y = -mousePosPropRef.current.y * mouseMultiplier;

            renderer.render(scene, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            if (sceneRef.current) {
                const { camera, renderer } = sceneRef.current;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            
            // Limpieza completa de recursos Three.js
            if (sceneRef.current) {
                const { scene, renderer, geometry, material } = sceneRef.current;
                
                // Limpiar geometría
                geometry.dispose();
                
                // Limpiar material
                material.dispose();
                
                // Limpiar renderer
                renderer.dispose();
                renderer.forceContextLoss();
                
                // Limpiar escena
                scene.clear();
                
                // Limpiar contenedor DOM
                if (containerRef.current) {
                    while (containerRef.current.firstChild) {
                        containerRef.current.removeChild(containerRef.current.firstChild);
                    }
                }
                
                sceneRef.current = null;
            }
        };
    }, []);

    return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeJSParticles; 