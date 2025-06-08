import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const PopupBase: React.FC<PopupProps> = ({ isOpen, onClose, children, title }) => {
  const { t } = useLanguage();

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
            className="overflow-hidden relative p-4 sm:p-6 w-full max-w-md rounded-lg border shadow-xl bg-surface/90 border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-text-primary">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
                aria-label={t.projects.closeButton}
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoUrl }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const getVideoType = (url: string): string | undefined => {
    if (url.endsWith('.mp4')) return 'video/mp4';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    return undefined;
  }
  const videoType = getVideoType(videoUrl);

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
            className="overflow-hidden relative w-full max-w-4xl rounded-lg border shadow-xl bg-surface/90 border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-black">
              <video
                className="absolute inset-0 w-full h-full"
                controls
                controlsList="nodownload"
                autoPlay={false}
                playsInline
                muted
                preload="metadata"
                title={t.projects.video || "Project Video"}
              >
                <source src={videoUrl} type={videoType || 'video/mp4'} />
                {t.projects.videoNotSupported}
              </video>
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
}

export const CodeNotAvailablePopup: React.FC<CodeNotAvailablePopupProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <PopupBase isOpen={isOpen} onClose={onClose} title={t.projects.codeNotAvailable}>
      <div className="text-center">
        <p className="mb-6 text-text-secondary">
           {t.projects.error}
        </p>
        <button
          className="px-5 py-2.5 font-medium rounded-lg border transition-colors duration-200 text-white bg-accent border-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
          onClick={onClose}
        >
          {t.projects.closeButton}
        </button>
      </div>
    </PopupBase>
  );
};

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText?: string;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({ isOpen, onClose, imageUrl, altText }) => {
  const { t } = useLanguage();

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
            className="overflow-hidden relative p-2 max-w-3xl max-h-[85vh] rounded-lg border shadow-xl bg-surface/90 border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={imageUrl}
              alt={altText || t.projects.imagePreview}
              className="block object-contain w-auto h-auto max-w-full max-h-[calc(85vh-1rem)]"
              quality={95}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DescriptionPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}> = ({ isOpen, onClose, title, description }) => {
  const { t } = useLanguage();
  return (
    <PopupBase isOpen={isOpen} onClose={onClose} title={t.projects.projectDetails}>
      <div className="text-left max-w-md -mt-4">
        <h3 className="text-2xl font-bold text-text-primary mb-4">{title}</h3>
        <p className="text-text-secondary whitespace-pre-wrap text-base leading-relaxed">
          {description}
        </p>
      </div>
    </PopupBase>
  );
};