import { describe, expect, it } from "vitest";
import { sitemapEntries } from "./sitemap-paths";

const BASE = "https://robot.edu.vn";

describe("sitemapEntries", () => {
  it("liệt kê cả hai ngôn ngữ: 14 trang × 2", () => {
    expect(sitemapEntries(BASE)).toHaveLength(28);
  });

  it("mỗi mục khai đủ bản đối ứng của cả hai ngôn ngữ", () => {
    for (const entry of sitemapEntries(BASE)) {
      expect(entry.alternates.vi.startsWith(BASE)).toBe(true);
      expect(entry.alternates.en.startsWith(BASE)).toBe(true);
    }
  });

  it("URL tuyệt đối, không có dấu / lặp", () => {
    for (const entry of sitemapEntries(BASE)) {
      expect(entry.url.startsWith(`${BASE}/`) || entry.url === BASE).toBe(true);
      expect(entry.url.slice(BASE.length)).not.toContain("//");
    }
  });

  it("có mặt cả trang chủ tiếng Việt lẫn trang chủ tiếng Anh", () => {
    const urls = sitemapEntries(BASE).map((e) => e.url);
    expect(urls).toContain(BASE);
    expect(urls).toContain(`${BASE}/en`);
  });
});
