import { describe, expect, it } from "vitest";
import { navItems } from "./nav";

describe("navItems", () => {
  it("tiếng Việt năm mục, tiếng Anh ba mục (Sân Chơi, Khóa Học chỉ có bản Việt)", () => {
    expect(navItems("vi")).toHaveLength(5);
    expect(navItems("en")).toHaveLength(3);
  });

  it("thứ tự menu tiếng Việt theo spec sổ tay số", () => {
    expect(navItems("vi")).toEqual([
      { label: "Hành Trình", href: "/hanh-trinh" },
      { label: "Sân Chơi", href: "/san-choi" },
      { label: "Khóa Học", href: "/khoa-hoc" },
      { label: "Làng Maker", href: "/lang-maker" },
      { label: "Mô Phỏng", href: "/mo-phong" },
    ]);
  });

  it("menu tiếng Anh không dẫn tới trang chỉ có bản Việt", () => {
    const hrefs = navItems("en").map((i) => i.href);
    for (const cam of ["/khoa-hoc", "/en/khoa-hoc", "/san-choi", "/en/san-choi"]) {
      expect(hrefs).not.toContain(cam);
    }
  });

  it("bản tiếng Anh dùng đường dẫn có tiền tố /en, trừ app mô phỏng dùng chung", () => {
    for (const item of navItems("en")) {
      expect(
        item.href === "/mo-phong" || item.href === "/en" || item.href.startsWith("/en/"),
      ).toBe(true);
    }
  });

  it("giữ tên Làng Maker nguyên tiếng Việt trong menu tiếng Anh", () => {
    expect(navItems("en").map((i) => i.label)).toContain("Làng Maker");
  });

  it("không nhãn nào bỏ trống", () => {
    for (const locale of ["vi", "en"] as const) {
      for (const item of navItems(locale)) {
        expect(item.label.trim()).not.toBe("");
      }
    }
  });
});
