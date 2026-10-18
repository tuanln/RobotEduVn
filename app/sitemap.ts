import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/i18n/sitemap-paths";
import { SITE } from "@/lib/site";
import { khoaHoc } from "@/lib/khoa-hoc/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // Thư viện khóa học: 48 trang chỉ tiếng Việt, không khai alternates.
  const khoaHocEntries = khoaHoc.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const trang = sitemapEntries(baseUrl).map((entry) => {
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

  return [...trang, ...khoaHocEntries.map((e) => ({ ...e, lastModified: new Date() }))];
}
