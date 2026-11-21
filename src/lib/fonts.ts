import { Nunito_Sans, Play } from "next/font/google";

// Fonts are downloaded at build time and self-hosted by next/font.
// The CSS variables are mapped to Tailwind's font-sans / font-display in globals.css.

/** Body and UI text: clean, warm and highly readable (Verdana-like proportions). */
export const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Headings and labels: friendly, squarish letterforms (carried over from Flawless Wears).
 * Only the bold weight is used on the site, so only 700 is loaded (avoids an extra preloaded font).
 */
export const play = Play({
  variable: "--font-play",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});
