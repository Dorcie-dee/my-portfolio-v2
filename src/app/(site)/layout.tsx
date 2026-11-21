import { SiteShell } from "@/components/layout/site-shell";

/** Layout for every public page. The Studio at /manage uses its own route group. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
