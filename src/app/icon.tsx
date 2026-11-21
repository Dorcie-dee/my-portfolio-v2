import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Colours mirror navy-950 and accent-lime from globals.css.
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
          background: "#0b1220",
          color: "#b5e655",
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
