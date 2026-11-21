import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { Briefcase } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const employmentTypes = [
  { title: "Full-time", value: "fullTime" },
  { title: "Part-time", value: "partTime" },
  { title: "Contract", value: "contract" },
  { title: "Freelance", value: "freelance" },
  { title: "Internship", value: "internship" },
  { title: "Training", value: "training" },
];

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: Briefcase,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "experience" }),
    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Type (optional)",
      type: "string",
      options: { list: employmentTypes, layout: "dropdown" },
      description: "Leave empty if you prefer not to show it.",
    }),
    defineField({ name: "location", title: "Location (optional)", type: "string" }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "I currently work here",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      hidden: ({ document }) => Boolean(document?.isCurrent),
      validation: (rule) =>
        rule.custom((end, context) => {
          const doc = context.document as { startDate?: string; isCurrent?: boolean } | undefined;
          if (doc?.isCurrent || !end || !doc?.startDate) return true;
          return end >= doc.startDate ? true : "End date must be after the start date.";
        }),
    }),
    defineField({
      name: "datePrecision",
      title: "Show dates as",
      type: "string",
      options: {
        list: [
          { title: "Month and year (September 2025)", value: "month" },
          { title: "Year only (2025)", value: "year" },
        ],
        layout: "radio",
      },
      initialValue: "month",
    }),
    defineField({ name: "summary", title: "Description (optional)", type: "text", rows: 3 }),
    defineField({
      name: "contributions",
      title: "Responsibilities and contributions",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Describe your own contributions. Avoid internal system names or confidential details.",
    }),
    defineField({
      name: "technologies",
      title: "Technologies and skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "isVisible",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", organisation: "organisation", visible: "isVisible", current: "isCurrent" },
    prepare: ({ title, organisation, visible, current }) => ({
      title: `${title ?? "Untitled"}${visible === false ? " (hidden)" : ""}`,
      subtitle: [organisation, current ? "Current" : null].filter(Boolean).join(" · "),
    }),
  },
});
