import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { Link2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const socialPlatforms = [
  { title: "GitHub", value: "github" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "DEV Community", value: "devto" },
  { title: "Email", value: "email" },
  { title: "X (Twitter)", value: "x" },
  { title: "Website", value: "website" },
  { title: "Other", value: "other" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "document",
  icon: Link2,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "socialLink" }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: socialPlatforms, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Text shown on the website, e.g. "GitHub" or "DEV".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Web address or email",
      type: "string",
      description: "For Email, enter just the address (e.g. name@example.com). For others, the full https:// link.",
      validation: (rule) =>
        rule.required().custom((value, context) => {
          if (!value) return true;
          const platform = (context.document as { platform?: string } | undefined)?.platform;
          if (platform === "email") {
            return EMAIL.test(value.replace(/^mailto:/, "")) ? true : "Enter a valid email address.";
          }
          return /^https:\/\/\S+$/.test(value) ? true : "Enter a full link starting with https://";
        }),
    }),
    defineField({
      name: "isVisible",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide this link without deleting it.",
    }),
  ],
  preview: {
    select: { title: "label", url: "url", visible: "isVisible" },
    prepare: ({ title, url, visible }) => ({
      title: `${title ?? "Untitled"}${visible === false ? " (hidden)" : ""}`,
      subtitle: url,
    }),
  },
});
