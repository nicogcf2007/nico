import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: readonly string[];
  icon?: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon }) => {

  return (
<motion.div
      className="flex flex-col h-full overflow-hidden rounded-lg border shadow-md bg-light-background-primary dark:bg-dark-background-secondary border-light-border dark:border-dark-border dark:shadow-lg transition-colors duration-200 ease-in-out hover:border-light-border-hover hover:shadow-[0_10px_15px_-3px_rgba(59,130,246,0.1),_0_4px_6px_-4px_rgba(59,130,246,0.1)] dark:hover:border-dark-border-hover dark:hover:shadow-[0_10px_15px_-3px_rgba(113,105,230,0.2),_0_4px_6px_-4px_rgba(113,105,230,0.1)]"
      whileHover={{
         y: -5
      }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 p-4 border-b border-light-border bg-light-background-secondary dark:border-dark-border dark:bg-dark-background-tertiary">
        <span className="text-light-primary dark:text-dark-primary">
            {icon ? icon : <Layers size={20} />}
        </span>
        <h4 className="text-lg font-semibold tracking-wide text-light-text-primary dark:text-dark-text-primary">{title}</h4>
      </div>

      <div className="flex flex-wrap gap-1.5 p-4">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            className="inline-block whitespace-nowrap rounded-lg border border-light-border/50 bg-light-secondary px-3 py-1 text-xs text-light-text-secondary transition-colors duration-200 hover:bg-light-secondary-hover dark:border-dark-border dark:bg-dark-secondary dark:text-dark-text-primary dark:hover:bg-dark-secondary-hover"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;