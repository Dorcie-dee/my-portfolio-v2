import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dorcas Nyamekye Quaye | Backend-Focused Software Engineer",
    template: "%s | Dorcas Nyamekye Quaye",
  },
  description:
    "Portfolio of Dorcas Nyamekye Quaye, a backend-focused software engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="surface-light flex min-h-full flex-col">{children}</body>
    </html>
  );
}
