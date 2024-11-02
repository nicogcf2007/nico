interface Translations {
    nav: {
      home: string;
      projects: string;
      about: string;
      contact: string;
    };
    hero: {
      title: string;
      role: string;
    };
    projects: {
      title: string;
      projectName: string;
      description: string;
      demo: string;
      code: string;
    };
    about: {
      title: string;
      description: string;
      skills: string;
      experience: string;
      roles: string[];
    };
    contact: {
      title: string;
      name: string;
      email: string;
      message: string;
      send: string;
      findMe: string;
    };
    footer: {
      rights: string;
    };
  }
  
  interface LanguageTranslations {
    en: Translations;
    es: Translations;
  }
  
  const translations: LanguageTranslations = {
    en: {
      nav: {
        home: "Home",
        projects: "Projects",
        about: "About",
        contact: "Contact"
      },
      hero: {
        title: "Hello, I'm",
        role: "Full Stack Developer & UI/UX Designer"
      },
      projects: {
        title: "Featured Projects",
        projectName: "Project Name",
        description: "Brief project description. Technologies used and results achieved.",
        demo: "Demo",
        code: "Code"
      },
      about: {
        title: "About Me",
        description: "I'm a developer passionate about creating unique and functional digital experiences. With experience in full stack web development, I specialize in building robust and scalable applications.",
        skills: "Skills",
        experience: "Experience",
        roles: [
          "Senior Developer - Company X",
          "Tech Lead - Startup Y",
          "Freelance Developer"
        ]
      },
      contact: {
        title: "Contact",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        findMe: "You can also find me on:"
      },
      footer: {
        rights: "All rights reserved."
      }
    },
    es: {
      nav: {
        home: "Inicio",
        projects: "Proyectos",
        about: "Sobre Mí",
        contact: "Contacto"
      },
      hero: {
        title: "Hola, soy",
        role: "Desarrollador Full Stack & Diseñador UI/UX"
      },
      projects: {
        title: "Proyectos Destacados",
        projectName: "Nombre del Proyecto",
        description: "Descripción breve del proyecto. Tecnologías utilizadas y resultados obtenidos.",
        demo: "Demo",
        code: "Código"
      },
      about: {
        title: "Sobre Mí",
        description: "Soy un desarrollador apasionado por crear experiencias digitales únicas y funcionales. Con experiencia en desarrollo web full stack, me especializo en construir aplicaciones robustas y escalables.",
        skills: "Habilidades",
        experience: "Experiencia",
        roles: [
          "Desarrollador Senior - Empresa X",
          "Tech Lead - Startup Y",
          "Freelance Developer"
        ]
      },
      contact: {
        title: "Contacto",
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        send: "Enviar Mensaje",
        findMe: "También puedes encontrarme en:"
      },
      footer: {
        rights: "Todos los derechos reservados."
      }
    }
  };
  
export default translations;  