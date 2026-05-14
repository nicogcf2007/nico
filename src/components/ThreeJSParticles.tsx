'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { isMobileDevice, isLowEndDevice } from '../utils/deviceDetection';

const getOptimizedConfig = () => {
    const isMobile = isMobileDevice();
    const isLowEnd = isLowEndDevice();
    return {
        particleCount: isLowEnd ? 100 : isMobile ? 200 : 300,
        spread: isLowEnd ? 60 : isMobile ? 80 : 100,
        velocityMultiplier: isLowEnd ? 0.2 : isMobile ? 0.3 : 0.4,
        scrollMultiplier: isLowEnd ? 0.004 : isMobile ? 0.006 : 0.008,
        mouseMultiplier: isLowEnd ? 0.03 : isMobile ? 0.045 : 0.09,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        maxFPS: isMobile ? 30 : 60,
        zRange: isLowEnd ? 120 : isMobile ? 150 : 180,
    };
};

interface ThreeJSProps {
    mousePosition: { x: number; y: number };
    scrollProgress: number;
}

interface ThreeJSParticlesProps {
    propsRef: React.RefObject<ThreeJSProps>;
}

const ThreeJSParticles: React.FC<ThreeJSParticlesProps> = ({ propsRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const config = useMemo(() => getOptimizedConfig(), []);

    useEffect(() => {
        if (!containerRef.current) return;

        let animationId: number;
        const parentElement = containerRef.current;

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
        const basePositions = new Float32Array(config.particleCount * 3);
        const twinkleOffsets = new Float32Array(config.particleCount);

        const Z_POS_MIN_LOCAL = -config.zRange;
        const SPREAD_XY = config.spread;

        for (let i = 0; i < config.particleCount; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * SPREAD_XY;
            const y = (Math.random() - 0.5) * SPREAD_XY;
            const z = Math.random() * Z_POS_MIN_LOCAL;
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            basePositions[i3] = x;
            basePositions[i3 + 1] = y;
            basePositions[i3 + 2] = z;
            sizes[i] = Math.random() * 3.5 + 1.5;

            const baseVelocity = 0.002 * config.velocityMultiplier;
            velocities[i3] = (Math.random() - 0.5) * baseVelocity;
            velocities[i3 + 1] = (Math.random() - 0.5) * baseVelocity;
            velocities[i3 + 2] = (0.015 + Math.random() * 0.02) * config.velocityMultiplier;

            twinkleOffsets[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const uniforms = {
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uTwinkle: { value: new Float32Array(twinkleOffsets) },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
                attribute float size;
                uniform float uTime;
                uniform float uScroll;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    float twinkle = 0.6 + 0.4 * sin(uTime * 2.0 + position.x * 3.0 + position.y * 5.0);
                    float colorMix = 0.4 + 0.6 * uScroll;
                    gl_PointSize = size * twinkle * (90.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float uScroll;
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    if (dist > 0.5) discard;
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    float colorMix = 0.4 + 0.6 * uScroll;
                    vec3 color1 = vec3(1.0, 1.0, 1.0);
                    vec3 color2 = vec3(0.6, 0.4, 1.0);
                    vec3 color3 = vec3(0.3, 0.6, 1.0);
                    vec3 color = mix(color1, color2, colorMix);
                    color = mix(color, color3, smoothstep(0.5, 1.0, uScroll));
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        let isVisible = true;
        let lastFrameTime = -1;
        let elapsedTime = 0;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                isVisible = false;
                cancelAnimationFrame(animationId);
            } else {
                isVisible = true;
                lastFrameTime = -1;
                animate(performance.now());
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const animate = (time: number) => {
            animationId = requestAnimationFrame(animate);
            if (!propsRef.current || !isVisible) return;

            const now = performance.now();
            const targetFrameTime = 1000 / config.maxFPS;
            const deltaTime = time - lastFrameTime;
            if (deltaTime < targetFrameTime) return;

            lastFrameTime = time;
            const dt = deltaTime / 16.67;
            elapsedTime += dt * 0.02;

            uniforms.uTime.value = elapsedTime;

            const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;

            for (let i = 0; i < config.particleCount; i++) {
                const i3 = i * 3;
                positionAttribute.array[i3] += velocities[i3] * dt;
                positionAttribute.array[i3 + 1] += velocities[i3 + 1] * dt;
                positionAttribute.array[i3 + 2] += velocities[i3 + 2] * dt;

                if (stars.position.z + positionAttribute.array[i3 + 2] > camera.position.z + 10) {
                    positionAttribute.array[i3 + 2] = -config.zRange - Math.random() * 0.2;
                    positionAttribute.array[i3] = (Math.random() - 0.5) * config.spread;
                    positionAttribute.array[i3 + 1] = (Math.random() - 0.5) * config.spread;
                }
            }
            positionAttribute.needsUpdate = true;

            const { mousePosition, scrollProgress } = propsRef.current;
            const zMin = -6;
            const zMax = 45;

            stars.position.x = mousePosition.x * config.mouseMultiplier;
            stars.position.y = -mousePosition.y * config.mouseMultiplier;
            stars.position.z = zMin + (zMax - zMin) * scrollProgress;

            uniforms.uScroll.value = scrollProgress;

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        animate(0);

        return () => {
            cancelAnimationFrame(animationId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('resize', handleResize);

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

            if (parentElement && renderer.domElement && parentElement.contains(renderer.domElement)) {
                parentElement.removeChild(renderer.domElement);
            }
        };
    }, [config, propsRef]);

    return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ThreeJSParticles;
