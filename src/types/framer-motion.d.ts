declare module 'framer-motion' {
  import * as React from 'react';
  
  export type Variants = {
    [key: string]: any;
  };
  
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    mode?: 'wait' | 'sync' | 'popLayout';
  }
  
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: Variants;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    children?: React.ReactNode;
  }
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    h1: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    h2: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    h3: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    p: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
    a: React.ForwardRefExoticComponent<MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
    section: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
    [key: string]: any;
  };
} 