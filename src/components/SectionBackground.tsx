import React from 'react';

const SectionBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-light/5 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-light/10 via-transparent to-transparent" />
    </>
  );
};

export default SectionBackground; 