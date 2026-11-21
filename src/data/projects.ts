import type { MinorProject, Project } from "@/types/content";

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
    context: [
      "FMP Ticketing System was built for the Strings of Hope/Yulari concert. The event needed one place to sell tickets online, issue them to buyers and check them at the door.",
      "Organisers manage the event and its ticket tiers from an admin dashboard. Each ticket carries a QR code, which is scanned at the venue to record attendance.",
    ],
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
    context: [
      "Plumbing Business Manager is a Progressive Web App built to help a plumbing business manage its operations in one place.",
      "As a PWA, it can be installed on a phone or desktop and used like a native app, which suits work that happens both in the office and on site.",
    ],
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
    context: [
      "Harvest Bridge is an independent platform that aims to connect farmers with job seekers, making it easier for farmers to find help and for job seekers to find agricultural work.",
      "The project is a work in progress. A Figma prototype exists and development is moving towards a minimum viable product. The technologies listed are the planned direction for the build.",
    ],
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
    context: [
      "AzuShop is a REST API for an online store. Anyone can browse products and categories, while authenticated customers, vendors and admins have role-based access to manage products and orders.",
      "The API is documented in Postman, and the source code is public on GitHub.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Earlier public projects, with verified links from the owner's GitHub and previous portfolio. */
export const minorProjects: MinorProject[] = [
  {
    name: "Movie Watchlist API",
    summary: "A REST API for creating, reading, updating and deleting watchlist entries.",
    technologies: ["Node.js", "Express", "MongoDB"],
    links: [{ label: "Source code", href: "https://github.com/Dorcie-dee/movieWatchlist-api" }],
  },
  {
    name: "Ecommerce API",
    summary:
      "A backend for product browsing, user registration and login, profile management and admin product management.",
    technologies: ["Node.js", "Express", "MongoDB"],
    links: [{ label: "Source code", href: "https://github.com/Dorcie-dee/ecommerce-api" }],
  },
  {
    name: "Flawless Wears",
    summary: "A website for an Afrocentric fashion brand, with product browsing and shopping.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    links: [
      { label: "Live site", href: "https://flawless-wears.netlify.app/" },
      { label: "Source code", href: "https://github.com/Dorcie-dee/flawless-wears" },
    ],
  },
  {
    name: "Audiophile",
    summary: "A front-end e-commerce site for premium headphones.",
    technologies: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "Live site", href: "https://tmp-ecommerce.netlify.app/" },
      { label: "Source code", href: "https://github.com/Dorcie-dee/tmp-ecommerce-frontend" },
    ],
  },
];
