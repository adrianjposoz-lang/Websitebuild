import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: private lending for real estate investors`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/rsc-logo-reversed.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background: "linear-gradient(135deg, #182e48 0%, #0b1f3a 55%, #071422 100%)",
          color: "#ffffff",
        }}
      >
        <img src={logoSrc} width={300} height={298} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#c9a55c" }}>
            {site.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Private lending for real estate investors
          </div>
          <div style={{ marginTop: 32, width: 120, height: 6, background: "#cd2727" }} />
        </div>
      </div>
    ),
    size,
  );
}
