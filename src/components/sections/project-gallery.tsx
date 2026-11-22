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
          const width = 1600;
          const height = dimensions?.width && dimensions.height ? Math.round((width / dimensions.width) * dimensions.height) : 1000;
          return (
            <li key={image._key}>
              <figure className="overflow-hidden rounded-2xl border-2 border-outline bg-surface-raised">
                <Image
                  src={urlFor(image).width(width).url()}
                  alt={image.alt ?? `Screenshot of ${projectName}`}
                  width={width}
                  height={height}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="h-auto w-full"
                  {...(image.asset?.metadata?.lqip ? { placeholder: "blur" as const, blurDataURL: image.asset.metadata.lqip } : {})}
                />
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
