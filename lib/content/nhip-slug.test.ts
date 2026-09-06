import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NHIP_SLUGS, normalizeNhipSlug } from "./nhip-slug";

describe("NHIP_SLUGS", () => {
  it("có đúng ba nhịp, đúng thứ tự vòng lặp", () => {
    expect(NHIP_SLUGS).toEqual(["choi", "lam", "chia-se"]);
  });
});

describe("normalizeNhipSlug", () => {
  it("giữ nguyên slug mới", () => {
    expect(normalizeNhipSlug("choi")).toBe("choi");
    expect(normalizeNhipSlug("lam")).toBe("lam");
    expect(normalizeNhipSlug("chia-se")).toBe("chia-se");
  });

  it("dịch 5 giai đoạn cũ sang nhịp tương ứng", () => {
    expect(normalizeNhipSlug("kham-pha")).toBe("choi");
    expect(normalizeNhipSlug("tu-duy")).toBe("lam");
    expect(normalizeNhipSlug("lap-trinh")).toBe("lam");
    expect(normalizeNhipSlug("iot-robot")).toBe("lam");
    expect(normalizeNhipSlug("chia-se")).toBe("chia-se");
  });

  it("giá trị lạ hoặc rỗng thì về nhịp đầu tiên, không ném lỗi", () => {
    expect(normalizeNhipSlug("khong-ton-tai")).toBe("choi");
    expect(normalizeNhipSlug("")).toBe("choi");
    expect(normalizeNhipSlug(undefined)).toBe("choi");
    expect(normalizeNhipSlug(null)).toBe("choi");
  });

  it("không phân biệt hoa thường và khoảng trắng thừa từ Google Sheet", () => {
    expect(normalizeNhipSlug(" IoT-Robot ")).toBe("lam");
    expect(normalizeNhipSlug("Chia-Se")).toBe("chia-se");
  });
});

/**
 * SLUG_CU (bản đồ 5 slug cũ → nhịp mới, trong file này) và các redirect trong
 * next.config.ts là hai bản chép tay riêng biệt, không có ràng buộc kiểu nào
 * ép chúng khớp nhau. Test này đọc next.config.ts trực tiếp bằng node:fs và
 * khẳng định mỗi redirect /hanh-trinh/<slug-cu> → /hanh-trinh/<slug-moi> khớp
 * với normalizeNhipSlug(slug-cu). Nếu ai sửa một bên mà quên bên kia, test
 * này phải đỏ — SỬA XONG PHẢI SỬA CẢ HAI FILE CÙNG LÚC.
 */
describe("next.config.ts redirect khớp với normalizeNhipSlug", () => {
  it("mỗi redirect /hanh-trinh/<slug-cu> trỏ đúng nhịp mà normalizeNhipSlug trả về", () => {
    const configPath = join(__dirname, "..", "..", "next.config.ts");
    const configSource = readFileSync(configPath, "utf-8");

    const redirectRegex =
      /source:\s*"\/hanh-trinh\/([a-z-]+)",\s*destination:\s*"\/hanh-trinh\/([a-z-]+)"/g;
    const redirects = [...configSource.matchAll(redirectRegex)].map((m) => ({
      slugCu: m[1],
      slugMoi: m[2],
    }));

    // Phải tìm thấy ít nhất các redirect đã biết — nếu regex không khớp gì cả
    // (vd. next.config.ts đổi định dạng) thì test này im lặng bỏ qua là sai.
    expect(redirects.length).toBeGreaterThanOrEqual(4);

    for (const { slugCu, slugMoi } of redirects) {
      expect(
        normalizeNhipSlug(slugCu),
        `redirect "${slugCu}" → "${slugMoi}" trong next.config.ts không khớp normalizeNhipSlug("${slugCu}") = "${normalizeNhipSlug(slugCu)}"`
      ).toBe(slugMoi);
    }
  });
});
