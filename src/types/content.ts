export type NavItem = {
  label: string;
  href: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

export type SkillCategory = {
  title: string;
  /** What this area covers, in one line. */
  summary: string;
  /** Technologies used most and in most depth. */
  core: string[];
  /** Technologies used, but less often or in less depth. */
  familiar?: string[];
};

export type ProjectStatusTone = "live" | "progress" | "neutral";

export type Project = {
  slug: string;
  name: string;
  /** Short category, e.g. "Progressive Web App". */
  type: string;
  summary: string;
  /** Implemented functionality, or the current state for unfinished work. */
  highlights: string[];
  stack: {
    /** Use "Planned stack" when technologies are not yet confirmed as implemented. */
    label: "Stack" | "Planned stack";
    technologies: string[];
  };
  status?: {
    label: string;
    tone: ProjectStatusTone;
  };
  /** Only verified public URLs. Private repositories are never linked. */
  links: ExternalLink[];
  /** Two or three letters for the decorative card visual. */
  monogram: string;
  featured?: boolean;
};

export type Role = {
  organisation: string;
  title: string;
  /** Display label, e.g. "September 2025". */
  start: string;
  /** ISO date (YYYY-MM) for <time>. */
  startDate: string;
  /** Display label; "Present" for the current role. */
  end: string;
  summary: string;
  contributions: string[];
  technologies: string[];
};
