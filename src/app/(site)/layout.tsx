import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SiteShell } from "@/components/layout/site-shell";

/**
 * Layout for every public page. The Studio at /manage uses its own route group.
 * In draft mode (switched on by the Presentation tool in /manage) it adds click-to-edit
 * overlays and a small bar to leave preview mode.
 */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isPreview } = await draftMode();

  return (
    <>
      <SiteShell>{children}</SiteShell>
      {isPreview ? (
        <>
          <VisualEditing />
          <a
            href="/api/draft-mode/disable"
            className="fixed bottom-4 left-4 z-50 rounded-full border-2 border-plum bg-marigold px-4 py-2 text-sm font-bold text-plum shadow-stamp"
          >
            Preview mode · Exit
          </a>
        </>
      ) : null}
    </>
  );
}
