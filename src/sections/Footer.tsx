import React from 'react';
import { LanguageTranslations } from '../utils/translations';

interface FooterProps {
  t: LanguageTranslations[keyof LanguageTranslations];
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="py-8 text-center text-light-text-tertiary dark:text-dark-text-tertiary">
      <div className="px-4 mx-auto max-w-6xl">
        <p>© {new Date().getFullYear()} Nicolas Rivera. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;