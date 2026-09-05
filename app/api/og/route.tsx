import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { ogFonts } from "@/lib/og-fonts";

/** Ảnh thay thế khi một mục nội dung chưa có ảnh bìa riêng. */
export async function GET(request: Request) {
  const title =
    new URL(request.url).searchParams.get("title")?.slice(0, 120) || SITE.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0b1220 0%, #14233d 60%, #0f2f28 100%)",
          color: "white",
          fontFamily: "Be Vietnam Pro",
        }}
      >
        <div style={{ fontSize: 30, color: "#7dd3a8", fontWeight: 700 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 26, color: "#a7b6c9" }}>{SITE.tagline}</div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await ogFonts() }
  );
}
