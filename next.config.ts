import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only images from this project's Sanity dataset can be optimised by next/image.
    remotePatterns: [
      new URL(
        `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
      ),
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
