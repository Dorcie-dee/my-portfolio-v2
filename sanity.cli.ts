/**
 * Sanity CLI configuration. Enables commands such as `npx sanity cors add`,
 * `npx sanity schema extract` and `npx sanity exec` from the project root.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
