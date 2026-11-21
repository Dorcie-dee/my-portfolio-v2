/**
 * Embedded Sanity Studio at /manage.
 *
 * Access is controlled by Sanity, not by this route: anyone can load the Studio shell,
 * but only members of the Sanity project can sign in, read drafts or change content.
 * The shell is static; all data loads in the browser after sign-in.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export const dynamic = "force-static";

// Includes robots: noindex and a viewport suited to the Studio.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
