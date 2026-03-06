import type { MetadataRoute } from "next";
import { STAGES } from "@/lib/data";

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
    "/gioi-thieu",
    "/cho-mentor",
    "/cong-cu",
  ];

  const stagePages = STAGES.map((s) => `/hanh-trinh/${s.slug}`);

  return [...staticPages, ...stagePages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
