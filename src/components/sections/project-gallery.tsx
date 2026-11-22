import Image from "next/image";
import type { ProjectDetail } from "@/lib/content";
import { urlFor } from "@/sanity/lib/image";

type ProjectGalleryProps = {
  projectName: string;
  images: ProjectDetail["gallery"];
};

/** Project screenshots, in the order set in the Studio. Shown only when screenshots exist. */
export function ProjectGallery({ projectName, images }: ProjectGalleryProps) {
  const screenshots = (images ?? []).filter((image) => image.asset?.url);
  if (!screenshots.length) return null;

  return (
    <section aria-labelledby="gallery-heading" className="mt-14">
      <h2 id="gallery-heading" className="text-2xl text-plum">
        Screenshots
      </h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {screenshots.map((image) => {
          const dimensions = image.asset?.metadata?.dimensions;
          const ratio = dimensions?.width && dimensions.height ? dimensions.height / dimensions.width : 0.625;
          // Phone (portrait) screenshots are shown at a limited width on a soft panel,
          // so a tall image cannot stretch the page.
          const isPortrait = ratio > 1;
          const width = isPortrait ? 720 : 1600;
          return (
            <li key={image._key}>
              <figure className="overflow-hidden rounded-2xl border-2 border-outline bg-surface-raised">
                <div className={isPortrait ? "bg-lilac px-6 py-8" : undefined}>
                <Image
                  src={urlFor(image).width(width).url()}
                  alt={image.alt ?? `Screenshot of ${projectName}`}
                  width={width}
                  height={Math.round(width * ratio)}
                  sizes={isPortrait ? "288px" : "(min-width: 768px) 45vw, 100vw"}
                  className={isPortrait ? "mx-auto h-auto w-full max-w-72 rounded-[1.25rem] border-4 border-plum" : "h-auto w-full"}
                  {...(image.asset?.metadata?.lqip ? { placeholder: "blur" as const, blurDataURL: image.asset.metadata.lqip } : {})}
                />
                </div>
                {image.caption ? (
                  <figcaption className="border-t border-line px-4 py-3 text-sm text-fg-muted">{image.caption}</figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
