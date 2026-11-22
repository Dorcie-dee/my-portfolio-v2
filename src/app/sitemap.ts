import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getProjectSlugs } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const paths = ["/", "/about", "/projects", "/experience", "/contact"];
  const projectPaths = (await getProjectSlugs()).map((slug) => `/projects/${slug}`);

  return [...paths, ...projectPaths].map((path) => ({
    url: new URL(path, base).toString(),
  }));
}
