import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/*
 * Tells Sanity's Presentation tool (in /manage) how documents and pages relate:
 * - mainDocuments: which document to open when a page is shown in the preview.
 * - locations: the "Used on" pages listed on each document, so editors know where a change appears.
 */

const allPages = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Experience", href: "/experience" },
  { title: "Contact", href: "/contact" },
];

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "profile"` },
    { route: "/about", filter: `_type == "profile"` },
    { route: "/projects/:slug", filter: `_type == "project" && slug.current == $slug` },
    { route: "/experience", filter: `_type == "experience" && isCurrent == true` },
    { route: "/contact", filter: `_type == "siteSettings"` },
  ]),
  locations: {
    profile: defineLocations({
      message: "Your profile appears on these pages",
      tone: "positive",
      locations: [
        { title: "Home (hero, introduction, current role)", href: "/" },
        { title: "About", href: "/about" },
        { title: "Contact (availability)", href: "/contact" },
      ],
    }),
    siteSettings: defineLocations({
      message: "Site settings affect every page (footer, announcement banner and SEO)",
      tone: "caution",
      locations: allPages,
    }),
    socialLink: defineLocations({
      message: "Social links appear in the homepage hero, the footer on every page and the Contact page",
      locations: [
        { title: "Home", href: "/" },
        { title: "Contact", href: "/contact" },
      ],
    }),
    cv: defineLocations({
      message: "The CV button appears in the header, mobile menu, footer and Contact page",
      locations: [
        { title: "Home", href: "/" },
        { title: "Contact", href: "/contact" },
      ],
    }),
    skillCategory: defineLocations({
      message: "Technical focus appears on these pages",
      locations: [
        { title: "Home (technical focus)", href: "/" },
        { title: "About", href: "/about" },
      ],
    }),
    experience: defineLocations({
      select: { title: "title", organisation: "organisation" },
      resolve: (doc) => ({
        locations: [
          { title: `Experience (${doc?.organisation ?? doc?.title ?? "this role"})`, href: "/experience" },
          { title: "Home (if set as your current role)", href: "/" },
        ],
      }),
    }),
    project: defineLocations({
      select: { title: "name", slug: "slug.current", listing: "listing" },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug && doc.listing !== "earlier" ? [{ title: `${doc.title} case study`, href: `/projects/${doc.slug}` }] : []),
          { title: "Projects", href: "/projects" },
          { title: "Home (selected projects)", href: "/" },
        ],
      }),
    }),
  },
};
