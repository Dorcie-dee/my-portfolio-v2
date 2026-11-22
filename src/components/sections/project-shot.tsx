import Image from "next/image";
import type { ProjectSummary } from "@/lib/content";
import { projectTone } from "@/lib/project-tone";
import { urlFor } from "@/sanity/lib/image";

/**
 * A project's thumbnail filling its (relatively positioned) parent, with no device frame.
 * Cropped from the top, and from the left for desktop screenshots, so headings read from
 * their start. Renders nothing when the project has no thumbnail.
 */
export function ShotFill({
  project,
  sizes,
  className = "",
}: {
  project: Pick<ProjectSummary, "thumbnail">;
  sizes: string;
  className?: string;
}) {
  const thumbnail = project.thumbnail?.asset?.url ? project.thumbnail : null;
  if (!thumbnail) return null;
  const dimensions = thumbnail.asset?.metadata?.dimensions;
  const isPortrait = Boolean(dimensions?.width && dimensions.height && dimensions.height > dimensions.width);
  return (
    <Image
      src={urlFor(thumbnail).width(isPortrait ? 900 : 1800).url()}
      alt={thumbnail.alt ?? ""}
      fill
      sizes={sizes}
      className={`object-cover ${isPortrait ? "object-top" : "object-left-top"} ${className}`}
      {...(thumbnail.asset?.metadata?.lqip ? { placeholder: "blur" as const, blurDataURL: thumbnail.asset.metadata.lqip } : {})}
    />
  );
}

/** Decorative colour panel with large initials, for a project without a screenshot. */
export function InitialsFill({
  project,
  index,
  size = "text-6xl",
}: {
  project: Pick<ProjectSummary, "panelInitials">;
  index: number;
  size?: string;
}) {
  const tone = projectTone(index);
  return (
    <div aria-hidden="true" className={`absolute inset-0 flex items-center justify-center ${tone.panel} ${tone.text}`}>
      <span className="dot-pattern absolute top-4 right-4 size-20 opacity-30" />
      <span className={`relative font-display leading-none font-bold ${size}`}>{project.panelInitials}</span>
    </div>
  );
}
