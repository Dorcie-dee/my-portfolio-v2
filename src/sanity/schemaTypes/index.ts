import type { SchemaTypeDefinition } from "sanity";
import { cv } from "./documents/cv";
import { experience } from "./documents/experience";
import { profile } from "./documents/profile";
import { project } from "./documents/project";
import { siteSettings } from "./documents/site-settings";
import { skillCategory } from "./documents/skill-category";
import { socialLink } from "./documents/social-link";
import {
  accessibleImage,
  focusArea,
  labelledLink,
  labelValue,
  paragraphs,
  seoFields,
  simpleRichText,
} from "./objects/shared";

/** Document types that exist exactly once (edited in place, never created or deleted). */
export const singletonTypes = new Set(["profile", "siteSettings", "cv"]);

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  profile,
  siteSettings,
  cv,
  socialLink,
  project,
  experience,
  skillCategory,
  // Shared objects
  accessibleImage,
  labelledLink,
  labelValue,
  focusArea,
  seoFields,
  paragraphs,
  simpleRichText,
];
