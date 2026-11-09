// Content comes from Ivan's folder (Acuesta/PORTFOLIO): "SERVICES SKILLS CONTACT.docx",
// his certificates, his project screenshots, and the reference design he picked.
//
// Not in his files, so inferred or confirmed with the user (2026-11-05):
// - Role "UI/UX Designer & Developer" was chosen by the user.
// - School and course come from his thesis-preparation certificate (Biliran Province
//   State University, Computer Science Society).
// - Project descriptions are written from what the screenshots show.
// - Project tools, Facebook and LinkedIn links were given by the user (2026-11-09).
// - Figma was removed from skills at Ivan's request (not confident with it yet).

export const profile = {
  name: "John Ivan Acuesta",
  fullName: "John Ivan Acuesta",
  // As printed on his certificates; used only where a certificate is described.
  legalName: "John Ivan Ruel Acuesta",
  first: "Ivan",
  last: "Acuesta",
  role: "UI/UX Designer & Developer",
  degree: "BS Computer Science",
  degreeLong: "Bachelor of Science in Computer Science",
  school: "Biliran Province State University",
  email: "ivan.acuesta0519@gmail.com",
  facebook: "Ivan Acuesta",
  facebookUrl: "https://www.facebook.com/excusemeivan",
  linkedinUrl: "https://www.linkedin.com/in/john-ivan-ruel-acuesta-3a466736b",
  linkedinLabel: "linkedin.com/in/john-ivan-ruel-acuesta-3a466736b",
  photo: "/profile.jpg",
  // Same portrait with the backdrop removed (transparent PNG), used in the hero.
  cutout: "/profile-cutout.png",
  resumePdf: "/resume/John-Ivan-Acuesta-Resume.pdf",
};

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
] as const;

export type Service = {
  key: "design" | "planning" | "ai" | "docs";
  title: string;
  text: string;
  items: string[];
};

export const services: Service[] = [
  {
    key: "design",
    title: "UI/UX Design and Prototyping",
    text: "Turning ideas into clean, user-friendly designs through thoughtful layouts and interactive prototypes.",
    items: [
      "Website and mobile app interfaces",
      "Wireframes and interactive prototypes",
      "Responsive layouts for different screens",
      "User-centered design and navigation",
    ],
  },
  {
    key: "planning",
    title: "System Planning and Analysis",
    text: "Helping transform real-world problems into well-organized system concepts and practical digital solutions.",
    items: [
      "System requirements and feature planning",
      "Use case and workflow diagrams",
      "Database structure and planning",
      "System architecture and documentation",
    ],
  },
  {
    key: "ai",
    title: "AI and Machine Learning",
    text: "Exploring AI and machine learning to create smarter applications that can process information and assist users.",
    items: [
      "Text classification and prediction",
      "Image recognition applications",
      "Natural language processing",
      "Model training and evaluation",
    ],
  },
  {
    key: "docs",
    title: "Technical Documentation and Research",
    text: "Preparing organized technical documents and research materials that communicate ideas, processes, and system functionality.",
    items: [
      "Research and thesis documentation",
      "Software testing and evaluation",
      "Technical reports and presentations",
      "System manuals and user guides",
    ],
  },
];

export type Shot = { src: string; full: string; alt: string; width: number; height: number };

export type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  points: string[];
  /** Tools it was built with, shown as logos (names must match keys in logos.ts or tool-logos.tsx). */
  tools: string[];
  laptop: Shot;
  phone?: Shot;
};

export const projects: Project[] = [
  {
    id: "ziren",
    name: "Ziren",
    category: "Emergency response · Web + Mobile",
    tagline: "Emergency response for Biliran.",
    summary:
      "Residents report an emergency from their phone in a few taps, and responders see it on a dashboard with the route from the nearest station. An AI model reads each report and suggests its type and severity, and a responder always confirms it before dispatch.",
    points: [
      "Mobile app: report fire, medical, accident, crime or calamity, with Ziren, an assistant that helps",
      "Responder dashboard: severity, map route, distance and estimated response time",
      "AI suggestion with its confidence, kept advisory until a responder validates it",
    ],
    tools: ["Next.js", "FastAPI", "Flutter", "Supabase"],
    laptop: {
      src: "/projects/ziren-dashboard-screen.jpg",
      full: "/projects/ziren-dashboard-full.jpg",
      alt: "Ziren responder dashboard showing a high-severity fire report, the AI model's classification, and a map route from the nearest fire station.",
      width: 2878,
      height: 1354,
    },
    phone: {
      src: "/projects/ziren-mobile.jpg",
      full: "/projects/ziren-mobile.jpg",
      alt: "Ziren mobile app home with the Ziren assistant, a Report an Emergency button, and incident types: fire, medical, accident, crime, calamity.",
      width: 1080,
      height: 2400,
    },
  },
  {
    id: "unifind",
    name: "UniFind",
    category: "Lost and found · Web app",
    tagline: "A campus lost-and-found.",
    summary:
      "A web app that helps people on campus get lost things back. Anyone can report a lost or found item, browse recent items, and message the person who posted it.",
    points: [
      "Report lost and report found, with item photos, category and location",
      "Browse and search recent items, with priority labels",
      "Built-in messages and notifications",
    ],
    tools: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    laptop: {
      src: "/projects/unifind-screen.jpg",
      full: "/projects/unifind-full.jpg",
      alt: "UniFind home page with a sidebar menu, a search bar, and a recent lost item card for a black wallet.",
      width: 3764,
      height: 1804,
    },
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    text: "Languages I use to work with code.",
    items: ["Python", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frameworks and Technologies",
    text: "Tools I use to build applications and interfaces.",
    items: ["Django", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "AI and Data",
    text: "Technologies I use for data processing and intelligent applications.",
    items: ["Machine Learning", "Natural Language Processing (NLP)", "TF-IDF", "Logistic Regression"],
  },
  {
    title: "Design and Development Tools",
    text: "Tools I use to design, organize, test, and manage projects.",
    items: [
      "Canva",
      "Jupyter Notebook",
      "Visual Studio Code",
      "Git",
      "GitHub",
      "Microsoft Office",
      "Google Workspace",
    ],
  },
] as const;

export const toolCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

export type Certificate = {
  key: string;
  title: string;
  issuer: string;
  kind: string;
  date: string;
  dateTime: string;
  image: string;
  pdf?: string;
  width: number;
  height: number;
};

// Newest first.
export const certificates: Certificate[] = [
  {
    key: "ai-literacy",
    title: "Introduction to AI Literacy and Responsible Use",
    issuer: "CHED ACHIEVE · Mapúa University",
    kind: "Micro-credential",
    date: "Sep 2026",
    dateTime: "2026-09-14",
    image: "/certificates/ai-literacy.jpg",
    width: 1570,
    height: 1106,
  },
  {
    key: "cisco",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    kind: "Course completion",
    date: "May 2026",
    dateTime: "2026-05-24",
    image: "/certificates/cisco-networking-basics.jpg",
    pdf: "/certificates/cisco-networking-basics.pdf",
    width: 3200,
    height: 2168,
  },
  {
    key: "thesis",
    title: "Thesis Preparation with the Use of Trending Tools and Industry Practices",
    issuer: "Biliran Province State University · Computer Science Society",
    kind: "Seminar-workshop",
    date: "Oct 2025",
    dateTime: "2025-10-06",
    image: "/certificates/thesis-preparation.jpg",
    pdf: "/certificates/thesis-preparation.pdf",
    width: 3200,
    height: 1800,
  },
  {
    key: "digi-talino",
    title: "Integrated OS: Be More Digi-TALINO",
    issuer: "Integrated Office Solutions, Inc.",
    kind: "Webinar participation",
    date: "Sep 2025",
    dateTime: "2025-09-05",
    image: "/certificates/integrated-os.jpg",
    pdf: "/certificates/integrated-os.pdf",
    width: 3200,
    height: 2262,
  },
];

export const resume = {
  headline: "UI/UX Designer & Developer",
  summary:
    "BS Computer Science student at Biliran Province State University who designs and builds user-friendly systems. Experienced in UI/UX design and prototyping, system planning and analysis, and machine learning for text classification. Built Ziren, an emergency response system with a mobile app and responder dashboard, and UniFind, a campus lost-and-found web app.",
  skills: [
    { label: "Programming Languages", items: "Python, JavaScript, HTML, CSS, SQL" },
    { label: "Frameworks", items: "Django, Tailwind CSS, Bootstrap" },
    { label: "AI and Data", items: "Machine Learning, Natural Language Processing (NLP), TF-IDF, Logistic Regression" },
    {
      label: "Tools",
      items: "Canva, Jupyter Notebook, Visual Studio Code, Git and GitHub, Microsoft Office, Google Workspace",
    },
  ],
  services: [
    "UI/UX Design and Prototyping (wireframes, interactive prototypes, responsive layouts)",
    "System Planning and Analysis (requirements, workflow diagrams, database design)",
    "AI and Machine Learning (text classification, NLP, model training and evaluation)",
    "Technical Documentation and Research (thesis, software testing, system manuals)",
  ],
  projects: [
    {
      name: "Ziren",
      subtitle: "Emergency Response System for Biliran (Mobile and Web)",
      tools: "Next.js, FastAPI, Flutter, Supabase",
      bullets: [
        "Mobile app for residents to report fire, medical, accident, crime, and calamity incidents.",
        "Responder dashboard with incident severity, map route from the nearest station, and response time.",
        "AI model that suggests incident type and severity, validated by a responder before dispatch.",
      ],
    },
    {
      name: "UniFind",
      subtitle: "Campus Lost-and-Found Web Application",
      tools: "Python, Django, HTML, CSS, JavaScript",
      bullets: [
        "Web app for reporting lost and found items with photos, category, and location.",
        "Search, priority labels, messaging, and notifications between users.",
      ],
    },
  ],
  certifications: [
    { name: "Introduction to AI Literacy and Responsible Use", issuer: "CHED ACHIEVE, Mapúa University", date: "Sep 2026" },
    { name: "Networking Basics", issuer: "Cisco Networking Academy", date: "May 2026" },
    { name: "Thesis Preparation Seminar-Workshop", issuer: "Biliran Province State University", date: "Oct 2025" },
    { name: "Integrated OS: Be More Digi-TALINO (Webinar)", issuer: "Integrated Office Solutions, Inc.", date: "Sep 2025" },
  ],
};
