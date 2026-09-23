import { describe, expect, it } from "vitest";
import { rewriteTarget } from "./rewrite";

describe("rewriteTarget", () => {
  it("đường dẫn tiếng Việt được gắn tiền tố /vi trong nội bộ", () => {
    expect(rewriteTarget("/lang-maker")).toBe("/vi/lang-maker");
    expect(rewriteTarget("/")).toBe("/vi");
  });

  it("đường dẫn tiếng Anh được dịch slug rồi gắn /en", () => {
    expect(rewriteTarget("/en/maker-village")).toBe("/en/lang-maker");
    expect(rewriteTarget("/en")).toBe("/en");
    expect(rewriteTarget("/en/how-we-learn/make")).toBe("/en/hanh-trinh/lam");
  });

  it("slug tiếng Anh không có trong bảng thì trả null — để Next trả 404", () => {
    expect(rewriteTarget("/en/nothing-here")).toBeNull();
  });

  it("slug tiếng Việt lọt qua nhánh /en bị chặn — ép 404, không cho qua", () => {
    // Các route dưới [locale] mang tên thư mục tiếng Việt, nên nếu chỉ trả
    // null thì Next tự khớp "/en/lang-maker" vào đúng trang /lang-maker,
    // lọt ra URL trùng lặp nội dung (F-01). Phải khác null và khác đường
    // dẫn hợp lệ để middleware ép 404.
    const ketQuaLangMaker = rewriteTarget("/en/lang-maker");
    const ketQuaTrietLy = rewriteTarget("/en/triet-ly");
    const ketQuaHanhTrinhChoi = rewriteTarget("/en/hanh-trinh/choi");

    for (const ketQua of [ketQuaLangMaker, ketQuaTrietLy, ketQuaHanhTrinhChoi]) {
      expect(ketQua).not.toBeNull();
      expect(ketQua).not.toBe("/en/lang-maker");
      expect(ketQua).not.toBe("/en/triet-ly");
      expect(ketQua).not.toBe("/en/hanh-trinh/choi");
    }
  });

  it("KHÔNG đụng vào khu quản trị", () => {
    expect(rewriteTarget("/dashboard")).toBeNull();
    expect(rewriteTarget("/dashboard/students")).toBeNull();
    expect(rewriteTarget("/dang-nhap")).toBeNull();
  });

  it("KHÔNG đụng vào api và tài nguyên tĩnh", () => {
    expect(rewriteTarget("/api/gemini")).toBeNull();
    expect(rewriteTarget("/favicon.ico")).toBeNull();
    expect(rewriteTarget("/sitemap.xml")).toBeNull();
    expect(rewriteTarget("/robots.txt")).toBeNull();
  });

  it("KHÔNG đụng vào tệp có phần mở rộng, kể cả tên có băm", () => {
    // Ảnh OG do Next sinh ra mang tên băm kiểu /opengraph-image-a1b2c3.png.
    // Liệt kê tiền tố cố định là bắt không hết — phải bắt theo dấu chấm.
    expect(rewriteTarget("/opengraph-image-a1b2c3.png")).toBeNull();
    expect(rewriteTarget("/anh/hero.webp")).toBeNull();
    expect(rewriteTarget("/manifest.webmanifest")).toBeNull();
  });
});
