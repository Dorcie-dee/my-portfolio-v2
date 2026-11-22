import type {
  EXPERIENCE_QUERY_RESULT,
  PROFILE_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SITE_QUERY_RESULT,
  SKILLS_QUERY_RESULT,
} from "@/sanity/types";

// Convenience types for the content returned by the Sanity queries.
export type SiteContent = SITE_QUERY_RESULT;
export type SocialLink = SITE_QUERY_RESULT["socialLinks"][number];
export type CvLink = NonNullable<SITE_QUERY_RESULT["cv"]>;
export type ProfileContent = NonNullable<PROFILE_QUERY_RESULT>;
export type ProjectSummary = PROJECTS_QUERY_RESULT[number];
export type ProjectDetail = NonNullable<PROJECT_QUERY_RESULT>;
export type SkillCategory = SKILLS_QUERY_RESULT[number];
export type ExperienceEntry = EXPERIENCE_QUERY_RESULT[number];

export type StatusTone = "live" | "progress" | "neutral";

const STATUS: Record<string, { label: string; tone: StatusTone }> = {
  completed: { label: "Completed", tone: "neutral" },
  inUse: { label: "In use", tone: "live" },
  inDevelopment: { label: "In development", tone: "progress" },
  prototype: { label: "Prototype", tone: "progress" },
};

/** Badge text and colour for a project status. The custom status text wins when set. */
export function projectStatus(project: { status: string | null; statusLabel: string | null }) {
  const base = project.status ? STATUS[project.status] : undefined;
  if (!base && !project.statusLabel) return null;
  return { label: project.statusLabel ?? base?.label ?? "", tone: base?.tone ?? "neutral" };
}

/** Public links for a project. Private repositories never produce a code link. */
export function projectLinks(project: {
  isRepoPrivate: boolean | null;
  repoUrl: string | null;
  liveUrl: string | null;
  extraLinks: Array<{ _key: string; label: string | null; url: string | null }> | null;
}) {
  const links: Array<{ key: string; label: string; href: string }> = [];
  if (project.liveUrl) links.push({ key: "live", label: "Live demo", href: project.liveUrl });
  if (project.repoUrl && !project.isRepoPrivate) links.push({ key: "repo", label: "Source code", href: project.repoUrl });
  for (const link of project.extraLinks ?? []) {
    if (link.label && link.url) links.push({ key: link._key, label: link.label, href: link.url });
  }
  return links;
}

const EMPLOYMENT_LABELS: Record<string, string> = {
  fullTime: "Full-time",
  partTime: "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
  training: "Training",
};

export function employmentLabel(type: string | null) {
  return type ? (EMPLOYMENT_LABELS[type] ?? null) : null;
}

function formatDate(isoDate: string, precision: string | null) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return precision === "year"
    ? String(date.getUTCFullYear())
    : date.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** e.g. "September 2025 – Present", or "2025" for a year-only entry without an end date. */
export function rolePeriod(role: {
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean | null;
  datePrecision: string | null;
}) {
  if (!role.startDate) return { start: "", end: null as string | null };
  const start = formatDate(role.startDate, role.datePrecision);
  const end = role.isCurrent ? "Present" : role.endDate ? formatDate(role.endDate, role.datePrecision) : null;
  return { start, end: end === start ? null : end };
}

/** Link target for a social link; email addresses become mailto: links. */
export function socialHref(link: { platform: string | null; url: string | null }) {
  if (!link.url) return null;
  if (link.platform === "email") return link.url.startsWith("mailto:") ? link.url : `mailto:${link.url}`;
  return link.url;
}

export const isExternal = (href: string) => href.startsWith("http");

const PLATFORM_NAMES: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  devto: "DEV Community",
  email: "Email",
  x: "X",
  website: "Website",
};

/** Full platform name for accessible labels, e.g. "DEV Community" for a link labelled "DEV". */
export function platformName(link: { platform: string | null; label: string | null }) {
  return (link.platform && PLATFORM_NAMES[link.platform]) || link.label || "Link";
}

/** "Dorcas Nyamekye Quaye" -> "Dorcas N. Quaye", for narrow screens. */
export function shortName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 3) return name;
  const middle = parts.slice(1, -1).map((part) => `${part[0]}.`);
  return [parts[0], ...middle, parts[parts.length - 1]].join(" ");
}
