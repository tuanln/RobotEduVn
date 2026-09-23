import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/i18n/sitemap-paths";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  return sitemapEntries(baseUrl).map((entry) => {
    const { alternates } = entry;
    return {
      url: entry.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: entry.url === baseUrl ? 1 : 0.8,
      // Chỉ khai alternates khi route đã có bản dịch thật (sitemap-paths.ts).
      ...(alternates && {
        alternates: {
          languages: {
            vi: alternates.vi,
            en: alternates.en,
            "x-default": alternates.vi,
          },
        },
      }),
    };
  });
}
