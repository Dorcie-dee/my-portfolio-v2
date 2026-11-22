export type NavItem = {
  label: string;
  href: string;
};

/** Site routes. These mirror the page files in src/app/(site), so they live in code, not in Sanity. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

/** Whether a nav item should show as the current page. "/" only matches exactly. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
