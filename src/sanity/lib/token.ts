import "server-only";

/**
 * Read-only (Viewer) token used only for previewing drafts in Sanity's Presentation tool.
 * Server-side only: never prefix it with NEXT_PUBLIC_ and never pass it to client components.
 * Optional: without it the site works normally and preview mode stays off.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || undefined;
