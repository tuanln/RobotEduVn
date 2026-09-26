import { describe, expect, it } from "vitest";
import { navItems } from "./nav";

describe("navItems", () => {
  it("có đủ chín mục ở cả hai ngôn ngữ", () => {
    expect(navItems("vi")).toHaveLength(9);
    expect(navItems("en")).toHaveLength(9);
  });

  it("giữ nguyên nhãn và đường dẫn tiếng Việt đang chạy", () => {
    const vi = navItems("vi");
    expect(vi[0]).toEqual({ label: "Trang Chủ", href: "/" });
    expect(vi[1]).toEqual({ label: "Cách Học", href: "/hanh-trinh" });
    expect(vi[2]).toEqual({ label: "Làng Maker", href: "/lang-maker" });
  });

  it("bản tiếng Anh dùng đường dẫn có tiền tố /en", () => {
    for (const item of navItems("en")) {
      expect(item.href === "/en" || item.href.startsWith("/en/")).toBe(true);
    }
  });

  it("giữ tên Làng Maker và Maker Hub nguyên tiếng Việt trong menu tiếng Anh", () => {
    const labels = navItems("en").map((i) => i.label);
    expect(labels).toContain("Làng Maker");
    expect(labels).toContain("Maker Hub");
  });

  it("không nhãn nào bỏ trống", () => {
    for (const locale of ["vi", "en"] as const) {
      for (const item of navItems(locale)) {
        expect(item.label.trim()).not.toBe("");
      }
    }
  });
});
