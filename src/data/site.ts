import type { NavItem } from "@/types/content";

export const site = {
  name: "Dorcas Nyamekye Quaye",
  monogram: "DNQ",
  role: "Full-Stack Software Engineer",
  headline:
    "Building complete software solutions, with reliable backend systems at their core.",
  /** Phrase within the headline that gets the marigold highlight. */
  headlineHighlight: "reliable backend systems",
  greeting: "Hello, I'm Dorcas",
  /** Descriptor shown before the role in the hero greeting. */
  focus: "Backend-focused",
  description:
    "Full-Stack Software Engineer with strong backend expertise, building complete software solutions from user interfaces to reliable APIs, databases and server-side systems with Node.js, TypeScript, NestJS, React and Next.js.",
  statement:
    "Full-Stack Software Engineer building complete, dependable software, with particular strength in backend engineering.",
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
