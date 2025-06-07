import colcambiosImage from '../projects/images/colcambios.png';
import transcriptionsImage from '../projects/images/transcriptions.png';
import rttImage from '../projects/images/rtt.png';
import ragImage from '../projects/images/rag.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  videoUrl?: string;
}

// Esta función devuelve los proyectos según el idioma seleccionado
export const getProjects = (language: 'es' | 'en'): Project[] => {
  return [
    {
      id: 1,
      title: language === 'es' ? 'ColCambios' : 'ColCambios',
      description: language === 'es' 
        ? 'Remodelación completa del frontend y backend de una plataforma de intercambio de divisas. Trabajé en colaboración con otro desarrollador para modernizar la interfaz y mejorar la funcionalidad del sistema.' 
        : 'Complete redesign of the frontend and backend for a currency exchange platform. I worked collaboratively with another developer to modernize the interface and improve the system functionality.',
      image: colcambiosImage,
      technologies: ['React.js', 'Node.js', 'MySQL', 'Express.js','TypeScript'],
      demoUrl: 'https://colcambios.com/',
    },
    {
      id: 2,
      title: language === 'es' ? 'Transcripciones CNC' : 'Transcriptions CNC',
      description: language === 'es' 
        ? 'Desarrollo del frontend para una plataforma de transcripciones. Mantuve comunicación constante con el equipo de backend para asegurar una integración fluida entre ambas partes del sistema.' 
        : 'Frontend development for a transcription platform. I maintained constant communication with the backend team to ensure seamless integration between both parts of the system.',
      image: transcriptionsImage,
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
      id: 3,
      title: language === 'es' ? 'Rag CNC' : 'Rag CNC',
      description: language === 'es' 
        ? 'Desarrollo completo (frontend y backend) de una aplicación tipo ChatGPT para realizar RAG (Retrieval Augmented Generation). Diseñé e implementé toda la arquitectura del sistema de forma independiente.' 
        : 'Full-stack development (frontend and backend) of a ChatGPT-like application for RAG (Retrieval Augmented Generation). I designed and implemented the entire system architecture independently.',
      technologies: ['React.js', 'FastAPI', 'TypeScript', 'Tailwind CSS'],
      image: ragImage,
      codeUrl: 'https://github.com/nicogcf2007/rag-ws'
    },
    {
      id: 4,
      title: language === 'es' ? 'RTT CNC' : 'RTT CNC',
      description: language === 'es' 
        ? 'Desarrollo completo de una aplicación web para transcripciones en tiempo real. Al finalizar la transcripción, el sistema genera reportes en diferentes formatos (Excel, PDF o Word) según las preferencias del usuario.' 
        : 'Full-stack development of a web application for real-time transcriptions. Upon completion, the system generates reports in different formats (Excel, PDF, or Word) according to user preferences.',
      image: rttImage,
      technologies: ['React.js (Vite)', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'WebSockets'],
      videoUrl: '/videos/rtt.mp4',
      codeUrl: 'https://github.com/nicogcf2007/rtm-transcriptions'
    },
  ];
};