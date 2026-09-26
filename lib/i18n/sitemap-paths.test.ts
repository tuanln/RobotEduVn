import { describe, expect, it } from "vitest";
import { sitemapEntries } from "./sitemap-paths";
import { ROUTES, type RouteKey } from "./routes";
import { TRANSLATED_ROUTES } from "./translated";

const BASE = "https://robot.edu.vn";

const ALL_KEYS = Object.keys(ROUTES) as RouteKey[];
const TRANSLATED_KEYS = ALL_KEYS.filter((key) => TRANSLATED_ROUTES.has(key));
const UNTRANSLATED_KEYS = ALL_KEYS.filter((key) => !TRANSLATED_ROUTES.has(key));

/** Khớp đúng cách `sitemap-paths.ts` ghép URL: "/" không lặp thành "BASE/". */
function abs(path: string): string {
  return path === "/" ? BASE : `${BASE}${path}`;
}

describe("sitemapEntries", () => {
  it("liệt kê đủ route tiếng Việt + route đã dịch tiếng Anh (không hơn, không kém)", () => {
    const expectedLength = ALL_KEYS.length + TRANSLATED_KEYS.length;
    expect(sitemapEntries(BASE)).toHaveLength(expectedLength);
  });

  it("URL tuyệt đối, không có dấu / lặp", () => {
    for (const entry of sitemapEntries(BASE)) {
      expect(entry.url.startsWith(`${BASE}/`) || entry.url === BASE).toBe(true);
      expect(entry.url.slice(BASE.length)).not.toContain("//");
    }
  });

  it("có mặt trang chủ tiếng Việt", () => {
    const urls = sitemapEntries(BASE).map((e) => e.url);
    expect(urls).toContain(BASE);
  });

  it.each(TRANSLATED_KEYS)(
    "route đã dịch (%s): có đủ hai mục vi/en, alternates khớp đúng — không hoán đổi locale",
    (key) => {
      const entries = sitemapEntries(BASE);
      const viUrl = abs(ROUTES[key].vi);
      const enUrl = abs(ROUTES[key].en);

      const entryVi = entries.find((e) => e.url === viUrl);
      const entryEn = entries.find((e) => e.url === enUrl);

      expect(entryVi).toBeDefined();
      expect(entryEn).toBeDefined();

      // Mục vi: alternates.vi phải trỏ về CHÍNH mục vi, alternates.en phải
      // trỏ về mục en — bắt lỗi hoán đổi locale (gán nhầm alternates.vi
      // bằng URL tiếng Anh hoặc ngược lại).
      expect(entryVi!.alternates?.vi).toBe(entryVi!.url);
      expect(entryVi!.alternates?.en).toBe(entryEn!.url);

      // Mục en: alternates.vi phải trỏ về mục vi, alternates.en về chính nó.
      expect(entryEn!.alternates?.vi).toBe(entryVi!.url);
      expect(entryEn!.alternates?.en).toBe(entryEn!.url);
    },
  );

  it.each(UNTRANSLATED_KEYS)(
    "route CHƯA dịch (%s): chỉ có mục tiếng Việt, không có mục tiếng Anh, không có alternates",
    (key) => {
      const entries = sitemapEntries(BASE);
      const viUrl = abs(ROUTES[key].vi);
      const enUrl = abs(ROUTES[key].en);

      const entryVi = entries.find((e) => e.url === viUrl);
      const entryEn = entries.find((e) => e.url === enUrl);

      expect(entryVi).toBeDefined();
      expect(entryEn).toBeUndefined();
      expect(entryVi!.alternates).toBeUndefined();
    },
  );

  it("mọi khoá trong TRANSLATED_ROUTES phải là RouteKey hợp lệ trong ROUTES", () => {
    const validKeys = new Set<string>(ALL_KEYS);
    for (const key of TRANSLATED_ROUTES) {
      expect(validKeys.has(key)).toBe(true);
    }
  });
});
