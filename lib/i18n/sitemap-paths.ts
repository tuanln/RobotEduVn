import { LOCALES, type Locale } from "./locales";
import { ROUTES, type RouteKey } from "./routes";
import { TRANSLATED_ROUTES } from "./translated";

export interface SitemapEntry {
  url: string;
  /**
   * Bản đối ứng ngôn ngữ — CHỈ có mặt khi route đã có bản dịch thật
   * (nằm trong TRANSLATED_ROUTES). Route chưa dịch không khai alternates,
   * vì khai một bản dịch không tồn tại là nói sai với Google.
   */
  alternates?: Record<Locale, string>;
}

function abs(baseUrl: string, path: string): string {
  return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

export function sitemapEntries(baseUrl: string): SitemapEntry[] {
  const keys = Object.keys(ROUTES) as RouteKey[];
  return keys.flatMap((key): SitemapEntry[] => {
    const viUrl = abs(baseUrl, ROUTES[key].vi);

    if (!TRANSLATED_ROUTES.has(key)) {
      return [{ url: viUrl }];
    }

    const enUrl = abs(baseUrl, ROUTES[key].en);
    const alternates: Record<Locale, string> = { vi: viUrl, en: enUrl };

    return LOCALES.map((locale) => ({
      url: locale === "en" ? enUrl : viUrl,
      alternates,
    }));
  });
}
