import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: readonly string[];
  icon?: React.ReactNode;
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon, className }) => {

  return (
    <motion.div
      className={`flex flex-col h-full overflow-hidden rounded-lg border shadow-md bg-surface/50 border-border hover:border-accent/70 hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{
         y: -5
      }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-surface/20">
        <span className="text-accent-light">
            {icon ? icon : <Layers size={20} />}
        </span>
        <h4 className="text-lg font-semibold tracking-wide text-text-primary">{title}</h4>
      </div>

      <div className="flex flex-wrap gap-1.5 p-4">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            className="inline-block whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1 text-xs text-text-secondary transition-colors duration-200 hover:bg-border"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;