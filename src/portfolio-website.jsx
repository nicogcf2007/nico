import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

// Translations object
const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact"
    },
    hero: {
      title: "Hello, I'm",
      role: "Full Stack Developer & UI/UX Designer"
    },
    projects: {
      title: "Featured Projects",
      projectName: "Project Name",
      description: "Brief project description. Technologies used and results achieved.",
      demo: "Demo",
      code: "Code"
    },
    about: {
      title: "About Me",
      description: "I'm a developer passionate about creating unique and functional digital experiences. With experience in full stack web development, I specialize in building robust and scalable applications.",
      skills: "Skills",
      experience: "Experience",
      roles: [
        "Senior Developer - Company X",
        "Tech Lead - Startup Y",
        "Freelance Developer"
      ]
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      findMe: "You can also find me on:",
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre Mí",
      contact: "Contacto"
    },
    hero: {
      title: "Hola, soy",
      role: "Desarrollador Full Stack & Diseñador UI/UX"
    },
    projects: {
      title: "Proyectos Destacados",
      projectName: "Nombre del Proyecto",
      description: "Descripción breve del proyecto. Tecnologías utilizadas y resultados obtenidos.",
      demo: "Demo",
      code: "Código"
    },
    about: {
      title: "Sobre Mí",
      description: "Soy un desarrollador apasionado por crear experiencias digitales únicas y funcionales. Con experiencia en desarrollo web full stack, me especializo en construir aplicaciones robustas y escalables.",
      skills: "Habilidades",
      experience: "Experiencia",
      roles: [
        "Desarrollador Senior - Empresa X",
        "Tech Lead - Startup Y",
        "Freelance Developer"
      ]
    },
    contact: {
      title: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar Mensaje",
      findMe: "También puedes encontrarme en:",
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  }
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const t = translations[language];
  
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
    <div className="min-h-screen text-zinc-100 relative">
      <div className="fixed inset-0 bg-[#0d1117] overflow-hidden z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_0%_0%,_#238636_0%,_transparent_50%)]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4
          }}
          className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_100%_100%,_#2F81F7_0%,_transparent_50%)]"
        />
      </div>

      <div className="relative z-10">
        <nav className="fixed w-full bg-[#0d1117]/80 backdrop-blur-sm z-50 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-[#2F81F7] to-[#238636] bg-clip-text text-transparent"
              >
                NRDev
              </motion.span>
              
              <div className="hidden md:flex items-center space-x-8">
                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex space-x-8"
                >
                  {[
                    ['#inicio', t.nav.home],
                    ['#proyectos', t.nav.projects],
                    ['#sobre-mi', t.nav.about],
                    ['#contacto', t.nav.contact]
                  ].map(([href, text]) => (
                    <motion.a
                      key={href}
                      href={href}
                      variants={fadeInUp}
                      className="hover:text-[#2F81F7] transition-colors relative group"
                    >
                      {text}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2F81F7] transition-all group-hover:w-full" />
                    </motion.a>
                  ))}
                </motion.div>
                
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center space-x-1 hover:text-[#2F81F7] transition-colors"
                >
                  <Globe size={20} />
                  <span className="uppercase text-sm">{language}</span>
                </button>
              </div>

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute w-full bg-[#0d1117] border-b border-zinc-800 py-4"
            >
              <div className="flex flex-col space-y-4 px-4">
                <a href="#inicio" className="hover:text-[#2F81F7] transition-colors">{t.nav.home}</a>
                <a href="#proyectos" className="hover:text-[#2F81F7] transition-colors">{t.nav.projects}</a>
                <a href="#sobre-mi" className="hover:text-[#2F81F7] transition-colors">{t.nav.about}</a>
                <a href="#contacto" className="hover:text-[#2F81F7] transition-colors">{t.nav.contact}</a>
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center space-x-1 hover:text-[#2F81F7] transition-colors"
                >
                  <Globe size={20} />
                  <span className="uppercase text-sm">{language}</span>
                </button>
              </div>
            </motion.div>
          )}
        </nav>

        <section id="inicio" className="min-h-screen flex items-center justify-center pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-4 py-20 text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
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
              className="text-xl md:text-2xl text-zinc-400 mb-8"
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
              {[
                ['https://github.com', <Github size={24} />],
                ['https://linkedin.com', <Linkedin size={24} />],
                ['mailto:tu@email.com', <Mail size={24} />]
              ].map(([href, icon], index) => (
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
            className="max-w-6xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.projects.title}
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{t.projects.projectName} {project}</h3>
                    <p className="text-zinc-400 mb-4">
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
        </div>
      </div>
)}

export default Portfolio