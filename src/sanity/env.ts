// Sanity connection settings. None of these values are secret: the project ID and
// dataset are public by design and are inlined into browser code for the Studio.
// Never add write or read tokens here, and never prefix a token with NEXT_PUBLIC_.

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID (see .env.example)",
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET (see .env.example)",
);

/** Route where the embedded Studio is mounted. Must match the app route. */
export const studioBasePath = "/manage";

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined || value === "") {
    throw new Error(errorMessage);
  }
  return value;
}
