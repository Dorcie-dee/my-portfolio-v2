import { ImageResponse } from "next/og";
import { getProfile, getSite } from "@/sanity/lib/data";

// Inner pages set their own image alt text from Sanity; this one applies to the homepage.
export const alt = "Portfolio share card with name, professional title and headline";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours mirror the design tokens in globals.css (CSS variables are not available here).
const ivory = "#fffaf3";
const plum = "#2e1a47";
const violet = "#6a2bc4";
const marigold = "#f4b740";
const lilac = "#f3ecfb";
const muted = "#5e5470";

const stripe = `repeating-linear-gradient(90deg, ${plum} 0px, ${plum} 28px, ${violet} 28px, ${violet} 44px, ${marigold} 44px, ${marigold} 60px, ${lilac} 60px, ${lilac} 68px)`;

export default async function OpengraphImage() {
  const [site, profile] = await Promise.all([getSite(), getProfile()]);
  const name = profile.name ?? "";
  const title = profile.title ?? "";
  const availability = profile.availability?.isAvailable ? profile.availability.text : null;
  const monogram = site.profile.monogram;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: ivory, color: plum }}>
        <div style={{ display: "flex", height: 14, width: "100%", backgroundImage: stripe }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 72px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 16,
                background: violet,
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {monogram}
            </div>
            <div style={{ display: "flex", fontSize: 28, letterSpacing: 3, fontWeight: 700 }}>
              {name.toUpperCase()}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontSize: 26, color: violet, letterSpacing: 3, fontWeight: 700 }}>
              {title.toUpperCase()}
            </div>
            <div style={{ display: "flex", fontSize: 60, lineHeight: 1.1, fontWeight: 700, maxWidth: 1040 }}>
              {profile.headline}
            </div>
          </div>

          {availability ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: muted }}>
              <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: violet }} />
              {availability}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    size,
  );
}
