import { currentRole } from "./experience";

export const bio: string[] = [
  `I'm a backend-focused software engineer, currently working as a ${currentRole.title} at ${currentRole.organisation}. There I'm part of the engineering team working on healthcare-related applications and integrations.`,
  "I trained in web development with MEST Africa in 2025 and have focused on the server side since: REST APIs with Node.js and TypeScript, services built with NestJS and Express, and data modelled in PostgreSQL and MongoDB.",
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
    title: "Full stack when needed",
    description: "Next.js and React to deliver complete features.",
  },
];

/** From the owner's public GitHub profile. */
export const interests = ["Agri-tech", "AI-assisted development", "Microlearning", "Automation"];

/** Short facts shown beside the introduction on the homepage and the About page. */
export const quickFacts = [
  { term: "Current role", detail: `${currentRole.title}, ${currentRole.organisation}` },
  { term: "Focus", detail: "Backend and API development" },
  { term: "Core stack", detail: "Node.js · TypeScript · NestJS · Express" },
  { term: "Data", detail: "PostgreSQL · MongoDB" },
  { term: "Quality", detail: "Jest · Supertest · Swagger/OpenAPI" },
];
