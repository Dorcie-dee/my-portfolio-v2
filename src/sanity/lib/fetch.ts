import type { QueryParams } from "next-sanity";
import { cache } from "react";
import { client } from "./client";

/**
 * How often (in seconds) a page re-checks Sanity for published changes.
 * Edits published in /manage appear on the live site within about this long,
 * without a redeploy.
 */
export const REVALIDATE_SECONDS = 60;

/**
 * Fetches published content on the server with time-based revalidation.
 * Wrapped in React `cache()` so a page and its metadata share one request.
 * Used only from Server Components; no secrets are involved (the dataset is public).
 */
export const sanityFetch = cache(async function sanityFetch<const QueryString extends string>(
  query: QueryString,
  params: QueryParams = {},
) {
  return client.fetch(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
});
