import Image from "next/image";
import type { ProjectSummary } from "@/lib/content";
import { projectTone } from "@/lib/project-tone";
import { urlFor } from "@/sanity/lib/image";

type VisualProject = Pick<ProjectSummary, "category" | "panelInitials" | "thumbnail"> & {
  featured?: boolean | null;
};

type ProjectVisualProps = {
  project: VisualProject;
  index: number;
  className?: string;
  /**
   * How a landscape screenshot sits in the panel: "clip" rises from the bottom edge (cut off
   * by the panel), "centre" shows the whole window centred. Defaults to centring on the tall
   * featured panel at desktop width only.
   */
  fit?: "clip" | "centre";
  /** Hide the "01 / Category" panel label when the surrounding layout already shows it. */
  showLabel?: boolean;
};

/**
 * The project's colour panel (numbered label, initials). When a thumbnail is uploaded in
 * Sanity, the screenshot is framed inside the panel at its true proportions, never cropped
 * to fit: a phone frame for portrait (mobile) screenshots, a browser window for landscape
 * ones. Without a thumbnail, the panel is purely decorative and hidden from assistive technology.
 */
export function ProjectVisual({ project, index, className = "", fit, showLabel = true }: ProjectVisualProps) {
  const thumbnail = project.thumbnail?.asset?.url ? project.thumbnail : null;
  const tone = projectTone(index);
  const number = String(index + 1).padStart(2, "0");

  if (thumbnail) {
    const dimensions = thumbnail.asset?.metadata?.dimensions;
    const ratio = dimensions?.width && dimensions.height ? dimensions.height / dimensions.width : 0.75;
    const isPortrait = ratio > 1;
    const width = isPortrait ? 640 : 1400;
    const blur = thumbnail.asset?.metadata?.lqip
      ? { placeholder: "blur" as const, blurDataURL: thumbnail.asset.metadata.lqip }
      : {};

    return (
      <div className={`relative overflow-hidden ${tone.panel} ${tone.text} ${className}`}>
        {showLabel ? (
          <span aria-hidden="true" className={`eyebrow absolute top-6 left-6 z-10 ${isPortrait ? "max-w-[44%]" : "max-w-[70%]"}`}>
            {number} / {project.category}
          </span>
        ) : null}

        {isPortrait ? (
          <>
            <span
              aria-hidden="true"
              className={`absolute bottom-6 left-6 z-10 font-display leading-[0.85] font-bold ${
                project.featured ? "text-7xl sm:text-8xl" : "text-5xl"
              }`}
            >
              {project.panelInitials}
            </span>
            {/* Phone frame rising from the bottom edge (the panel clips the lower part). On the
                tall featured panel at desktop width the whole phone fits, so it is shown complete. */}
            <div
              className={`absolute top-6 right-6 w-[38%] max-w-56 overflow-hidden rounded-t-[1.75rem] border-[5px] border-b-0 border-plum bg-plum shadow-[0_10px_30px_rgb(46_26_71/0.35)] ${
                project.featured ? "lg:top-1/2 lg:-translate-y-1/2 lg:rounded-b-[1.75rem] lg:border-b-[5px]" : ""
              }`}
            >
              <Image
                src={urlFor(thumbnail).width(width).url()}
                alt={thumbnail.alt ?? ""}
                width={width}
                height={Math.round(width * ratio)}
                sizes="(min-width: 1024px) 224px, 40vw"
                className={`h-auto w-full rounded-t-[1.4rem] ${project.featured ? "lg:rounded-b-[1.4rem]" : ""}`}
                {...blur}
              />
            </div>
          </>
        ) : (
          /* Browser window rising from the bottom edge (the panel clips the lower part). On the
             tall featured panel at desktop width the whole window fits, so it is centred and complete. */
          <div
            className={`absolute inset-x-6 top-16 overflow-hidden rounded-t-xl border-2 border-b-0 border-plum bg-white shadow-[0_10px_30px_rgb(46_26_71/0.35)] ${
              fit === "centre"
                ? "top-1/2! -translate-y-1/2 rounded-b-xl border-b-2!"
                : fit === undefined && project.featured
                  ? "lg:top-1/2 lg:-translate-y-1/2 lg:rounded-b-xl lg:border-b-2"
                  : ""
            }`}
          >
            <div aria-hidden="true" className="flex gap-1.5 border-b-2 border-plum bg-ivory px-3 py-2">
              <span className="size-2 rounded-full bg-plum/30" />
              <span className="size-2 rounded-full bg-plum/30" />
              <span className="size-2 rounded-full bg-plum/30" />
            </div>
            <Image
              src={urlFor(thumbnail).width(width).url()}
              alt={thumbnail.alt ?? ""}
              width={width}
              height={Math.round(width * ratio)}
              sizes={project.featured ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"}
              className="h-auto w-full"
              {...blur}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col justify-between overflow-hidden p-6 ${tone.panel} ${tone.text} ${className}`}
    >
      <span className="eyebrow relative z-10 max-w-[65%]">{showLabel ? `${number} / ${project.category}` : null}</span>
      <span className="dot-pattern absolute top-5 right-5 size-28 opacity-30" />
      <span
        className={`relative z-10 font-display leading-[0.85] font-bold ${
          project.featured ? "text-7xl sm:text-8xl" : "text-6xl"
        }`}
      >
        {project.panelInitials}
      </span>
    </div>
  );
}
