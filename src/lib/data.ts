import type { Project, Experience, Skill, Service, Testimonial, NavItem } from "@/types";

// ─── Education type ────────────────────────────────────────────────────────────
export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// ─── Personal Info ────────────────────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Juan Camilo Mendoza",
  nickname: "Mendoza727",
  title: "Full-Stack Developer · AI & Automation",
  tagline: "Architecting digital experiences that push the boundaries of the web.",
  bio: "Full-Stack Developer with experience in scalable web and mobile applications using multiple programming languages. Specialized in AI integration and automation of documents and processes.",
  location: "Colombia",
  availability: "Available for freelance",
  yearsOfExperience: 4,
  phone: "(301) 479-8364",
  email: "juancamilomendozavillegas14@gmail.com",
};

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: "https://github.com/Mendoza727",
  linkedin: "https://linkedin.com/in/mendoza727",
  twitter: "https://twitter.com/mendoza727",
  email: "juancamilomendozavillegas14@gmail.com",
  phone: "+573014798364",
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "Angular", level: 80, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Next.js", level: 92, category: "frontend" },
  { name: "TailwindCSS", level: 90, category: "frontend" },
  { name: "GSAP / Three.js", level: 80, category: "frontend" },
  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Django", level: 78, category: "backend" },
  { name: "PHP / Laravel", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "MongoDB", level: 78, category: "backend" },
  { name: "MySQL", level: 82, category: "backend" },
  // Mobile
  { name: "Flutter", level: 82, category: "mobile" },
  { name: "React Native", level: 80, category: "mobile" },
  { name: "Ionic", level: 72, category: "mobile" },
  // DevOps
  { name: "Docker", level: 80, category: "devops" },
  { name: "AWS / GCP", level: 75, category: "devops" },
  { name: "Kubernetes", level: 65, category: "devops" },
  { name: "GitHub Actions", level: 78, category: "devops" },
  // AI
  { name: "Gemini / Claude / GPT", level: 85, category: "ai" },
  { name: "n8n Automation", level: 80, category: "ai" },
  { name: "Hugging Face", level: 70, category: "ai" },
  // Tools
  { name: "Git / Linux", level: 95, category: "tools" },
  { name: "Figma", level: 72, category: "tools" },
  { name: "GraphQL / REST", level: 85, category: "tools" },
  { name: "Twilio", level: 75, category: "tools" },
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "Aula Matriz",
    role: "Application Developer",
    period: "Jan 2025 — Feb 2026",
    startDate: "2025-01-01",
    endDate: "2026-02-01",
    description:
      "Developed web and mobile applications with Django, PHP and Flutter for the education sector and SMBs. Implemented custom CMS and automated academic reporting with AI tools.",
    achievements: [
      "Implemented CMS that allowed non-technical users to self-manage content",
      "Automated academic reports and documents, reducing administrative workload",
      "Led technical deliveries in SCRUM ensuring sprint compliance",
      "Implemented AI for automatic performance matrix generation",
    ],
    technologies: ["Django", "PHP", "Flutter", "MySQL", "Scrum", "AI/LLMs"],
  },
  {
    id: "2",
    company: "T&T Interactiva",
    role: "Web Developer",
    period: "Apr 2024 — Dec 2024",
    startDate: "2024-04-01",
    endDate: "2024-12-01",
    description:
      "Reduced unnecessary API calls by 35% via backend optimization and caching. Built full-stack streaming system supporting ~600 concurrent users and immersive experiences for aviation sector.",
    achievements: [
      "Reduced API calls by 35% via backend optimization and caching",
      "Improved platform load times by 45%",
      "Implemented full-stack streaming supporting ~600 concurrent users",
      "Developed voice-based interactive web experience for aviation sector",
      "Built immersive experiences with Apple Vision SDK, SwiftUI and Objective-C",
    ],
    technologies: ["React", "Node.js", "SwiftUI", "Apple Vision", "WebSockets", "Redis"],
  },
  {
    id: "3",
    company: "Suncolombia",
    role: "Software Development Auxiliary",
    period: "May 2023 — Mar 2024",
    startDate: "2023-05-01",
    endDate: "2024-03-01",
    description:
      "Optimized mobile performance reducing resource consumption by 25%. Automated internal processes reducing execution times from hours to minutes and published apps on iOS.",
    achievements: [
      "Reduced mobile resource consumption by 25%",
      "Automated internal processes reducing execution times from hours to minutes",
      "Participated in cloud deployments with AWS and Docker",
      "Published applications on iOS using Apple Developer SDK",
    ],
    technologies: ["React Native", "AWS", "Docker", "Node.js", "iOS SDK"],
  },
  {
    id: "4",
    company: "Asiste Ingeniería S.A.S",
    role: "Junior Developer",
    period: "Dec 2022 — Jan 2023",
    startDate: "2022-12-01",
    endDate: "2023-01-01",
    description:
      "Reduced load times by 30% through SQL query refactoring. Developed modules with React + Node.js integrated with MySQL and integrated REST APIs.",
    achievements: [
      "Reduced load times by 30% through SQL query refactoring",
      "Developed modules with React + Node.js integrated with MySQL",
      "Integrated REST APIs and resolved production incidents",
    ],
    technologies: ["React", "Node.js", "MySQL", "REST APIs"],
  },
  {
    id: "5",
    company: "Servimax Y Cia",
    role: "Developer Intern",
    period: "Jan 2022 — Jun 2022",
    startDate: "2022-01-01",
    endDate: "2022-06-01",
    description:
      "Reduced frontend visual errors by 60% and automated reports with Node.js. Published apps on App Store and Google Play. Integrated real-time communications with Twilio.",
    achievements: [
      "Reduced frontend visual errors by 60%",
      "Automated reports with Node.js",
      "Published apps on both App Store and Google Play",
      "Integrated real-time communications with Twilio",
    ],
    technologies: ["Node.js", "Twilio", "iOS", "Android", "React"],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION: Education[] = [
  {
    id: "1",
    institution: "Fundación Universitaria del Area Andina",
    degree: "Systems Engineering",
    period: "Feb 2025 — Present",
    startDate: "2025-02-01",
    current: true,
  },
  {
    id: "2",
    institution: "SENA — Servicio Nacional de Aprendizaje",
    degree: "Software Programming Technician",
    period: "Dec 2021 — Jun 2022",
    startDate: "2021-12-01",
    endDate: "2022-06-01",
  },
  {
    id: "3",
    institution: "Institución Educativa Nicolás Gómez Dávila",
    degree: "Academic High School Diploma",
    period: "Jan 2013 — Dec 2021",
    startDate: "2013-01-01",
    endDate: "2021-12-01",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "WhatsApp AI Chatbot Platform",
    description:
      "Multi-tenant WhatsApp chatbot with n8n flows, voice & image understanding, and GPT-based NLP.",
    longDescription:
      "A production-grade platform enabling businesses to deploy AI-powered WhatsApp chatbots. Features voice message transcription, image analysis, human handoff, and conversation history.",
    tags: ["AI", "Automation", "Chat"],
    techStack: ["Node.js", "n8n", "OpenAI", "WhatsApp Cloud API", "PostgreSQL", "Redis"],
    repoUrl: "https://github.com/Mendoza727",
    featured: true,
    year: 2025,
  },
  {
    id: "2",
    title: "Full-Stack Streaming Platform",
    description:
      "Streaming system supporting ~600 concurrent users with real-time chat and adaptive quality.",
    longDescription:
      "Built at T&T Interactiva. Supports ~600 concurrent users with WebSockets, reduced API calls by 35% and improved load times by 45%.",
    tags: ["Streaming", "WebSockets", "Performance"],
    techStack: ["React", "Node.js", "WebSockets", "Redis", "AWS"],
    repoUrl: "https://github.com/Mendoza727",
    featured: true,
    year: 2024,
  },
  {
    id: "3",
    title: "Interactive Developer Portfolio",
    description:
      "High-performance 2026 portfolio with Three.js, GSAP, Lenis smooth scrolling, and immersive scroll-driven animations.",
    longDescription:
      "The very project you are viewing. Architected for Lighthouse >90 while delivering WebGL 3D scenes, storytelling scroll animations, and 60fps micro-interactions.",
    tags: ["Web Dev", "3D", "Animation"],
    techStack: ["Next.js 15", "Three.js", "GSAP", "Framer Motion", "TailwindCSS"],
    liveUrl: "#",
    repoUrl: "https://github.com/Mendoza727",
    featured: true,
    year: 2026,
  },
  {
    id: "4",
    title: "Aviation Voice Web Experience",
    description:
      "Voice-based interactive web experience for the aeronautical sector with real-time speech recognition.",
    tags: ["Voice UI", "Interactive", "Aviation"],
    techStack: ["React", "Web Speech API", "Node.js", "WebSockets"],
    repoUrl: "https://github.com/Mendoza727",
    featured: false,
    year: 2024,
  },
  {
    id: "5",
    title: "Academic CMS Platform",
    description:
      "Custom CMS for educational institutions allowing non-technical users to manage content and generate automated AI performance reports.",
    tags: ["CMS", "Education", "AI"],
    techStack: ["Django", "PHP", "Flutter", "MySQL", "LLMs"],
    repoUrl: "https://github.com/Mendoza727",
    featured: false,
    year: 2025,
  },
  {
    id: "6",
    title: "Cross-Platform Mobile App",
    description:
      "Published on both App Store and Google Play with real-time Twilio communications and reduced performance footprint by 25%.",
    tags: ["Mobile", "iOS", "Android"],
    techStack: ["React Native", "Twilio", "Node.js", "iOS SDK"],
    repoUrl: "https://github.com/Mendoza727",
    featured: false,
    year: 2023,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Web Application Development",
    description:
      "Scalable, high-performance full-stack applications built with modern frameworks and best practices.",
    features: [
      "React / Angular / Next.js frontends",
      "Node.js / Django / PHP backends",
      "Database design & optimization",
      "Authentication & authorization",
    ],
    icon: "Globe",
  },
  {
    id: "2",
    title: "AI Integration & Automation",
    description:
      "Embedding cutting-edge AI into your products — from chatbots to intelligent automation workflows.",
    features: [
      "LLM-powered chatbots (GPT, Gemini, Claude)",
      "n8n automation workflows",
      "Voice & image processing",
      "AI document generation",
    ],
    icon: "Brain",
  },
  {
    id: "3",
    title: "Interactive Experiences",
    description:
      "Immersive web experiences with 3D graphics, smooth animations, and storytelling-driven design.",
    features: [
      "Three.js / WebGL 3D scenes",
      "GSAP & Framer Motion animations",
      "Scroll-driven storytelling",
      "60fps performance optimization",
    ],
    icon: "Sparkles",
  },
  {
    id: "4",
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications that feel native on iOS and Android, published to the stores.",
    features: [
      "Flutter / React Native / Ionic",
      "App Store & Google Play deployment",
      "Real-time communications",
      "Offline-first architecture",
    ],
    icon: "Smartphone",
  },
  {
    id: "5",
    title: "DevOps & Cloud",
    description:
      "Streamlined CI/CD pipelines, containerized deployments, and production-ready cloud infrastructure.",
    features: [
      "Docker & Kubernetes",
      "AWS / GCP deployments",
      "CI/CD with GitHub Actions",
      "Performance monitoring",
    ],
    icon: "Server",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Méndez",
    role: "CEO",
    company: "StartupMX",
    text: "Juan transformed our idea into a polished product faster than I thought possible. His attention to performance and detail is exceptional.",
  },
  {
    id: "2",
    name: "Valentina Ríos",
    role: "Product Manager",
    company: "DigitalCo",
    text: "The interactive platform he built for us blew our metrics. The animations feel absolutely premium.",
  },
  {
    id: "3",
    name: "Rodrigo Castillo",
    role: "CTO",
    company: "TechAgency",
    text: "Juan's AI chatbot integration saved our support team 30+ hours per week. Brilliant architecture and clean code throughout.",
  },
];
