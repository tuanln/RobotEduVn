import type { MetadataRoute } from "next";
import { NHIP } from "@/lib/content/nhip";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robot.edu.vn";

  const staticPages = [
    "",
    "/hanh-trinh",
    "/video-hub",
    "/cong-dong",
    "/cong-dong/du-an",
    "/cong-dong/tap-chi",
    "/cong-dong/maker-hub",
    "/triet-ly",
    "/lang-maker",
    "/cho-mentor",
    "/cong-cu",
  ];

  const stagePages = NHIP.map((s) => `/hanh-trinh/${s.slug}`);

  return [...staticPages, ...stagePages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
