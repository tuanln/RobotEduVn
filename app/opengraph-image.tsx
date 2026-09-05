import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { ogFonts } from "@/lib/og-fonts";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1220 0%, #14233d 55%, #0f2f28 100%)",
          color: "white",
          fontFamily: "Be Vietnam Pro",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "#04140c",
            }}
          >
            R
          </div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>{SITE.name}</div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Học đi đôi với Làm
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#a7b6c9", maxWidth: 950 }}>
          Lộ trình STEM &amp; Robot 5 giai đoạn cho trẻ em Việt Nam, từ 4 đến 18 tuổi
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 16, fontSize: 26, color: "#7dd3a8" }}>
          <span>Khám Phá</span><span>→</span>
          <span>Tư Duy</span><span>→</span>
          <span>Lập Trình</span><span>→</span>
          <span>IoT &amp; Robot</span><span>→</span>
          <span>Chia Sẻ</span>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
