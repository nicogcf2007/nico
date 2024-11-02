import React, { useState } from 'react';
import {
  Github,
  ExternalLink,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import translations, { LanguageTranslations } from './utils/translations';
import socialLinks from './utils/contacts';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<keyof LanguageTranslations>(
    navigator.language.startsWith("es") ? "es" : "en"
  );
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
    <div className="relative min-h-screen text-zinc-100">
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
          <div className="max-w-6xl px-4 py-4 mx-auto">
            <div className="flex items-center justify-between">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-[#2F81F7] to-[#238636] bg-clip-text text-transparent"
              >
                NRDev
              </motion.span>

              <div className="items-center hidden space-x-8 md:flex">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex space-x-8"
                >
                  {[
                    ['#home', t.nav.home],
                    ['#projects', t.nav.projects],
                    ['#about', t.nav.about],
                    ['#contact', t.nav.contact]
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
                  <span className="text-sm uppercase">{language}</span>
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
              <div className="flex flex-col px-4 space-y-4">
                <a href="#inicio" className="hover:text-[#2F81F7] transition-colors">{t.nav.home}</a>
                <a href="#proyectos" className="hover:text-[#2F81F7] transition-colors">{t.nav.projects}</a>
                <a href="#sobre-mi" className="hover:text-[#2F81F7] transition-colors">{t.nav.about}</a>
                <a href="#contacto" className="hover:text-[#2F81F7] transition-colors">{t.nav.contact}</a>
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center space-x-1 hover:text-[#2F81F7] transition-colors"
                >
                  <Globe size={20} />
                  <span className="text-sm uppercase">{language}</span>
                </button>
              </div>
            </motion.div>
          )}
        </nav>

        <section id="inicio" className="flex items-center justify-center min-h-screen pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl px-4 py-20 mx-auto text-center"
          >
            <motion.h1
              className="mb-6 text-5xl font-bold md:text-7xl"
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
        <section id="sobre-mi" className="py-20">
          <div className="max-w-4xl px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">{t.about.title}</h2>
            <div className="bg-[#161b22]/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8">
              <p className="mb-6 text-zinc-300">{t.about.description}</p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold">{t.about.skills}</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'SQL', 'AWS'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#0d1117] border border-zinc-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-bold">{ }</h3>
                  <ul className="space-y-2 text-zinc-300">
                    {
                      t.about.roles.map(rol => (
                        <li>• {rol}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20">
          <div className="max-w-4xl px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">{t.contact.title}</h2>
            <div className="bg-[#161b22]/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">{t.contact.name}</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">{t.contact.email}</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">{t.contact.message}</label>
                  <textarea
                    rows={4}
                    className="w-full p-3 bg-[#0d1117] rounded-lg border border-zinc-800 focus:border-[#2F81F7] focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#2F81F7] to-[#238636] rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  {t.contact.send}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-zinc-400">
          <div className="max-w-6xl px-4 mx-auto">
            <p>© {new Date().getFullYear()} Nicolas Rivera. {t.footer.rights}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Portfolio