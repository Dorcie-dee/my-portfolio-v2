import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { cache } from "react";
import { studioBasePath } from "../env";
import { client } from "./client";
import { readToken } from "./token";

/**
 * How often (in seconds) a page re-checks Sanity for published changes.
 * Edits published in /manage appear on the live site within about this long,
 * without a redeploy.
 */
export const REVALIDATE_SECONDS = 60;

/**
 * Fields whose values are used in code (comparisons, links, dates, settings) rather than
 * shown as text. Preview markers are never added to these, so logic keeps working.
 */
const UNMARKED_FIELDS = new Set([
  "_id",
  "_type",
  "_key",
  "current", // slug.current
  "slug",
  "platform",
  "status",
  "listing",
  "employmentType",
  "datePrecision",
  "startDate",
  "endDate",
  "isCurrent",
  "isVisible",
  "featured",
  "url",
  "liveUrl",
  "repoUrl",
  "contactEmail",
  "headlineHighlight",
  "stackIsPlanned",
  "isRepoPrivate",
]);

/**
 * Published content with time-based revalidation. Safe outside a request
 * (e.g. generateStaticParams), because it never checks draft mode.
 */
export async function publishedFetch<const QueryString extends string>(query: QueryString, params: QueryParams = {}) {
  return client.fetch(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}

/**
 * Fetches content for pages and metadata. Wrapped in React `cache()` so a page and its
 * metadata share one request.
 *
 * Normally returns published content (cached, no token). Only in draft mode, which the
 * Presentation tool in /manage switches on for signed-in project members, it reads drafts
 * with the server-only Viewer token, uncached, and adds invisible "stega" markers to text
 * so clicking it in the preview opens the matching field.
 */
export const sanityFetch = cache(async function sanityFetch<const QueryString extends string>(
  query: QueryString,
  params: QueryParams = {},
) {
  const { isEnabled } = await draftMode();
  if (!isEnabled || !readToken) return publishedFetch(query, params);

  return client.fetch(query, params, {
    perspective: "drafts",
    useCdn: false,
    token: readToken,
    cache: "no-store",
    stega: {
      enabled: true,
      studioUrl: studioBasePath,
      filter: (props) => {
        const field = props.sourcePath.at(-1);
        if (typeof field === "string" && UNMARKED_FIELDS.has(field)) return false;
        return props.filterDefault(props);
      },
    },
  });
});
