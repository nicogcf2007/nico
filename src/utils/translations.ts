export interface ExperienceDetail {
  role: string;
  company: string;
  date: string;
  responsibilities: readonly string[];
}

export interface Translations {
  nav: {
    projects: string;
    skills: string;
    about: string;
    contact: string;
    resume: string;
    switchToEnglish: string;
    switchToSpanish: string;
  };
  hero: {
    title: string;
    role: string;
    viewProjects: string;
    downloadCV: string;
    contactMe: string;
    scrollDown: string;
  };
  projects: {
    title: string;
    demo: string;
    code: string;
    video: string;
    codeNotAvailable: string;
    error: string;
    closeButton: string;
    imagePreview: string;
    clickToEnlarge: string;
    videoNotSupported: string;
    scrollToExplore: string;
    readMore: string;
    projectDetails: string;
  };
  about: {
    title: string;
    description: string;
    skillsTitle: string;
    experienceTitle: string;
    skillCategories: {
      webFrontend: string;
      appDevelopment: string; // Renombrada desde mobileDevelopment
      backend: string;
      databases: string;
      devopsPlatforms: string;
      softSkills: string;
    };
    softSkillsList: readonly string[];
    experienceDetails: readonly ExperienceDetail[];
    imagePreview: string;
    clickToEnlarge: string;
    videoNotSupported: string;
    scrollToExplore: string;
    readMore: string;
    projectDetails: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    description: string;
    whatsappMessage: string;
    whatsappButton: string;
    emailDescription: string;
  };
  footer: {
    rights: string;
    madeWith: {
      text1: string;
      text2: string;
      text3: string;
    };
    builtWith: string;
    technologies: string;
    author: string;
    backToTop: string;
  };
  common: {
    backToTop: string;
  };
}

export interface LanguageTranslations {
  en: Translations;
  es: Translations;
}

const translations: LanguageTranslations = {
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      about: "About Me",
      contact: "Contact",
      resume: "Resume",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Cambiar a Español"
    },
    hero: {
      title: "Hello, I'm",
      role: "Full Stack Developer",
      viewProjects: "View Projects",
      downloadCV: "Download CV",
      contactMe: "Contact Me",
      scrollDown: "Start scrolling"
    },
    projects: {
      title: "Featured Projects",
      demo: "Demo",
      code: "Code",
      video: "Video",
      codeNotAvailable: "Code Not Available",
      error: "This project is private or is under a confidentiality agreement.",
      closeButton: "Close",
      imagePreview: "Project Preview",
      clickToEnlarge: "Click to enlarge image",
      videoNotSupported: "Your browser does not support the video tag.",
      scrollToExplore: "Scroll to explore",
      readMore: "Read More",
      projectDetails: "Project Details"
    },
    about: {
      title: "About Me",
      description: "I'm a developer passionate about creating unique and functional digital experiences. With experience in full stack web development, I specialize in building robust and scalable applications.",
      skillsTitle: "My Skills",
      experienceTitle: "Professional Experience",
      experienceDetails: [
        {
          role: "Professional Internship",
          company: "Centro Nacional de Consultoría (CNC)",
          date: "Apr 2024 - May 2025",
          responsibilities: [
            "Contributed to the maintenance and development of web applications using React.js, PHP, and Python (Django, FastAPI).",
            "Worked in a multidisciplinary team, collaborating with designers and managers to deliver effective solutions.",
            "Participated in the full development cycle, from feature implementation to testing support.",
            "Gained experience with AWS for application deployment and management."
          ]
        },
        {
          role: "Freelance Developer",
          company: "Independent Projects",
          date: "Jan 2024 - Present",
          responsibilities: [
            "Created automation bots and scripts to streamline repetitive tasks for various clients.",
            "Developed custom applications for advanced PDF manipulation and data extraction.",
            "Managed client communication, requirement gathering, and project delivery from start to finish."
          ]
        },
        {
          role: "Full Stack Developer",
          company: "ColCambios",
          date: "Oct 2022 - Nov 2023",
          responsibilities: [
            "Modernized the company's currency exchange platform, migrating from a legacy system to a React.js and Node.js stack.",
            "Developed a cross-platform mobile application with React Native for internal administrative management.",
            "Handled both frontend (React.js) and backend (Node.js, Express.js) tasks in a two-person team."
          ]
        }
      ],
      skillCategories: {
        webFrontend: "Web Frontend",
        appDevelopment: "Applications Development",
        backend: "Backend",
        databases: "Databases & BaaS",
        devopsPlatforms: "DevOps & Platforms",
        softSkills: "Soft Skills"
      },
      softSkillsList: [
        "Teamwork",
        "Assertive Communication",
        "Analytical Skills",
        "Problem Solving",
        "Continuous Learning"
      ],
      imagePreview: "Project Preview",
      clickToEnlarge: "Click to enlarge image",
      videoNotSupported: "Your browser does not support the video tag.",
      scrollToExplore: "Scroll to explore",
      readMore: "Read More",
      projectDetails: "Project Details"
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      namePlaceholder: "Your Name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
      description: "Have a project in mind? Let's talk!",
      whatsappMessage: "Hello! I'm interested in contacting you for a project.",
      whatsappButton: "Contact via WhatsApp",
      emailDescription: "Or write me directly at:"
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: {
        text1: "Made with",
        text2: "by",
        text3: "and"
      },
      builtWith: "Built with",
      technologies: "Next.js, TypeScript, Three.js, Tailwind CSS, Lenis & GSAP",
      author: "Nicolas Rivera",
      backToTop: "Back to Top"
    },
    common: {
      backToTop: "Back to Top"
    }
  },
  es: {
    nav: {
      projects: "Proyectos",
      skills: "Habilidades",
      about: "Sobre Mí",
      contact: "Contacto",
      resume: "Currículum",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Cambiar a Español"
    },
    hero: {
      title: "Hola, soy",
      role: "Desarrollador Full Stack",
      viewProjects: "Ver Proyectos",
      downloadCV: "Descargar CV",
      contactMe: "Contáctame",
      scrollDown: "Empieza a deslizar"
    },
    projects: {
      title: "Proyectos Destacados",
      demo: "Demo",
      code: "Código",
      video: "Video",
      codeNotAvailable: "Código No Disponible",
      error: "Este proyecto es privado o está bajo un acuerdo de confidencialidad.",
      closeButton: "Cerrar",
      imagePreview: "Vista Previa del Proyecto",
      clickToEnlarge: "Click para ampliar imagen",
      videoNotSupported: "Tu navegador no soporta la etiqueta de video.",
      scrollToExplore: "Scroll para explorar",
      readMore: "Leer Más",
      projectDetails: "Detalles del Proyecto"
    },
    about: {
      title: "Sobre Mí",
      description: "Soy un desarrollador apasionado por crear experiencias digitales únicas y funcionales. Con experiencia en desarrollo web full stack, me especializo en construir aplicaciones robustas y escalables.",
      skillsTitle: "Mis Habilidades",
      experienceTitle: "Experiencia Profesional",
      experienceDetails: [
        {
          role: "Prácticas Profesionales",
          company: "Centro Nacional de Consultoría (CNC)",
          date: "Abr 2024 - May 2025",
          responsibilities: [
            "Contribuí al mantenimiento y desarrollo de aplicaciones web usando React.js, PHP y Python (Django, FastAPI).",
            "Trabajé en un equipo multidisciplinar, colaborando con diseñadores y gerentes para entregar soluciones efectivas.",
            "Participé en el ciclo completo de desarrollo, desde la implementación de funcionalidades hasta el soporte en pruebas.",
            "Gané experiencia con AWS para el despliegue y gestión de aplicaciones."
          ]
        },
        {
          role: "Desarrollador Freelance",
          company: "Proyectos Independientes",
          date: "Ene 2024 - Presente",
          responsibilities: [
            "Creación de bots y scripts de automatización para optimizar tareas repetitivas de diversos clientes.",
            "Desarrollo de aplicaciones a medida para la manipulación avanzada de PDFs y extracción de datos.",
            "Gestión de la comunicación con clientes, levantamiento de requisitos y entrega de proyectos de principio a fin."
          ]
        },
        {
          role: "Desarrollador Full Stack",
          company: "ColCambios",
          date: "Oct 2022 - Nov 2023",
          responsibilities: [
            "Modernicé la plataforma de cambio de divisas de la empresa, migrando de un sistema legado a un stack con React.js y Node.js.",
            "Desarrollé una aplicación móvil multiplataforma con React Native para la gestión administrativa interna.",
            "Manejé tareas tanto de frontend (React.js) como de backend (Node.js, Express.js) en un equipo de dos personas."
          ]
        }
      ],
      skillCategories: {
        webFrontend: "Frontend Web",
        appDevelopment: "Desarrollo de Aplicaciones",
        backend: "Backend",
        databases: "Bases de Datos y BaaS",
        devopsPlatforms: "DevOps y Plataformas",
        softSkills: "Habilidades Blandas"
      },
      softSkillsList: [
        "Trabajo en Equipo",
        "Comunicación Asertiva",
        "Pensamiento Analítico",
        "Resolución de Problemas",
        "Aprendizaje Continuo"
      ],
      imagePreview: "Vista Previa del Proyecto",
      clickToEnlarge: "Click para ampliar imagen",
      videoNotSupported: "Tu navegador no soporta la etiqueta de video.",
      scrollToExplore: "Scroll para explorar",
      readMore: "Leer Más",
      projectDetails: "Detalles del Proyecto"
    },
    contact: {
      title: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar Mensaje",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Tu mensaje...",
      description: "¿Tienes un proyecto en mente? ¡Conversemos!",
      whatsappMessage: "¡Hola! Me interesa contactarte para un proyecto.",
      whatsappButton: "Contactar por WhatsApp",
      emailDescription: "O escríbeme directamente a:"
    },
    footer: {
      rights: "Todos los derechos reservados.",
      madeWith: {
        text1: "Hecho con",
        text2: "por",
        text3: "y"
      },
      builtWith: "Desarrollado con",
      technologies: "Next.js, TypeScript, Three.js, Tailwind CSS, Lenis y GSAP",
      author: "Nicolas Rivera",
      backToTop: "Volver al Inicio"
    },
    common: {
      backToTop: "Volver al Inicio"
    }
  }
} as const;

export default translations;