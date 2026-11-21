import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend engineering",
    summary: "Server-side applications, REST APIs, authentication and validation.",
    core: ["Node.js", "TypeScript", "NestJS", "Express", "REST APIs"],
    familiar: ["JavaScript", "JWT", "Joi", "Zod"],
  },
  {
    title: "Databases",
    summary: "Relational and document data modelling and queries.",
    core: ["PostgreSQL", "MongoDB", "Mongoose"],
    familiar: ["MySQL"],
  },
  {
    title: "Testing and API documentation",
    summary: "Automated tests and clear, usable API contracts.",
    core: ["Jest", "Supertest", "Swagger / OpenAPI", "Postman"],
  },
  {
    title: "Frontend development",
    summary: "Complete features when a project needs both sides.",
    core: ["Next.js", "React", "Tailwind CSS"],
    familiar: ["Refine", "HTML and CSS", "Figma"],
  },
  {
    title: "Cloud and developer tools",
    summary: "Deployment, hosting and day-to-day engineering workflow.",
    core: ["Git and GitHub", "Vercel", "Render"],
    familiar: ["AWS", "Netlify", "Cloudinary", "GitHub Actions"],
  },
];
