import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translations } from '../utils/translations'; // Assuming Translations type exists
import { useDarkMode } from '../Contexts/darkModeContext'; // Import context hook

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string; // Puede ser una URL externa o una ruta local
  t: Translations; // Keep t prop for translations
  // No longer need theme prop
}

export const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoUrl, t }) => {
  const { isDarkMode } = useDarkMode(); // Use the context

  // No AnimatePresence needed around the conditional return
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && ( // Ensure motion components are direct children for exit animations
        <motion.div
          className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/70" // Added backdrop-blur
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            // Apply theme styles
            className="overflow-hidden relative w-full max-w-4xl rounded-lg border shadow-xl bg-light-background-primary border-light-border dark:bg-dark-background-secondary dark:border-dark-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }} // Adjusted spring
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button - Styled for both themes */}
            <button
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full text-light-text-secondary hover:bg-light-secondary dark:text-dark-text-secondary dark:hover:bg-dark-secondary transition-colors"
              onClick={onClose}
              aria-label={t.projects.closeButton || "Close"} // Add aria-label
            >
              <X size={20} />
            </button>
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-light-background-tertiary dark:bg-black">
              <video 
                src={videoUrl} 
                className="absolute inset-0 w-full h-full" 
                controls
                controlsList="nodownload"
                autoPlay={false}
                playsInline
                title={t.projects.video || "Project Video"}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CodeNotAvailablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations; // Keep t prop
  // No longer need theme prop
}

export const CodeNotAvailablePopup: React.FC<CodeNotAvailablePopupProps> = ({ isOpen, onClose, t }) => {
  const { isDarkMode } = useDarkMode(); // Use the context

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            // Apply theme styles
            className="overflow-hidden relative p-6 w-full max-w-md rounded-lg border shadow-xl bg-light-background-primary border-light-border dark:bg-dark-background-secondary dark:border-dark-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
          >
             {/* Close Button */}
            <button
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full text-light-text-secondary hover:bg-light-secondary dark:text-dark-text-secondary dark:hover:bg-dark-secondary transition-colors"
              onClick={onClose}
               aria-label={t.projects.closeButton || "Close"}
            >
              <X size={20} />
            </button>
            <div className="pt-4 text-center"> {/* Added padding top */}
              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                {t.projects.codeNotAvailable}
              </h3>
              {/* Message */}
              <p className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                 {t.projects.error}
              </p>
              {/* Close Button (main) */}
              <button
                // Use theme primary button style
                className="px-5 py-2.5 font-medium rounded-lg border transition-colors duration-200 text-white bg-light-primary border-light-primary hover:bg-light-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:bg-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary-hover dark:focus:ring-dark-primary dark:text-dark-text-primary dark:focus:ring-offset-dark-background-secondary"
                onClick={onClose}
              >
                {t.projects.closeButton}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};