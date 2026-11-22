import { sanityFetch } from "./fetch";
import {
  EXPERIENCE_QUERY,
  PROFILE_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SITE_QUERY,
  SKILLS_QUERY,
} from "./queries";

/**
 * Data access for the public website. Each function is one cached, revalidating
 * request; pages call only the ones they need, in parallel.
 */

export async function getSite() {
  const site = await sanityFetch(SITE_QUERY);
  if (!site.settings || !site.profile) {
    throw new Error("Sanity content is missing: publish the Profile and Site settings documents in /manage.");
  }
  return { ...site, settings: site.settings, profile: site.profile };
}

export async function getProfile() {
  const profile = await sanityFetch(PROFILE_QUERY);
  if (!profile) {
    throw new Error("Sanity content is missing: publish the Profile document in /manage.");
  }
  return profile;
}

export const getProjects = () => sanityFetch(PROJECTS_QUERY);

export const getProject = (slug: string) => sanityFetch(PROJECT_QUERY, { slug });

export const getProjectSlugs = () => sanityFetch(PROJECT_SLUGS_QUERY);

export const getSkills = () => sanityFetch(SKILLS_QUERY);

export const getExperience = () => sanityFetch(EXPERIENCE_QUERY);
