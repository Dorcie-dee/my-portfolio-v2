import type { Project } from "@/types/content";

// Content rules: only verified public URLs; private repositories are never linked;
// planned technologies are labelled "Planned stack"; unfinished work is marked as such.

export const projects: Project[] = [
  {
    slug: "fmp-ticketing-system",
    name: "FMP Ticketing System",
    type: "Event ticketing platform",
    summary:
      "A ticketing platform built for the Strings of Hope/Yulari concert. It handled ticket sales, issuance and QR-based entry for a real event.",
    highlights: [
      "Admin dashboard for managing the event and ticket sales",
      "VIP and premium ticket tiers",
      "Ticket issuance with QR code generation",
      "QR-based attendance tracking at the venue",
      "Draft autosaving",
    ],
    stack: {
      label: "Stack",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Paystack",
        "Nodemailer",
        "QR codes",
      ],
    },
    status: { label: "Used at a live event", tone: "live" },
    links: [
      {
        label: "Live demo",
        href: "https://ticketing-platform-teal.vercel.app/events/strings-of-hope",
      },
    ],
    monogram: "FMP",
    featured: true,
  },
  {
    slug: "plumbing-business-manager",
    name: "Plumbing Business Manager",
    type: "Progressive Web App",
    summary:
      "An installable web app that helps a plumbing business run its operations from one place, on desktop and on mobile.",
    highlights: [
      "Authentication and access controls",
      "Server-side business logic and database operations",
      "Input validation with Zod",
      "Document workflows",
    ],
    stack: {
      label: "Stack",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "MongoDB",
        "Mongoose",
        "Zod",
      ],
    },
    status: { label: "Working application", tone: "live" },
    links: [],
    monogram: "PBM",
  },
  {
    slug: "harvest-bridge",
    name: "Harvest Bridge",
    type: "Agricultural opportunity platform",
    summary:
      "An independent platform connecting farmers with job seekers, so agricultural work is easier to find and to fill.",
    highlights: [
      "Figma prototype complete",
      "Being developed towards an MVP",
    ],
    stack: {
      label: "Planned stack",
      technologies: ["NestJS", "Prisma", "PostgreSQL", "Cloudinary"],
    },
    status: { label: "In development", tone: "progress" },
    links: [],
    monogram: "HB",
  },
  {
    slug: "azushop",
    name: "AzuShop",
    type: "E-commerce REST API",
    summary:
      "A REST API for an online store, with role-based access for customers, vendors and admins.",
    highlights: [
      "JWT authentication with role-based access",
      "Product, category and order management",
      "Request validation with Joi",
      "Image uploads and email notifications",
    ],
    stack: {
      label: "Stack",
      technologies: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Joi",
        "Cloudinary",
        "Nodemailer",
      ],
    },
    links: [
      { label: "Source code", href: "https://github.com/Dorcie-dee/azushop-ecommerce-api" },
      { label: "API docs", href: "https://documenter.getpostman.com/view/42782764/2sB3QDvsw5" },
    ],
    monogram: "AZ",
  },
];
