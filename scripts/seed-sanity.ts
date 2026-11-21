/**
 * One-off migration: copies the portfolio's current hardcoded content into Sanity.
 *
 * Run with your own Sanity login (no API token is created or stored):
 *   npx sanity login
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> NEXT_PUBLIC_SANITY_DATASET=production \
 *     npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * Add DRY_RUN=1 to print a summary without writing anything.
 * Safe to re-run: every document has a fixed ID and is created or replaced.
 * It does not delete any document or touch documents it did not create.
 */
import { LexoRank } from "lexorank";
import { getCliClient } from "sanity/cli";
import { bio, focusAreas, interests, quickFacts, rightNow } from "../src/data/about";
import { currentRole, roles } from "../src/data/experience";
import { minorProjects, projects } from "../src/data/projects";
import { site } from "../src/data/site";
import { skillCategories } from "../src/data/skills";

type Doc = { _id: string; _type: string; [key: string]: unknown };

const DRY_RUN = process.env.DRY_RUN === "1";

/** Deterministic _key values so re-running produces identical documents. */
const key = (prefix: string, index: number) => `${prefix}${index}`;

/** Lexorank values in the format used by @sanity/orderable-document-list. */
function ranks(count: number): string[] {
  const out: string[] = [];
  let rank = LexoRank.min();
  for (let i = 0; i < count; i++) {
    rank = rank.genNext().genNext();
    out.push(rank.toString());
  }
  return out;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ---------- Experience ----------
const experienceIds = new Map<string, string>([
  ["Medpharma Alliance International", "experience-medpharma"],
  ["MEST Africa", "experience-mest-africa"],
]);
const experienceRanks = ranks(roles.length);

const experienceDocs: Doc[] = roles.map((role, index) => {
  const isTraining = role.kind === "Training";
  // Existing data stores "2025-09" or "2025"; Sanity date fields need a full date.
  const startDate = role.startDate.length === 4 ? `${role.startDate}-01-01` : `${role.startDate}-01`;
  return {
    _id: experienceIds.get(role.organisation) ?? `experience-${slugify(role.organisation)}`,
    _type: "experience",
    orderRank: experienceRanks[index],
    organisation: role.organisation,
    title: role.title,
    // Only set where known: MEST is training; Medpharma's employment type was never specified.
    ...(isTraining ? { employmentType: "training" } : {}),
    startDate,
    isCurrent: role.end === "Present",
    datePrecision: role.startDate.length === 4 ? "year" : "month",
    ...(role.summary ? { summary: role.summary } : {}),
    contributions: role.contributions ?? [],
    technologies: role.technologies ?? [],
    isVisible: true,
  };
});

// ---------- Projects ----------
const statusMap: Record<string, { status: string; statusLabel?: string }> = {
  "Used at a live event": { status: "inUse", statusLabel: "Used at a live event" },
  "Working application": { status: "inUse", statusLabel: "Working application" },
  "In development": { status: "inDevelopment" },
};

// Categories for the earlier projects, taken from their existing descriptions.
const minorCategories: Record<string, string> = {
  "Movie Watchlist API": "REST API",
  "Ecommerce API": "REST API",
  "Flawless Wears": "Fashion brand website",
  Audiophile: "E-commerce frontend",
};

const projectRanks = ranks(projects.length + minorProjects.length);

const mainProjectDocs: Doc[] = projects.map((project, index) => {
  const repo = project.links.find((link) => link.label === "Source code");
  const live = project.links.find((link) => link.label === "Live demo");
  const extra = project.links.filter((link) => link !== repo && link !== live);
  const status = project.status ? statusMap[project.status.label] : undefined;
  return {
    _id: `project-${project.slug}`,
    _type: "project",
    orderRank: projectRanks[index],
    name: project.name,
    slug: { _type: "slug", current: project.slug },
    category: project.type,
    summary: project.summary,
    ...(status ?? {}),
    overview: project.context,
    features: project.highlights,
    technologies: project.stack.technologies,
    stackIsPlanned: project.stack.label === "Planned stack",
    panelInitials: project.monogram,
    // A project without a public source link has a private repository.
    isRepoPrivate: !repo,
    ...(repo ? { repoUrl: repo.href } : {}),
    ...(live ? { liveUrl: live.href } : {}),
    extraLinks: extra.map((link, i) => ({ _key: key("link", i), _type: "labelledLink", label: link.label, url: link.href })),
    featured: Boolean(project.featured),
    isVisible: true,
    listing: "main",
  };
});

const minorProjectDocs: Doc[] = minorProjects.map((project, index) => {
  const repo = project.links.find((link) => link.label === "Source code");
  const live = project.links.find((link) => link.label === "Live site");
  return {
    _id: `project-${slugify(project.name)}`,
    _type: "project",
    orderRank: projectRanks[projects.length + index],
    name: project.name,
    slug: { _type: "slug", current: slugify(project.name) },
    category: minorCategories[project.name] ?? "Project",
    summary: project.summary,
    technologies: project.technologies,
    stackIsPlanned: false,
    isRepoPrivate: !repo,
    ...(repo ? { repoUrl: repo.href } : {}),
    ...(live ? { liveUrl: live.href } : {}),
    featured: false,
    isVisible: true,
    listing: "earlier",
  };
});

// ---------- Skills ----------
const skillRanks = ranks(skillCategories.length);
const skillDocs: Doc[] = skillCategories.map((category, index) => ({
  _id: `skill-${slugify(category.title)}`,
  _type: "skillCategory",
  orderRank: skillRanks[index],
  title: category.title,
  summary: category.summary,
  core: category.core,
  familiar: category.familiar ?? [],
  isVisible: true,
}));

// ---------- Social links ----------
const socialSeed = [
  { platform: "github", label: "GitHub", url: site.github },
  { platform: "linkedin", label: "LinkedIn", url: site.linkedin },
  { platform: "devto", label: "DEV", url: site.devto },
  { platform: "email", label: "Email", url: site.email },
];
const socialRanks = ranks(socialSeed.length);
const socialDocs: Doc[] = socialSeed.map((link, index) => ({
  _id: `social-${link.platform}`,
  _type: "socialLink",
  orderRank: socialRanks[index],
  ...link,
  isVisible: true,
}));

// ---------- Profile (copy matches the current components exactly) ----------
const heroIntroText = [
  { text: "I build complete software solutions for " },
  { text: "web", bold: true },
  { text: " and " },
  { text: "mobile", bold: true },
  {
    text: ", from intuitive user interfaces to reliable backend systems, APIs and databases. My strongest expertise is in backend engineering, where I focus on systems that are maintainable, secure and dependable.",
  },
];

const profileDoc: Doc = {
  _id: "profile",
  _type: "profile",
  name: site.name,
  title: site.role,
  focusDescriptor: site.focus,
  monogram: site.monogram,
  statement: site.statement,
  currentRole: { _type: "reference", _ref: experienceIds.get(currentRole.organisation) },
  greeting: site.greeting,
  headline: site.headline,
  headlineHighlight: site.headlineHighlight,
  heroIntro: [
    {
      _key: "intro0",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: heroIntroText.map((span, i) => ({
        _key: key("span", i),
        _type: "span",
        text: span.text,
        marks: span.bold ? ["strong"] : [],
      })),
    },
  ],
  rightNow: rightNow.map((item, i) => ({ _key: key("now", i), _type: "labelValue", label: item.label, value: item.detail })),
  introHeading: "Full-stack engineering, with backend at the core.",
  introParagraphs: [
    "I'm a full-stack software engineer. I work across the whole product, from user interfaces to the backend systems, APIs, databases and integrations behind them. My strongest expertise is on the backend: building services with Node.js, TypeScript, NestJS and Express, and modelling data in PostgreSQL and MongoDB.",
    "On the frontend I build with Next.js, React and React Native. Throughout, I pay attention to maintainability, security, solid functionality and the experience of the people using the software. I write automated tests with Jest and Supertest and document APIs with Swagger/OpenAPI and Postman.",
  ],
  aboutHeading: "A full-stack software engineer with a strong backend focus.",
  biography: bio,
  focusAreas: focusAreas.map((area, i) => ({ _key: key("focus", i), _type: "focusArea", ...area })),
  quickFacts: quickFacts.map((fact, i) => ({ _key: key("fact", i), _type: "labelValue", label: fact.term, value: fact.detail })),
  interests,
  availability: { isAvailable: true, text: site.availability },
  showPhoto: false,
};

// ---------- Site settings (page descriptions copied from the current pages) ----------
const siteSettingsDoc: Doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: site.name,
  seoDescription: site.description,
  contactEmail: site.email,
  footerText: "All rights reserved.",
  announcement: { enabled: false },
  pageSeo: {
    about: {
      description: `About ${site.name}, a full-stack software engineer with backend expertise, working with Node.js, TypeScript, NestJS, React, PostgreSQL and MongoDB.`,
    },
    projects: {
      description: `Projects by ${site.name}: an event ticketing platform, a Progressive Web App for a plumbing business, an agricultural opportunity platform and an e-commerce API.`,
    },
    experience: {
      description: `Professional experience of ${site.name}, Mid-Level Software Engineer at Medpharma Alliance International.`,
    },
    contact: {
      description: `Contact ${site.name} about full-stack or backend-focused software engineering roles, freelance projects and collaborations.`,
    },
  },
};

// ---------- CV: hidden until a PDF is uploaded in the Studio (no Google Drive link) ----------
const cvDoc: Doc = { _id: "cv", _type: "cv", isVisible: false, buttonLabel: "CV" };

const allDocs: Doc[] = [
  ...experienceDocs, // referenced by profile, so created first
  profileDoc,
  siteSettingsDoc,
  cvDoc,
  ...socialDocs,
  ...mainProjectDocs,
  ...minorProjectDocs,
  ...skillDocs,
];

async function main() {
  const counts = allDocs.reduce<Record<string, number>>((acc, doc) => {
    acc[doc._type] = (acc[doc._type] ?? 0) + 1;
    return acc;
  }, {});
  console.log(`Prepared ${allDocs.length} documents:`, counts);

  if (DRY_RUN) {
    console.log("DRY_RUN=1: nothing written. Document IDs:");
    for (const doc of allDocs) console.log(`  ${doc._type.padEnd(14)} ${doc._id}`);
    return;
  }

  const client = getCliClient({ apiVersion: "2026-03-01" });
  const transaction = client.transaction();
  for (const doc of allDocs) transaction.createOrReplace(doc);
  const result = await transaction.commit();
  console.log(`Committed transaction ${result.transactionId} (${result.results.length} documents).`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
