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

  it("slug tiếng Anh không có trong bảng thì ép sentinel 404 — mặc định từ chối", () => {
    // N-04: /en/* mặc định từ chối, không còn nhánh null cho slug lạ.
    expect(rewriteTarget("/en/nothing-here")).toBe("/en/__khong-ton-tai__");
  });

  it("slug tiếng Việt lọt qua nhánh /en bị chặn — ép đúng sentinel 404", () => {
    // Các route dưới [locale] mang tên thư mục tiếng Việt, nên nếu chỉ trả
    // null thì Next tự khớp "/en/lang-maker" vào đúng trang /lang-maker,
    // lọt ra URL trùng lặp nội dung (F-01). Phải ép về sentinel để 404.
    expect(rewriteTarget("/en/lang-maker")).toBe("/en/__khong-ton-tai__");
    expect(rewriteTarget("/en/triet-ly")).toBe("/en/__khong-ton-tai__");
    expect(rewriteTarget("/en/hanh-trinh/choi")).toBe("/en/__khong-ton-tai__");
  });

  it("route ĐỘNG chưa dịch dưới /en bị ép 404 — không lọt lưới như trước N-04", () => {
    // Trước N-04: canonicalPathFromEn trả null, routeKeyFromPath cũng trả
    // null (route động không nằm trong ROUTES tĩnh) → middleware trả null
    // → Next tự khớp /en/video-hub/<id> vào [locale]="en", lọt ra 200 với
    // nội dung tiếng Việt. Sau N-04, mặc định từ chối nên phải ép sentinel.
    expect(rewriteTarget("/en/video-hub/bai-viet-that")).toBe(
      "/en/__khong-ton-tai__"
    );
  });

  it("KHÔNG đụng vào khu quản trị", () => {
    expect(rewriteTarget("/dashboard")).toBeNull();
    expect(rewriteTarget("/dashboard/students")).toBeNull();
    expect(rewriteTarget("/dang-nhap")).toBeNull();
    // S-01: /admin đã dời ra ngoài cây [locale] (app/(admin)/admin) — gắn
    // /vi vào sẽ trỏ tới route không tồn tại và 404 oan.
    expect(rewriteTarget("/admin")).toBeNull();
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
