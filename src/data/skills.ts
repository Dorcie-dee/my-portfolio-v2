import type { SkillCategory } from "@/types/content";

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend engineering",
    summary: "Server-side applications, REST APIs, authentication and validation.",
    core: ["Node.js", "TypeScript", "JavaScript", "NestJS", "Express", "REST APIs", "JWT", "Joi"],
    familiar: ["Zod"],
  },
  {
    title: "Databases",
    summary: "Relational and document data modelling and queries.",
    core: ["PostgreSQL", "MongoDB", "Mongoose"],
    familiar: ["MySQL"],
  },
  {
    title: "Testing and API documentation",
    summary: "Automated tests, plus API documentation with Swagger/OpenAPI and Postman.",
    core: ["Jest", "Supertest", "Swagger / OpenAPI", "Postman documentation"],
  },
  {
    title: "Frontend and mobile",
    summary: "Complete web and mobile features when a project needs both sides.",
    core: ["Next.js", "React", "React Native", "Tailwind CSS"],
    familiar: ["Refine", "HTML and CSS", "Figma"],
  },
  {
    title: "Cloud and developer tools",
    summary: "Deployment, hosting and day-to-day engineering workflow.",
    core: ["Git and GitHub", "GitHub Actions", "Vercel", "Render", "Cloudinary"],
    familiar: ["AWS", "Netlify"],
  },
];
