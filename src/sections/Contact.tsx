import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { LanguageTranslations } from '../utils/translations';

interface ContactProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const Contact: React.FC<ContactProps> = ({ t }) => {
  // Implementar lógica de envío si es necesario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario (p.ej., API call)
    alert('Form submission logic not implemented yet!');
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        className="px-4 mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mb-12 text-3xl font-bold text-center md:text-4xl text-light-text-primary dark:text-dark-text-primary"
          variants={fadeInUp}
        >
          {t.contact.title}
        </motion.h2>
        <motion.div
          className="p-8 rounded-lg border shadow-md transition-all duration-300 bg-light-background-primary border-light-border hover:border-light-border-hover hover:shadow-lg dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg dark:hover:border-dark-border-hover"
          variants={fadeInUp}
          transition={{ delay: 0.2 }} // Delay para el card
        >
          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            variants={staggerContainer(0.1)} // Stagger para los inputs
            initial="hidden" // Asegúrate que initial y whileInView se usen consistentemente
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Viewport para el form
          >
            <motion.div variants={fadeInUp}>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {t.contact.name}
              </label>
              <input
                id="name"
                name="name" // Añadir name para accesibilidad y manejo de form
                type="text"
                required
                className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                placeholder={t.contact.namePlaceholder || "Tu nombre"} // Añadir placeholder opcional
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {t.contact.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                placeholder={t.contact.emailPlaceholder || "tu@email.com"} // Añadir placeholder opcional
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="p-3 w-full rounded-lg border bg-light-background-primary border-light-border focus:border-light-primary focus:ring-1 focus:ring-light-primary focus:outline-none text-light-text-primary dark:bg-dark-background-tertiary dark:border-dark-border dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
                placeholder={t.contact.messagePlaceholder || "Tu mensaje..."} // Añadir placeholder opcional
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="px-6 py-3 w-full font-medium text-white rounded-lg border transition-colors duration-200 bg-light-primary border-light-primary hover:bg-light-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:bg-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary-hover dark:focus:ring-dark-primary dark:text-dark-text-primary dark:focus:ring-offset-dark-background-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={fadeInUp} // Animar el botón también
            >
              {t.contact.send}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;