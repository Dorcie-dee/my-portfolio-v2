import { Geist, Geist_Mono } from "next/font/google";

// Fonts are downloaded at build time and self-hosted by next/font.
// The CSS variables are mapped to Tailwind's font-sans / font-mono in globals.css.

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
