import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Builds a Sanity CDN URL for an image, respecting the crop and hotspot set in the Studio.
 * Usage: urlFor(image).width(1200).height(800).fit("crop").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
