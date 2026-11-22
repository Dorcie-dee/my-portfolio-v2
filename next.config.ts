import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only images from this project's Sanity dataset can be optimised by next/image.
    // Object form (no `search` key) so Sanity's resize parameters (?w=…&h=…) are allowed;
    // a `new URL(...)` pattern would require an empty query string and reject every image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
