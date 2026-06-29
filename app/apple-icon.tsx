import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAF7",
          color: "#1E8E68",
          fontSize: 120,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        &amp;
      </div>
    ),
    size,
  );
}
