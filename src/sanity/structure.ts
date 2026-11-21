import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Briefcase, FileText, FolderKanban, Layers, Link2, Settings, UserRound } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation. Single documents open directly; lists support drag-and-drop
 * ordering, which controls the order on the website.
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Profile")
        .icon(UserRound)
        .child(S.document().schemaType("profile").documentId("profile").title("Profile")),
      S.listItem()
        .title("Site settings")
        .icon(Settings)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
      S.listItem()
        .title("CV")
        .icon(FileText)
        .child(S.document().schemaType("cv").documentId("cv").title("CV")),
      S.divider(),
      orderableDocumentListDeskItem({ type: "project", title: "Projects", icon: FolderKanban, S, context }),
      orderableDocumentListDeskItem({ type: "experience", title: "Experience", icon: Briefcase, S, context }),
      orderableDocumentListDeskItem({ type: "skillCategory", title: "Technical focus", icon: Layers, S, context }),
      orderableDocumentListDeskItem({ type: "socialLink", title: "Social links", icon: Link2, S, context }),
    ]);
