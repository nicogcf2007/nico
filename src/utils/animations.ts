import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 }, // Para usar con whileInView
  hidden: { opacity: 0, y: 20 },  // Para usar con whileInView
  exit: { opacity: 0, y: 20 },
};

// Permite personalizar el stagger y delay
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerChildren,
      delayChildren: delayChildren,
    },
  },
  visible: { // Para usar con whileInView
    transition: {
      staggerChildren: staggerChildren,
      delayChildren: delayChildren,
    },
  },
  hidden: {},
});

export const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // Pequeño delay antes de que los hijos empiecen
      staggerChildren: 0.1, // Stagger entre hijos
    },
  },
};