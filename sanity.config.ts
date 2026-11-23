"use client";

/**
 * Sanity Studio configuration, embedded in the Next.js app at /manage.
 * Access is controlled by Sanity: only members of the Sanity project can sign in and edit.
 */
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioBasePath } from "./src/sanity/env";
import { resolve } from "./src/sanity/presentation/resolve";
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Actions allowed on single documents: no duplicate or delete.
const singletonActions = new Set(["publish", "discardChanges", "restore", "unpublish"]);

export default defineConfig({
  name: "portfolio",
  title: "Portfolio management",
  basePath: studioBasePath,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Live preview of the website with click-to-edit. Draft mode is switched on through
    // /api/draft-mode/enable, which only accepts a secret created by this Studio.
    presentationTool({
      title: "Preview",
      resolve,
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    // Hide single documents from the global "Create new" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});
