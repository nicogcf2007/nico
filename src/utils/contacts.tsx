import {
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

const socialLinks: [string, JSX.Element][] = [
    ['https://github.com', <Github size={24} />],
    ['https://linkedin.com', <Linkedin size={24} />],
    ['mailto:nicogcf2007@gmail.com', <Mail size={24} />]
  ];

export default socialLinks