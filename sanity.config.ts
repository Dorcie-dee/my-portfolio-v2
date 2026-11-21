"use client";

/**
 * Sanity Studio configuration, embedded in the Next.js app at /manage.
 * Access is controlled by Sanity: only members of the Sanity project can sign in and edit.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioBasePath } from "./src/sanity/env";
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
  plugins: [structureTool({ structure })],
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
