import type { Role } from "@/types/content";

// Public content only: no internal system names, URLs, credentials or architecture details.

export const currentRole: Role = {
  organisation: "Medpharma Alliance International",
  title: "Mid-Level Software Engineer",
  start: "September 2025",
  startDate: "2025-09",
  end: "Present",
  summary:
    "I work as part of the engineering team on the company's healthcare-related applications and integrations, focusing on backend development.",
  contributions: [
    "Backend development and API work across healthcare-related applications and integrations",
    "Automated backend tests with Jest and Supertest",
    "API documentation with Swagger/OpenAPI",
    "Bug investigation and ongoing application maintenance",
    "Hands-on exposure to AWS deployments and environments",
  ],
  technologies: ["Jest", "Supertest", "Swagger / OpenAPI", "AWS"],
};
