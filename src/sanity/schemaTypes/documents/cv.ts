import { FileText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const cv = defineType({
  name: "cv",
  title: "CV",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "file",
      title: "CV file (PDF)",
      type: "file",
      description: "Upload your CV as a PDF. To replace it, upload a new file here and publish.",
      options: { accept: "application/pdf" },
      validation: (rule) =>
        rule.custom((file, context) => {
          const visible = (context.document as { isVisible?: boolean } | undefined)?.isVisible;
          const hasAsset = Boolean((file as { asset?: unknown } | undefined)?.asset);
          return visible && !hasAsset ? "Upload a PDF, or turn off \"Show CV on website\"." : true;
        }),
    }),
    defineField({
      name: "isVisible",
      title: "Show CV on website",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide every CV link on the website.",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button text",
      type: "string",
      initialValue: "CV",
      validation: (rule) => rule.required().max(24),
    }),
  ],
  preview: {
    select: { filename: "file.asset.originalFilename", visible: "isVisible" },
    prepare: ({ filename, visible }) => ({
      title: "CV",
      subtitle: `${filename ?? "No file uploaded"} · ${visible ? "Visible" : "Hidden"}`,
    }),
  },
});
