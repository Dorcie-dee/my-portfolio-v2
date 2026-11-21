import { defineField, defineType } from "sanity";

/** Image with required alternative text when an image is chosen. */
export const accessibleImage = defineType({
  name: "accessibleImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the image for people using screen readers, e.g. \"Admin dashboard showing ticket sales\". Required.",
      validation: (rule) =>
        rule.custom((alt, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          if (parent?.asset && !alt) return "Add alternative text so the image is accessible.";
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional short caption shown with the image.",
    }),
  ],
});

/** A label with a web address, e.g. "API docs". */
export const labelledLink = defineType({
  name: "labelledLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Web address",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["https", "http"] }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "url" } },
});

/** A short label and value, used for quick facts and the "Right now" card. */
export const labelValue = defineType({
  name: "labelValue",
  title: "Fact",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

/** A focus area card on the About page. */
export const focusArea = defineType({
  name: "focusArea",
  title: "Focus area",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

/** Optional per-page search engine overrides. Leave empty to use the defaults. */
export const seoFields = defineType({
  name: "seoFields",
  title: "Search engine settings",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown in browser tabs and search results. Leave empty to use the default.",
      validation: (rule) => rule.max(70).warning("Search engines usually cut titles after about 60 characters."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Shown under the title in search results. Leave empty to use the default.",
      validation: (rule) => rule.max(200).warning("Aim for 150 to 160 characters."),
    }),
  ],
});

/** Paragraph list used for longer copy, so each paragraph stays easy to edit. */
export const paragraphs = defineType({
  name: "paragraphs",
  title: "Paragraphs",
  type: "array",
  of: [{ type: "text", rows: 4 }],
});

/**
 * Short rich text with bold only, for the hero introduction where words like
 * "web" and "mobile" are emphasised.
 */
export const simpleRichText = defineType({
  name: "simpleRichText",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [{ title: "Bold", value: "strong" }],
        annotations: [],
      },
    },
  ],
});
