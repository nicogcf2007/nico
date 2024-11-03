import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../Contexts/darkModeContext';

interface ShootingStar {
    id: number;
    startX: number;
    startY: number;
    angle: number;
    speed: number;
}

const Background = () => {
    const { isDarkMode } = useDarkMode();
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
    const [starId, setStarId] = useState(0);
    const [stars, setStars] = useState(Array.from({ length: 50 }, () => createStar()));
    const clouds = [
        { size: 'w-32 h-12', top: '10%', left: '15%', delay: 0, opacity: 0.6 },
        { size: 'w-48 h-16', top: '20%', right: '25%', delay: 2, opacity: 0.7 },
        { size: 'w-40 h-14', top: '35%', left: '45%', delay: 1, opacity: 0.5 },
        { size: 'w-36 h-10', top: '15%', left: '65%', delay: 3, opacity: 0.4 },
        { size: 'w-44 h-14', top: '45%', left: '25%', delay: 2, opacity: 0.6 },
        { size: 'w-28 h-10', top: '25%', left: '85%', delay: 1, opacity: 0.5 },
    ];

    // Configuración de pájaros
    const birds = [
        { delay: 0, duration: 20, y: '15%' },
        { delay: 5, duration: 25, y: '25%' },
        { delay: 10, duration: 22, y: '35%' },
    ];


    // Función para crear una estrella con propiedades aleatorias
    function createStar() {
        return {
            id: Math.random().toString(36).substr(2, 9), // Genera un ID único para cada estrella
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
        };
    }

    useEffect(() => {
        const createShootingStar = () => {
            const startX = Math.random() * window.innerWidth;
            const startY = -20;
            const angle = Math.random() * 30 + 30;
            const speed = Math.random() * 2 + 1;
            const id = starId;

            setShootingStars(prev => [...prev, {
                id,
                startX,
                startY,
                angle,
                speed
            }]);

            setStarId(prev => prev + 1);

            setTimeout(() => {
                setShootingStars(prev => prev.filter(star => star.id !== id));
            }, 2000);
        };

        const interval = setInterval(createShootingStar, 3000);
        return () => clearInterval(interval);
    }, [starId]);
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Gradiente base con transición suave */}
            <motion.div
                animate={{
                    background: isDarkMode
                        ? 'linear-gradient(to bottom right, #0a0426, #1a0f3c, #2c1166)'
                        : 'linear-gradient(to bottom right, rgb(219 234 254), rgb(243 244 246), white)'
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
            />

            {/* Elementos del modo claro */}
            <AnimatePresence>
                {!isDarkMode && (
                    <>
                        {/* Sol animado */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}
                                className="absolute top-[10%] right-[10%] w-24 h-24 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 blur-sm"
                            />
                        </motion.div>

                        {/* Nubes animadas */}
                        {clouds.map((cloud, index) => (
                            <motion.div
                                key={`cloud-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    animate={{
                                        x: [-20, 20, -20],
                                        y: [-5, 5, -5],
                                    }}
                                    transition={{
                                        duration: 20 + cloud.delay,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: cloud.delay,
                                    }}
                                    className={`absolute ${cloud.size}`}
                                    style={{
                                        top: cloud.top,
                                        left: cloud.left,
                                        right: cloud.right,
                                    }}
                                >
                                    <div className={`w-full h-full bg-white rounded-full`} style={{ opacity: cloud.opacity }} />
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Pájaros */}
                        {birds.map((bird, index) => (
                            <motion.div
                                key={`bird-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    initial={{ x: -100 }}
                                    animate={{ x: "calc(100vw + 100px)" }}
                                    transition={{
                                        duration: bird.duration,
                                        repeat: Infinity,
                                        delay: bird.delay,
                                        ease: "linear",
                                    }}
                                    className="absolute"
                                    style={{ top: bird.y }}
                                >
                                    <motion.div
                                        animate={{ y: [-2, 2, -2] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                        className="w-3 h-1 bg-gray-600 rounded-full transform rotate-[30deg]"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Elementos del modo oscuro */}
            <AnimatePresence>
                {isDarkMode && (
                    <>
                        {/* Nebulosas */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    opacity: [0.2, 0.3, 0.2],
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "linear"
                                }}
                                className="absolute inset-0 mix-blend-screen opacity-20 bg-[radial-gradient(circle_at_25%_25%,_#9333ea_0%,_transparent_70%)]"
                            />

                            <motion.div
                                animate={{
                                    opacity: [0.15, 0.25, 0.15],
                                    scale: [1, 1.05, 1],
                                    rotate: [360, 0]
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "linear"
                                }}
                                className="absolute inset-0 mix-blend-screen opacity-20 bg-[radial-gradient(circle_at_50%_60%,_#4f46e5_0%,_transparent_65%)]"
                            />

                            <motion.div
                                animate={{
                                    opacity: [0.15, 0.25, 0.15],
                                    scale: [1, 1.08, 1],
                                    rotate: [0, -360]
                                }}
                                transition={{
                                    duration: 35,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "linear"
                                }}
                                className="absolute inset-0 mix-blend-screen opacity-20 bg-[radial-gradient(circle_at_80%_80%,_#6366f1_0%,_transparent_65%)]"
                            />
                        </motion.div>

                        {/* Estrellas */}
                        <div className="absolute inset-0">
                            {stars.map((star) => (
                                <motion.div
                                    key={star.id}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0, 0.6, 0],
                                    }}
                                    transition={{
                                        duration: star.duration,
                                        delay: star.delay,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    style={{
                                        left: star.left,
                                        top: star.top,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Estrellas fugaces */}
                        <div>
                            {shootingStars.map((star) => (
                                <motion.div
                                    key={star.id}
                                    className="absolute w-2 h-2 bg-white rounded-full"
                                    initial={{
                                        x: star.startX,
                                        y: star.startY,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: star.startX + (Math.cos(star.angle * Math.PI / 180) * 1000),
                                        y: star.startY + (Math.sin(star.angle * Math.PI / 180) * 1000),
                                        opacity: [0, 0.8, 0],
                                    }}
                                    transition={{
                                        duration: 1.5 / star.speed,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: Math.random() * 5
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Background