import type { NavItem } from "@/types/content";

export const site = {
  name: "Dorcas Nyamekye Quaye",
  monogram: "DNQ",
  role: "Backend-Focused Software Engineer",
  headline:
    "Building reliable backend systems, scalable APIs and practical software solutions.",
  /** Phrase within the headline that gets the marigold highlight. */
  headlineHighlight: "reliable backend systems",
  greeting: "Hello, I'm Dorcas",
  description:
    "Backend-focused software engineer building REST APIs, data models and well-tested server-side systems with Node.js, TypeScript, NestJS and Express.",
  statement:
    "Backend-focused software engineer building reliable APIs and practical software.",
  availability: "Open to selected opportunities.",
  email: "dorcasnquaye28@gmail.com",
  github: "https://github.com/Dorcie-dee",
  linkedin: "https://www.linkedin.com/in/dorcasnyamekyequaye",
  devto: "https://dev.to/dorcie-dee",
  // TODO(owner): replace with the current CV. This Google Drive CV predates the Medpharma role.
  cv: "https://drive.google.com/file/d/1-23dK9-fEKakLgWwO8e8tM7_ZmbJXTgE/view?usp=sharing",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];
