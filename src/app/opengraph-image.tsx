import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { shareImage } from "@/lib/seo";

export const alt = shareImage.alt;
export const size = { width: shareImage.width, height: shareImage.height };
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
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 68, lineHeight: 1.15 }}>
            Private lending for real estate investors
          </div>
          <div style={{ marginTop: 32, width: 120, height: 6, background: "#cd2727" }} />
        </div>
      </div>
    ),
    size,
  );
}
