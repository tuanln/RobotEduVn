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
