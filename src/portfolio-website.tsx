import React, { useEffect, useState } from 'react';
import {
  Github,
  ExternalLink,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence  } from 'framer-motion';
import translations, { LanguageTranslations } from './utils/translations';
import socialLinks from './utils/contacts';
import { useDarkMode } from './customHooks/useDarkMode';


interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
}

const Portfolio = () => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [starId, setStarId] = useState(0);
  const [stars, setStars] = useState(Array.from({ length: 50 }, () => createStar()));
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [language, setLanguage] = useState<keyof LanguageTranslations>(
    navigator.language.startsWith("es") ? "es" : "en"
  );
  const t = translations[language];

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

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen text-zinc-100">
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
      <div className="fixed top-0 z-50 mt-2 -translate-x-1/2 left-1/2">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="rounded-full"
        >
          <motion.div
            className="rounded-full bg-white/15 dark:bg-gray-800/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hasScrolled ? 1 : 0,
              transition: { duration: 0.4 }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1
            }}
          />
          <div className="px-1">
            <div className="flex items-center justify-center h-9">
              <div className="w-full">
                <div className="flex flex-wrap items-center justify-center space-x-1 text-sm font-bold text-zinc-100">
                  <motion.a
                    href="#proyectos"
                    className="px-3 py-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Proyectos
                  </motion.a>
                  <motion.a
                    href="#educacion"
                    className="px-3 py-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Educación
                  </motion.a>
                  <motion.a
                    href="#sobre-mi"
                    className="px-3 py-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sobre mí
                  </motion.a>
                  <motion.a
                    href="#contacto"
                    className="px-3 py-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contacto
                  </motion.a>
                  <div className="flex items-center pl-1">
                    <motion.button
                      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                      className="p-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="p-1.5 transition-all rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>
      <div className="relative z-10">
        <section id="inicio" className="flex items-center justify-center min-h-screen pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl px-4 py-20 mx-auto text-center"
          >
            <motion.h1
              className="mb-6 text-5xl font-bold md:text-7xl text-light-text-primary dark:text-dark-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.hero.title}{' '}
              <motion.span
                className="bg-gradient-to-r from-[#2F81F7] to-[#238636] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Nicolas
              </motion.span>
            </motion.h1>
            <motion.p
              className="mb-8 text-xl md:text-2xl text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.hero.role}
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {socialLinks.map(([href, icon], index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-[#2F81F7] transition-colors transform hover:scale-110"
                  variants={fadeInUp}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="proyectos" className="py-20">
          <motion.div
            className="max-w-6xl px-4 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="mb-12 text-3xl font-bold text-center md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.projects.title}
            </motion.h2>
            <motion.div
              className="grid gap-8 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[1, 2, 3, 4].map((project) => (
                <motion.div
                  key={project}
                  variants={fadeInUp}
                  className="bg-[#161b22]/50 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(47,129,247,0.2)"
                  }}
                >
                  <div className="aspect-video bg-zinc-900">
                    <img
                      src={`/api/placeholder/600/400`}
                      alt={`${t.projects.projectName} ${project}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{t.projects.projectName} {project}</h3>
                    <p className="mb-4 text-zinc-400">
                      {t.projects.description}
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="inline-flex items-center text-[#2F81F7] hover:text-[#238636] transition-colors"
                      >
                        {t.projects.demo} <ExternalLink size={16} className="ml-1" />
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center text-[#2F81F7] hover:text-[#238636] transition-colors"
                      >
                        {t.projects.code} <Github size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        {/* Sobre Mi */}
        <section id="sobre-mi" className="py-20">
          <motion.div
            className="max-w-4xl px-4 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="mb-12 text-3xl font-bold text-center md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.about.title}
            </motion.h2>
            <motion.div
              className="bg-[#161b22]/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="mb-6 text-zinc-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t.about.description}
              </motion.p>
              <motion.div
                className="grid gap-8 md:grid-cols-2"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-bold">{t.about.skills}</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'SQL', 'AWS'].map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-[#0d1117] border border-zinc-800 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-bold">{ }</h3>
                  <ul className="space-y-2 text-zinc-300">
                    {t.about.roles.map((rol, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        • {rol}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20">
          <motion.div
            className="max-w-4xl px-4 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="mb-12 text-3xl font-bold text-center md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
            <motion.div
              className="bg-[#161b22]/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.form
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium">{t.contact.name}</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium">{t.contact.email}</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block mb-2 text-sm font-medium">{t.contact.message}</label>
                  <textarea
                    rows={4}
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full py-3 font-medium transition-colors duration-200 rounded-lg hover:opacity-90 bg-light-secondary hover:bg-light-secondary-hover active:bg-light-secondary-active dark:bg-dark-secondary dark:hover:bg-dark-secondary-hover dark:active:bg-dark-secondary-active text-light-text-primary dark:text-dark-text-primary"
                  // className="w-full py-3 font-medium text-white transition-colors duration-200 rounded-lg hover:opacity-90 bg-light-primary hover:bg-light-primary-hover active:bg-light-primary-active dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:active:bg-dark-primary-active "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.contact.send}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-zinc-400">
          <div className="max-w-6xl px-4 mx-auto">
            <p>© {new Date().getFullYear()} Nicolas Rivera. {t.footer.rights}</p>
          </div>
        </footer>
      </div>
    </div >
  )
}

export default Portfolio