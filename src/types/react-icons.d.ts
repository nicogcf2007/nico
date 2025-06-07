declare module 'react-icons/fa' {
  import * as React from 'react';
  
  export interface IconProps {
    size?: string | number;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
  }
  
  export const FaWhatsapp: React.FC<IconProps>;
  export const FaGithub: React.FC<IconProps>;
  export const FaLinkedin: React.FC<IconProps>;
  export const FaEnvelope: React.FC<IconProps>;
  export const FaExternalLinkAlt: React.FC<IconProps>;
}

declare module 'react-icons/*' {
  import * as React from 'react';
  
  export interface IconProps {
    size?: string | number;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
  }
  
  const Icon: React.FC<IconProps>;
  export default Icon;
} 