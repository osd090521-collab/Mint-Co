import { ImageResponse } from "next/og";
import { site } from "./site.config";

export const alt = "Mint & Co — websites for barbers and local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#10211B" }}>
          <span>Mint</span>
          <span style={{ color: "#1E8E68", fontStyle: "italic", margin: "0 10px" }}>
            &amp;
          </span>
          <span>Co</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              color: "#10211B",
              maxWidth: 920,
              letterSpacing: "-0.02em",
            }}
          >
            A website that makes your shop look as good as it actually is.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#566761" }}>
            {`Websites for barbers & local businesses · from ${site.priceFrom}, fixed`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#566761" }}>
          <div style={{ display: "flex", width: 56, height: 4, background: "#1E8E68", marginRight: 20 }} />
          <span>{`${site.domain} · ${site.location}`}</span>
        </div>
      </div>
    ),
    size,
  );
}
