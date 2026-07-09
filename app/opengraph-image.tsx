import { ImageResponse } from "next/og";
import { compassDataUri } from "./components/compass";
import { site } from "./site.config";

export const dynamic = "force-static";

export const alt = "Mint & Co — premium websites for businesses, Harrow";
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
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, color: "#10211B" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={compassDataUri} width={64} height={64} alt="" style={{ marginRight: 18 }} />
          <span>Mint</span>
          <span style={{ color: "#1E8E68", margin: "0 10px" }}>
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
            Look as good online as you do in person.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#566761" }}>
            {"Clear fixed-price packages, agreed before we start"}
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
