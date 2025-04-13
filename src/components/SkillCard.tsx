import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react'; // Default icon
import { useDarkMode } from '../Contexts/darkModeContext'; // Import context hook
import { Translations } from '../utils/translations'; // Assuming Translations type exists

interface SkillCardProps {
  title: string;
  skills: readonly string[];
  icon?: React.ReactNode;
  // No longer need theme prop
}

// Animation variants (Keep as is)
const cardVariants = { /* ... */ };
const tagVariants = { /* ... */ };

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon }) => {
  const { isDarkMode } = useDarkMode(); // Use the context

  return (
    <motion.div
      // Apply theme styles using config keys
      className="flex overflow-hidden flex-col h-full rounded-lg border shadow-md bg-light-background-primary border-light-border dark:bg-dark-background-secondary dark:border-dark-border dark:shadow-lg"
      variants={cardVariants}
      whileHover={{
         y: -5,
         // Use theme hover border colors
         borderColor: isDarkMode ? 'var(--color-dark-border-hover)' : 'var(--color-light-border-hover)', // Use CSS vars or Tailwind color names directly
         boxShadow: isDarkMode ? "0 10px 15px -3px rgba(113, 105, 230, 0.2), 0 4px 6px -4px rgba(113, 105, 230, 0.1)" : "0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -4px rgba(59, 130, 246, 0.1)", // Adjusted shadows
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Header */}
      <div className="flex gap-3 items-center p-4 border-b border-light-border bg-light-background-secondary dark:border-dark-border dark:bg-dark-background-tertiary">
        {/* Use theme primary color for icon */}
        <span className="text-light-primary dark:text-dark-primary">
            {icon ? icon : <Layers size={20} />}
        </span>
        {/* Use theme primary text for title */}
        <h4 className="text-lg font-semibold tracking-wide text-light-text-primary dark:text-dark-text-primary">{title}</h4>
      </div>

      {/* Card Body - Skill Tags */}
      <div className="flex flex-wrap flex-grow gap-2 p-4"> {/* Added flex-grow */}
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            // Use theme secondary colors for tags
            className="px-3 py-1 text-sm rounded-full border transition-colors duration-200 cursor-default bg-light-secondary text-light-text-secondary border-light-border hover:bg-light-secondary-hover dark:bg-dark-secondary dark:text-dark-text-primary dark:border-dark-border dark:hover:bg-dark-secondary-hover"
            custom={index}
            variants={tagVariants}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;