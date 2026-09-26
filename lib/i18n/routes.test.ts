import { describe, expect, it } from "vitest";
import { LOCALES } from "./locales";
import {
  alternatePath,
  canonicalPathFromEn,
  pathFor,
  ROUTES,
  routeKeyFromPath,
} from "./routes";

describe("ROUTES", () => {
  it("có đủ 14 trang như spec 2.4", () => {
    expect(Object.keys(ROUTES)).toHaveLength(14);
  });

  it("mọi trang đều khai đủ hai ngôn ngữ, không rỗng", () => {
    for (const [key, paths] of Object.entries(ROUTES)) {
      for (const locale of LOCALES) {
        expect(paths[locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });

  it("đường dẫn tiếng Việt KHÔNG có tiền tố ngôn ngữ", () => {
    for (const paths of Object.values(ROUTES)) {
      expect(paths.vi.startsWith("/en")).toBe(false);
    }
  });

  it("mọi đường dẫn tiếng Anh đều bắt đầu bằng /en", () => {
    for (const paths of Object.values(ROUTES)) {
      expect(paths.en === "/en" || paths.en.startsWith("/en/")).toBe(true);
    }
  });

  it("không có đường dẫn trùng nhau", () => {
    const all = Object.values(ROUTES).flatMap((p) => [p.vi, p.en]);
    expect(new Set(all).size).toBe(all.length);
  });

  it("giữ nguyên 14 URL tiếng Việt đang chạy thật", () => {
    // Ràng buộc toàn cục: đổi một dòng ở đây là làm hỏng link đã chia sẻ.
    expect(Object.values(ROUTES).map((p) => p.vi).sort()).toEqual(
      [
        "/",
        "/cho-mentor",
        "/cong-cu",
        "/cong-dong",
        "/cong-dong/du-an",
        "/cong-dong/maker-hub",
        "/cong-dong/tap-chi",
        "/hanh-trinh",
        "/hanh-trinh/chia-se",
        "/hanh-trinh/choi",
        "/hanh-trinh/lam",
        "/lang-maker",
        "/triet-ly",
        "/video-hub",
      ].sort(),
    );
  });
});

describe("pathFor", () => {
  it("trả đúng đường dẫn theo ngôn ngữ", () => {
    expect(pathFor("makerVillage", "vi")).toBe("/lang-maker");
    expect(pathFor("makerVillage", "en")).toBe("/en/maker-village");
    expect(pathFor("home", "vi")).toBe("/");
    expect(pathFor("home", "en")).toBe("/en");
  });
});

describe("routeKeyFromPath", () => {
  it("nhận ra trang từ đường dẫn của cả hai ngôn ngữ", () => {
    expect(routeKeyFromPath("/lang-maker")).toBe("makerVillage");
    expect(routeKeyFromPath("/en/maker-village")).toBe("makerVillage");
    expect(routeKeyFromPath("/hanh-trinh/choi")).toBe("nhipPlay");
    expect(routeKeyFromPath("/en/how-we-learn/play")).toBe("nhipPlay");
  });

  it("bỏ qua dấu / thừa ở cuối", () => {
    expect(routeKeyFromPath("/lang-maker/")).toBe("makerVillage");
  });

  it("trả null cho đường dẫn lạ, không ném lỗi", () => {
    expect(routeKeyFromPath("/khong-ton-tai")).toBeNull();
    expect(routeKeyFromPath("")).toBeNull();
  });
});

describe("alternatePath", () => {
  it("chuyển sang đúng trang tương ứng, KHÔNG về trang chủ", () => {
    expect(alternatePath("/lang-maker", "en")).toBe("/en/maker-village");
    expect(alternatePath("/en/philosophy", "vi")).toBe("/triet-ly");
    expect(alternatePath("/hanh-trinh/chia-se", "en")).toBe(
      "/en/how-we-learn/share",
    );
  });

  it("trang không có bản đối ứng thì trả null, KHÔNG dẫn tới 404", () => {
    expect(alternatePath("/khong-ton-tai", "en")).toBeNull();
  });
});

describe("canonicalPathFromEn", () => {
  it("dịch slug tiếng Anh sang slug thư mục tiếng Việt", () => {
    expect(canonicalPathFromEn("/en/maker-village")).toBe("/lang-maker");
    expect(canonicalPathFromEn("/en")).toBe("/");
    expect(canonicalPathFromEn("/en/how-we-learn/make")).toBe("/hanh-trinh/lam");
  });

  it("đường dẫn tiếng Anh lạ thì trả null", () => {
    expect(canonicalPathFromEn("/en/nothing-here")).toBeNull();
  });
});
