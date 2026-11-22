import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { FolderKanban } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Case-study fields are required only for projects in the main section. */
function requiredForMain(message: string) {
  return (value: unknown, context: { document?: unknown }) => {
    const listing = (context.document as { listing?: string } | undefined)?.listing;
    const empty = value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    return listing !== "earlier" && empty ? message : true;
  };
}

export const projectStatuses = [
  { title: "Completed", value: "completed" },
  { title: "In use", value: "inUse" },
  { title: "In development", value: "inDevelopment" },
  { title: "Prototype", value: "prototype" },
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderKanban,
  orderings: [orderRankOrdering],
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "story", title: "Case study" },
    { name: "tech", title: "Technology" },
    { name: "media", title: "Images" },
    { name: "links", title: "Links" },
    { name: "display", title: "Visibility & display" },
  ],
  fields: [
    orderRankField({ type: "project" }),

    // Basics
    defineField({
      name: "name",
      title: "Project name",
      type: "string",
      group: "basics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      group: "basics",
      description: 'Used in the project\'s URL, e.g. /projects/harvest-bridge. Click "Generate".',
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basics",
      description: 'Short type label, e.g. "Progressive Web App" or "Event ticketing platform".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "basics",
      description: "One or two sentences shown on project cards and in search results.",
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "projectsPageSummary",
      title: "Projects page description (optional)",
      type: "text",
      rows: 3,
      group: "basics",
      description:
        "A differently worded short description for the Projects page. Leave empty to use the short description above.",
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "basics",
      options: { list: projectStatuses, layout: "radio" },
    }),
    defineField({
      name: "statusLabel",
      title: "Custom status text (optional)",
      type: "string",
      group: "basics",
      description: 'Overrides the status wording on the website, e.g. "Used at a live event".',
    }),

    // Case study
    defineField({
      name: "overview",
      title: "Overview",
      type: "paragraphs",
      group: "story",
      description: "The main case-study text. One box per paragraph. Required for main projects.",
      validation: (rule) => rule.custom(requiredForMain("Add at least one overview paragraph.")),
    }),
    defineField({
      name: "purpose",
      title: "Problem or purpose (optional)",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "role",
      title: "My role and contributions (optional)",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "features",
      title: "Key features",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })],
      description: "What has been built. For unfinished projects, describe the current state. Required for main projects.",
      validation: (rule) => rule.custom(requiredForMain("Add at least one feature.")),
    }),
    defineField({
      name: "sections",
      title: "Case study sections (optional)",
      type: "array",
      group: "story",
      description:
        "Extra headed sections shown after the key features, e.g. how it works, technical decisions, challenges or current status. Drag to reorder.",
      of: [
        defineArrayMember({
          type: "object",
          name: "caseStudySection",
          title: "Section",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 4 })],
              description: "One box per paragraph.",
            }),
            defineField({
              name: "points",
              title: "Bullet points (optional)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              description: "Shown as a list after the paragraphs.",
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),

    // Technology
    defineField({
      name: "technologies",
      title: "Technologies and tools",
      type: "array",
      group: "tech",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "stackIsPlanned",
      title: "These technologies are planned, not yet implemented",
      type: "boolean",
      group: "tech",
      initialValue: false,
      description: 'Shows the list as "Planned stack" with dashed tags.',
    }),

    // Images
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "accessibleImage",
      group: "media",
      description: "Optional. Without a thumbnail, the colour panel with initials is shown.",
    }),
    defineField({
      name: "panelInitials",
      title: "Panel initials",
      type: "string",
      group: "media",
      description: "Two or three letters for the colour panel, e.g. FMP. Required for main projects.",
      validation: (rule) => rule.max(4).custom(requiredForMain("Add initials for the colour panel.")),
    }),
    defineField({
      name: "gallery",
      title: "Screenshots",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "accessibleImage" })],
      options: { layout: "grid" },
      description: "Drag images to change their order. Only real screenshots of the product.",
    }),

    // Links
    defineField({
      name: "isRepoPrivate",
      title: "Source code repository is private",
      type: "boolean",
      group: "links",
      initialValue: false,
      description: 'Shows "Private repository" instead of a code link.',
    }),
    defineField({
      name: "repoUrl",
      title: "Public repository URL",
      type: "url",
      group: "links",
      hidden: ({ document }) => Boolean(document?.isRepoPrivate),
      validation: (rule) =>
        rule.uri({ scheme: ["https"] }).custom((url, context) => {
          const isPrivate = (context.document as { isRepoPrivate?: boolean } | undefined)?.isRepoPrivate;
          return isPrivate && url ? "Remove this link: the repository is marked as private." : true;
        }),
    }),
    defineField({
      name: "liveUrl",
      title: "Live demo URL",
      type: "url",
      group: "links",
      description: "Only add a working public URL. Leave empty if there is no public demo.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "extraLinks",
      title: "Other links",
      type: "array",
      group: "links",
      of: [defineArrayMember({ type: "labelledLink" })],
      description: 'e.g. "API docs".',
    }),

    // Visibility & display
    defineField({
      name: "isVisible",
      title: "Show on website",
      type: "boolean",
      group: "display",
      initialValue: true,
      description: "Turn off to hide this project (its page will return 404) without deleting it.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "display",
      initialValue: false,
      description: "Shown as the large card at the top of the projects list. This does not publish the project.",
    }),
    defineField({
      name: "listing",
      title: "Section",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Main projects (with case study)", value: "main" },
          { title: "More on GitHub (compact list)", value: "earlier" },
        ],
        layout: "radio",
      },
      initialValue: "main",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      visible: "isVisible",
      featured: "featured",
      listing: "listing",
      media: "thumbnail",
    },
    prepare: ({ title, category, visible, featured, listing, media }) => ({
      title: `${title ?? "Untitled"}${visible === false ? " (hidden)" : ""}`,
      subtitle: [category, featured ? "Featured" : null, listing === "earlier" ? "More on GitHub" : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
