import { UserRound } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  icon: UserRound,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "home", title: "Homepage" },
    { name: "about", title: "About page" },
    { name: "availability", title: "Availability" },
    { name: "photo", title: "Photo" },
  ],
  fields: [
    // Identity
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional title",
      type: "string",
      group: "identity",
      description:
        "Your main title, used in page titles, the hero and search results. Approved positioning: Full-Stack Software Engineer.",
      initialValue: "Full-Stack Software Engineer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focusDescriptor",
      title: "Title descriptor",
      type: "string",
      group: "identity",
      description: 'Shown before your title in the hero, e.g. "Backend-focused".',
      initialValue: "Backend-focused",
    }),
    defineField({
      name: "monogram",
      title: "Monogram",
      type: "string",
      group: "identity",
      description: "Initials shown in the logo square, e.g. DNQ.",
      validation: (rule) => rule.required().max(4),
    }),
    defineField({
      name: "statement",
      title: "Short professional statement",
      type: "string",
      group: "identity",
      description: "One sentence shown in the footer.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "identity",
      description: "Optional. Leave empty to hide.",
    }),
    defineField({
      name: "currentRole",
      title: "Current professional role",
      type: "reference",
      group: "identity",
      to: [{ type: "experience" }],
      description: "Pick the experience entry for your current job.",
    }),

    // Homepage
    defineField({
      name: "greeting",
      title: "Greeting",
      type: "string",
      group: "home",
      description: 'Small line above the headline, e.g. "Hello, I\'m Dorcas".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "home",
      description: "The large hero headline.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineHighlight",
      title: "Highlighted phrase",
      type: "string",
      group: "home",
      description: "Words from the headline to highlight in marigold. Must appear exactly in the headline.",
      validation: (rule) =>
        rule.custom((phrase, context) => {
          const headline = (context.document as { headline?: string } | undefined)?.headline;
          if (phrase && headline && !headline.includes(phrase)) {
            return "This phrase must appear exactly as written in the headline.";
          }
          return true;
        }),
    }),
    defineField({
      name: "heroIntro",
      title: "Hero introduction",
      type: "simpleRichText",
      group: "home",
      description: "Short paragraph under the headline. Select words and press Bold to emphasise them.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rightNow",
      title: '"Right now" card',
      type: "array",
      group: "home",
      of: [defineArrayMember({ type: "labelValue" })],
      description: "Short facts in the hero card, e.g. Role, Shipped, Building, Core stack.",
    }),
    defineField({
      name: "introHeading",
      title: "Homepage introduction heading",
      type: "string",
      group: "home",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introParagraphs",
      title: "Homepage introduction",
      type: "paragraphs",
      group: "home",
      validation: (rule) => rule.required().min(1),
    }),

    // About page
    defineField({
      name: "aboutHeading",
      title: "About page heading",
      type: "string",
      group: "about",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "paragraphs",
      group: "about",
      description: "Longer background shown on the About page. One box per paragraph.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "focusAreas",
      title: "Areas of expertise",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "focusArea" })],
      description: 'Cards shown under "What I focus on".',
    }),
    defineField({
      name: "quickFacts",
      title: "Quick facts",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "labelValue" })],
      description: "The facts panel beside your introduction.",
    }),
    defineField({
      name: "interests",
      title: "Interests",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    // Availability
    defineField({
      name: "availability",
      title: "Availability",
      type: "object",
      group: "availability",
      fields: [
        defineField({
          name: "isAvailable",
          title: "Show availability",
          type: "boolean",
          initialValue: true,
          description: "Turn off to hide the availability badge everywhere.",
        }),
        defineField({
          name: "text",
          title: "Availability text",
          type: "string",
          initialValue: "Open to selected opportunities.",
        }),
      ],
    }),

    // Photo
    defineField({
      name: "showPhoto",
      title: "Show profile photo",
      type: "boolean",
      group: "photo",
      initialValue: false,
      description: "Turn on once you have uploaded a photo.",
    }),
    defineField({ name: "photo", title: "Profile photo", type: "accessibleImage", group: "photo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
