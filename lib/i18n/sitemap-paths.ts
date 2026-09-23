import { LOCALES, type Locale } from "./locales";
import { ROUTES, type RouteKey } from "./routes";

export interface SitemapEntry {
  url: string;
  alternates: Record<Locale, string>;
}

function abs(baseUrl: string, path: string): string {
  return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

export function sitemapEntries(baseUrl: string): SitemapEntry[] {
  const keys = Object.keys(ROUTES) as RouteKey[];
  return keys.flatMap((key) =>
    LOCALES.map((locale) => ({
      url: abs(baseUrl, ROUTES[key][locale]),
      alternates: {
        vi: abs(baseUrl, ROUTES[key].vi),
        en: abs(baseUrl, ROUTES[key].en),
      },
    })),
  );
}
