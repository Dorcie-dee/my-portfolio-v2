import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = ["/", "/about", "/projects", "/experience", "/contact"];
  const projectPaths = projects.map((project) => `/projects/${project.slug}`);

  return [...paths, ...projectPaths].map((path) => ({
    url: new URL(path, base).toString(),
  }));
}
