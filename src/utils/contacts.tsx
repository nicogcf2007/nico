import { Github, Linkedin, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

interface WhatsappIconProps extends IconBaseProps {}

const WhatsappIcon = (props: WhatsappIconProps): JSX.Element => {
  const IconComponent = FaWhatsapp as any; // Forzar tipo
  return <IconComponent {...props} />;
};

const socialLinks: [string, JSX.Element, string][] = [
  [
    'https://github.com/nicogcf2007',
    <Github size={24} />,
    'hover:text-purple-500'
  ],
  [
    'https://www.linkedin.com/in/nicogcf2007/',
    <Linkedin size={24} />,
    'hover:text-[#0A66C2]'
  ],
  [
    'mailto:nicogcf2007@gmail.com',
    <Mail size={24} />,
    'hover:text-red-600'
  ],
  [
    'https://wa.me/+573165054616',
    <WhatsappIcon size={24} />,
    'hover:text-[#25D366]'
  ]
];

export default socialLinks;