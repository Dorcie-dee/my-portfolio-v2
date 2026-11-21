import { currentRole } from "./experience";
import { getProject } from "./projects";

export const bio: string[] = [
  `I'm a full-stack software engineer with stronger expertise in backend engineering, currently working as a ${currentRole.title} at ${currentRole.organisation}. There I'm part of the engineering team working on healthcare-related applications and integrations.`,
  "I trained in web development with MEST Africa in 2025. Since then I've built complete applications across the frontend and backend, with most of my depth in server-side work: REST APIs with Node.js and TypeScript, services built with NestJS and Express, and data modelled in PostgreSQL and MongoDB.",
  "Alongside my role I build products of my own, from a ticketing platform used at a live concert to an agricultural opportunity platform that is currently in development.",
];

export const focusAreas: { title: string; description: string }[] = [
  {
    title: "Clear, well-structured APIs",
    description: "REST APIs with consistent resources, validation and authentication.",
  },
  {
    title: "Tested code",
    description: "Automated backend tests with Jest and Supertest.",
  },
  {
    title: "Documented contracts",
    description: "API documentation with Swagger/OpenAPI and Postman.",
  },
  {
    title: "Complete applications",
    description: "Next.js, React and React Native interfaces, connected to the APIs and data behind them.",
  },
];

/** From the owner's public GitHub profile. */
export const interests = [
  "Agri-tech",
  "Health-tech",
  "EdTech",
  "Cybersecurity",
  "AI-assisted development",
  "Microlearning",
  "Automation",
];

/** Short facts shown beside the introduction on the homepage and the About page. */
export const quickFacts = [
  { term: "Current role", detail: `${currentRole.title}, ${currentRole.organisation}` },
  { term: "Focus", detail: "Full-stack, with backend expertise" },
  { term: "Core stack", detail: "Node.js · TypeScript · NestJS · Express" },
  { term: "Data", detail: "PostgreSQL · MongoDB" },
  { term: "Quality", detail: "Jest · Supertest · Swagger/OpenAPI · Postman" },
];

const fmp = getProject("fmp-ticketing-system");
const harvest = getProject("harvest-bridge");

/** The hero's "Right now" card. Each line restates facts held elsewhere in src/data. */
export const rightNow: { label: string; detail: string }[] = [
  { label: "Role", detail: `${currentRole.title}, ${currentRole.organisation}` },
  ...(fmp ? [{ label: "Shipped", detail: `${fmp.name}, used at a live concert` }] : []),
  ...(harvest ? [{ label: "Building", detail: `${harvest.name}, connecting farmers and job seekers` }] : []),
  { label: "Core stack", detail: "Node.js · TypeScript · JavaScript · NestJS · PostgreSQL" },
];
