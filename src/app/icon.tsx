import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Colours mirror violet and white from globals.css.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6a2bc4",
          color: "#ffffff",
          borderRadius: 12,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        DNQ
      </div>
    ),
    size,
  );
}
