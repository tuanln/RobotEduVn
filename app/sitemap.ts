import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/i18n/sitemap-paths";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  return sitemapEntries(baseUrl).map((entry) => ({
    url: entry.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: entry.url === baseUrl ? 1 : 0.8,
    alternates: {
      languages: {
        vi: entry.alternates.vi,
        en: entry.alternates.en,
        "x-default": entry.alternates.vi,
      },
    },
  }));
}
