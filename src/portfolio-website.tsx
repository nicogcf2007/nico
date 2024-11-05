import { useState } from 'react';
import {
  Github,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import translations, { LanguageTranslations } from './utils/translations';
import socialLinks from './utils/contacts';
import Navigator from './sections/navigator';
import Background from './sections/background';

const Portfolio = () => {
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
      <Background/>
      <Navigator t={t} language={language} setLanguage={setLanguage} />
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

        <section id="projects" className="py-20">
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
                <motion.article
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
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>
        {/* Sobre Mi */}
        <section id="about" className="py-20">
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
        <section id="contact" className="py-20">
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