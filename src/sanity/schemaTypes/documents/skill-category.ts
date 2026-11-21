import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { Layers } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill category",
  type: "document",
  icon: Layers,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "skillCategory" }),
    defineField({
      name: "title",
      title: "Category title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One line describing what this area covers.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "core",
      title: "Main tools (filled tags)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Tools you use most and know in depth.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "familiar",
      title: "Other tools (dashed tags)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Tools you have used, but less often or in less depth.",
    }),
    defineField({
      name: "isVisible",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", visible: "isVisible", core: "core" },
    prepare: ({ title, visible, core }) => ({
      title: `${title ?? "Untitled"}${visible === false ? " (hidden)" : ""}`,
      subtitle: Array.isArray(core) ? core.join(", ") : undefined,
    }),
  },
});
