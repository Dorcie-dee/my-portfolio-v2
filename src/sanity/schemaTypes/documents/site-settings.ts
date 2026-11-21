import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "announcement", title: "Announcement" },
    { name: "seo", title: "Page SEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "general",
      description: 'Used at the end of every page title, e.g. "About | Dorcas Nyamekye Quaye".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
      group: "general",
      description: "Default description for search results and link previews.",
      validation: (rule) => rule.required().max(200).warning("Aim for 150 to 160 characters."),
    }),
    defineField({
      name: "shareImage",
      title: "Default social sharing image",
      type: "accessibleImage",
      group: "general",
      description:
        "Optional. Shown when the site is shared on LinkedIn, X, etc. 1200 × 630 px works best. Leave empty to use the generated image.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "general",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "string",
      group: "general",
      description: "Shown after the copyright, e.g. \"All rights reserved.\"",
      initialValue: "All rights reserved.",
    }),
    defineField({
      name: "announcement",
      title: "Announcement banner",
      type: "object",
      group: "announcement",
      description: "Optional message shown at the top of every page.",
      fields: [
        defineField({ name: "enabled", title: "Show banner", type: "boolean", initialValue: false }),
        defineField({
          name: "text",
          title: "Message",
          type: "string",
          validation: (rule) =>
            rule.custom((text, context) => {
              const enabled = (context.parent as { enabled?: boolean } | undefined)?.enabled;
              return enabled && !text ? "Add a message or turn the banner off." : true;
            }),
        }),
        defineField({ name: "linkLabel", title: "Link label (optional)", type: "string" }),
        defineField({
          name: "linkUrl",
          title: "Link address (optional)",
          type: "url",
          validation: (rule) => rule.uri({ scheme: ["https", "http"], allowRelative: true }),
        }),
      ],
    }),
    defineField({
      name: "pageSeo",
      title: "Page SEO overrides",
      type: "object",
      group: "seo",
      description: "Optional. Leave any field empty to keep the default.",
      fields: [
        defineField({ name: "home", title: "Homepage", type: "seoFields" }),
        defineField({ name: "about", title: "About", type: "seoFields" }),
        defineField({ name: "projects", title: "Projects", type: "seoFields" }),
        defineField({ name: "experience", title: "Experience", type: "seoFields" }),
        defineField({ name: "contact", title: "Contact", type: "seoFields" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
