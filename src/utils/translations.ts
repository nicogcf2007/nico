// --- START OF FILE translations.ts ---

export interface ExperienceDetail {
  id: string; // Unique identifier for React keys
  title: string;
  company: string; // Keep company separate for potential styling
  duration?: string; // Optional duration
  summary: string;
  details: readonly string[];
  skills: readonly string[];
}

export interface Translations {
  nav: {
    projects: string;
    skills: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    role: string;
  };
  projects: {
    title: string;
    demo: string;
    code: string;
    video: string;
    codeNotAvailable: string;
    error: string;
    closeButton: string;
  };
  about: {
    title: string;
    description: string;
    skills: string;
    experience: string; // Keep for compatibility? Maybe remove if unused.
    experienceTitle: string;
    // roles: readonly string[]; // REMOVED - Replaced by experienceDetails
    skillCategories: {
      frontend: string;
      backend: string;
      databases: string;
      devops: string;
      softSkills: string;
    };
    softSkillsList: readonly string[];
    // NEW: Structured experience details
    experienceDetails: readonly ExperienceDetail[];
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  footer: {
    rights: string;
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
      about: "About",
      contact: "Contact"
    },
    hero: {
      title: "Hello, I'm",
      role: "Full Stack Developer"
    },
    projects: {
      title: "Featured Projects",
      demo: "Demo",
      code: "Code",
      video: "Video",
      codeNotAvailable: "Code Not Available",
      error: "This project is private or is under a confidentiality agreement.",
      closeButton: "Close"
    },
    about: {
      title: "About Me",
      description: "I'm a developer passionate about creating unique and functional digital experiences. With experience in full stack web development, I specialize in building robust and scalable applications.",
      skills: "My Skills",
      experience: "Experience",
      experienceTitle: "Experience Highlights",
      experienceDetails: [
        {
          id: "cnc",
          title: "Professional Internship",
          company: "Centro Nacional de Consultoría (CNC)",
          summary: "Completed a one-year professional internship, integrating into a multidisciplinary team of about 7 people. This experience was fundamental to consolidating my technical knowledge and applying it to real projects, while strengthening my collaboration and cross-functional communication skills.",
          details: [
            "Application Maintenance: Actively collaborated in the corrective and evolutionary maintenance of various existing web applications. This involved working with technologies like React.js, PHP, Python (Django, FastAPI), and PostgreSQL, interacting not only with other developers but also with designers and managers to understand requirements and deliver solutions. On several projects, up to 3 developers worked simultaneously on specific tasks, requiring effective coordination and constant communication within the larger team.",
            "Web Application Development: Participated in the development cycle of new web applications, from feature implementation to testing support. Had the opportunity to apply modern technologies and collaborate with different roles to bring ideas to life:",
            "Frontend: Contributed to interface development with React.js and Next.js, using Tailwind CSS and working from provided designs.",
            "Backend: Collaborated in creating APIs using FastAPI (Python) and Node.js, ensuring they met defined functional needs.",
            "Cloud: Became familiar with basic concepts of application deployment and management on AWS, supporting the team's tasks in this area.",
            "This internship allowed me not only to apply my technical skills in a professional environment but also to significantly develop my soft skills, such as teamwork, assertive communication with different roles (development, design, management), and joint problem-solving in a highly collaborative and multidisciplinary setting."
          ],
          skills: ["Tailwind CSS", "WebSockets", "AWS", "PHP", "Node.js", "Django REST framework", "Next.js", "TypeScript", "Python", "Git", "FastAPI", "PostgreSQL", "React.js"]
        },
        {
          id: "colcambios",
          title: "Full Stack Developer",
          company: "ColCambios",
          summary: "Working closely with another developer, I actively participated in the technological evolution of the company's currency exchange platform, acquiring and applying new technologies on the fly.",
          details: [
            "Initial Web Maintenance and Update: Collaborated on functional improvements, bug fixes, and updates to the existing website (HTML, CSS, JavaScript, PHP) to ensure its proper functioning.",
            "Comprehensive Modernization (Web Remodel): Significantly contributed, as part of a two-person team, to rebuilding the web platform. Participated in frontend component development using React.js, representing intensive practical learning and resulting in a noticeable improvement in the user interface. Collaborated on implementing backend services with Node.js and Express.js, handling business logic and connection to the MySQL database.",
            "Administrative Mobile Application Development: Participated alongside my colleague in developing an internal cross-platform mobile application using React Native. Through this project, I applied my mobile development knowledge to create a tool that allowed the administrative team to manage key operations more efficiently, connecting to an Express.js backend.",
            "This role was a key opportunity to learn and apply modern technologies like React.js, Node.js, and React Native in a real production environment, always working collaboratively."
          ],
          skills: ["MySQL", "WebSockets", "Express.js", "PHP", "Node.js", "TypeScript", "Assertive Communication", "Git", "Teamwork", "React Native", "React.js"]
        },
        {
          id: "freelance",
          title: "Freelance Developer",
          company: "Independent Projects",
          summary: "Developed various custom software solutions for clients, focusing on automation and document processing.",
          details: [
            "Created automation bots to streamline repetitive tasks and improve efficiency for clients.",
            "Developed applications for advanced PDF modification, including data extraction, merging, and form filling.",
            "Managed client communication, requirements gathering, and project delivery independently."
          ],
          skills: ["Python", "JavaScript", "Node.js", "PDF manipulation libraries", "Web Scraping", "API Integration", "Client Communication"]
        }
      ],
      skillCategories: {
        frontend: "Frontend",
        backend: "Backend",
        databases: "Databases",
        devops: "DevOps & Tools",
        softSkills: "Soft Skills" // Title for the category card
      },
      // NEW: English soft skills list
      softSkillsList: [
        "Teamwork",
        "Assertive Communication",
        "Analytical Skills",
        "Problem Solving",
        "Continuous Learning"
      ],
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  es: {
    nav: {
      projects: "Proyectos",
      skills: "Habilidades",
      about: "Sobre Mí",
      contact: "Contacto"
    },
    hero: {
      title: "Hola, soy",
      role: "Desarrollador Full Stack"
    },
    projects: {
      title: "Proyectos Destacados",
      demo: "Demo",
      code: "Código",
      video: "Video",
      codeNotAvailable: "Código No Disponible",
      error: "Este proyecto es privado o está bajo un acuerdo de confidencialidad.",
      closeButton: "Cerrar"
    },
    about: {
      title: "Sobre Mí",
      description: "Soy un desarrollador apasionado por crear experiencias digitales únicas y funcionales. Con experiencia en desarrollo web full stack, me especializo en construir aplicaciones robustas y escalables.",
      skills: "Mis Habilidades",
      experience: "Experiencia",
      experienceTitle: "Experiencia Destacada",
      experienceDetails: [
        {
          id: "cnc",
          title: "Prácticas Profesionales",
          company: "Centro Nacional de Consultoría (CNC)",
          summary: "Realicé mis prácticas profesionales durante un año, integrándome en un equipo de trabajo multidisciplinario de aproximadamente 7 personas. Esta experiencia fue fundamental para consolidar mis conocimientos técnicos y aplicarlos en proyectos reales, al mismo tiempo que fortalecía mis habilidades de colaboración y comunicación interfuncional.",
          details: [
            "Mantenimiento Aplicativos: Colaboré activamente en el mantenimiento correctivo y evolutivo de diversas aplicaciones web existentes. Esto implicó trabajar con tecnologías como React.js, PHP, Python (Django, FastAPI) y PostgreSQL, interactuando no solo con otros desarrolladores sino también con diseñadores y gestores para entender requerimientos y entregar soluciones. En varios proyectos, trabajamos simultáneamente hasta 3 desarrolladores en tareas específicas, requiriendo una coordinación eficaz y comunicación constante dentro del equipo más amplio.",
            "Desarrollo Aplicaciones Web: Participé en el ciclo de desarrollo de nuevas aplicaciones web, desde la implementación de funcionalidades hasta el apoyo en pruebas. Tuve la oportunidad de aplicar tecnologías modernas y colaborar con diferentes roles para llevar las ideas a la práctica:",
            "Frontend: Contribuí al desarrollo de interfaces con React.js y Next.js, utilizando Tailwind CSS y trabajando a partir de diseños proporcionados.",
            "Backend: Colaboré en la creación de APIs utilizando FastAPI (Python) y Node.js, asegurando que cumplieran con las necesidades funcionales definidas.",
            "Cloud: Me familiaricé con conceptos básicos de despliegue y gestión de aplicaciones en AWS, apoyando las tareas del equipo en esta área.",
            "Esta práctica me permitió no solo aplicar mis habilidades técnicas en un entorno profesional, sino también desarrollar significativamente mis habilidades blandas, como el trabajo en equipo, la comunicación asertiva con diferentes roles (desarrollo, diseño, gestión) y la resolución conjunta de problemas en un entorno altamente colaborativo y multidisciplinario."
          ],
          skills: ["Tailwind CSS", "WebSockets", "AWS", "PHP", "Node.js", "Django REST framework", "Next.js", "TypeScript", "Python", "Git", "FastAPI", "PostgreSQL", "React.js"]
        },
        {
          id: "colcambios",
          title: "Desarrollador Full Stack",
          company: "ColCambios",
          summary: "Trabajando en estrecha colaboración con otro desarrollador, participé activamente en la evolución tecnológica de la plataforma de intercambio de divisas de la compañía, adquiriendo y aplicando nuevas tecnologías sobre la marcha.",
          details: [
            "Mantenimiento y Actualización Web Inicial: Colaboramos en la realización de mejoras funcionales, corrección de errores y actualizaciones en el sitio web existente (HTML, CSS, JavaScript, PHP) para garantizar su correcto funcionamiento.",
            "Modernización Integral (Remodelación Web): Contribuí significativamente, como parte de un equipo de dos, a la reconstrucción de la plataforma web. Participé en el desarrollo de componentes frontend utilizando React.js, lo que representó un aprendizaje práctico intensivo y resultó en una mejora notable de la interfaz de usuario. Colaboré en la implementación de los servicios backend con Node.js y Express.js, manejando la lógica de negocio y la conexión con la base de datos MySQL.",
            "Desarrollo de Aplicación Móvil Administrativa: Participé junto a mi compañero en el desarrollo de una aplicación móvil multiplataforma interna utilizando React Native. A través de este proyecto, apliqué mis conocimientos en desarrollo móvil para crear una herramienta que permitió al equipo administrativo gestionar operaciones clave de forma más eficiente, conectándose a un backend en Express.js.",
            "Este rol fue una oportunidad clave para aprender y aplicar tecnologías modernas como React.js, Node.js y React Native en un entorno de producción real, trabajando siempre de forma colaborativa."
          ],
          skills: ["MySQL", "WebSockets", "Express.js", "PHP", "Node.js", "TypeScript", "Comunicación Asertiva", "Git", "Trabajo en equipo", "React Native", "React.js"]
        },
        {
          id: "freelance",
          title: "Desarrollador Freelance",
          company: "Proyectos Independientes",
          summary: "Desarrollé diversas soluciones de software personalizadas para clientes, centrándome en la automatización y el procesamiento de documentos.",
          details: [
            "Creé bots de automatización para agilizar tareas repetitivas y mejorar la eficiencia de los clientes.",
            "Desarrollé programas para la modificación avanzada de PDFs, incluyendo extracción de datos, fusión y llenado de formularios.",
            "Gestioné la comunicación con clientes, la recopilación de requisitos y la entrega de proyectos de forma independiente."
          ],
          skills: ["Python", "JavaScript", "Node.js", "Librerías de manipulación de PDF", "Web Scraping", "Integración de API", "Comunicación con Clientes"]
        }
      ],
      skillCategories: {
        frontend: "Frontend",
        backend: "Backend",
        databases: "Bases de Datos",
        devops: "DevOps y Herramientas",
        softSkills: "Habilidades Blandas" // Title for the category card
      },
      // NEW: Spanish soft skills list
      softSkillsList: [
        "Trabajo en equipo",
        "Comunicación Asertiva",
        "Capacidad de análisis",
        "Resolución de Problemas",
        "Aprendizaje Continuo"
      ],
    },
    contact: {
      title: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar Mensaje"
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  }
} as const;

export default translations;
// --- END OF FILE translations.ts ---