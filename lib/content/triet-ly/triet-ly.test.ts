import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { TRIET_LY_EN } from "./en";
import { TRIET_LY_VI } from "./vi";

describe("TRIET_LY_VI", () => {
  it("có đúng ba trụ cột", () => {
    expect(TRIET_LY_VI.truCot).toHaveLength(3);
  });

  it("có đúng sáu nguyên lý", () => {
    expect(TRIET_LY_VI.nguyenLy).toHaveLength(6);
  });

  it("ba nguyên lý đầu lấy từ nhịp Làm, không chép tay", () => {
    // Chép tay thì hai bản sẽ trôi khỏi nhau. Nguồn sự thật là nhip.ts.
    expect(TRIET_LY_VI.nguyenLy[0].title).toBe("Chạm trước, ký hiệu sau");
    expect(TRIET_LY_VI.nguyenLy[1].title).toBe("Khó mà vui");
    expect(TRIET_LY_VI.nguyenLy[2].title).toBe("Lỗi là thông tin");
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(TRIET_LY_VI)).toEqual([]);
  });

  it("giữ nguyên tiêu đề ba trụ cột đang chạy thật", () => {
    expect(TRIET_LY_VI.truCot.map((t) => t.title)).toEqual([
      'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
      "Triết Lý Kiến Tạo — Seymour Papert",
      "Tinh Thần Coopertition — FIRST Robotics",
    ]);
  });
});

describe("TRIET_LY_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(TRIET_LY_VI, TRIET_LY_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(TRIET_LY_EN)).toEqual([]);
  });

  it("có đủ ba trụ cột và sáu nguyên lý như bản tiếng Việt", () => {
    expect(TRIET_LY_EN.truCot).toHaveLength(TRIET_LY_VI.truCot.length);
    expect(TRIET_LY_EN.nguyenLy).toHaveLength(TRIET_LY_VI.nguyenLy.length);
  });

  it("giữ tên Làng Maker nguyên tiếng Việt, không dịch thành Maker Village", () => {
    const all = JSON.stringify(TRIET_LY_EN);
    expect(all).toContain("Làng Maker");
  });

  it("giữ nguyên icon của bản tiếng Việt — icon không phải chữ để dịch", () => {
    expect(TRIET_LY_EN.truCot.map((t) => t.icon)).toEqual(
      TRIET_LY_VI.truCot.map((t) => t.icon),
    );
  });

  it("thật sự đã dịch, không phải chép lại bản tiếng Việt", () => {
    expect(TRIET_LY_EN.header.subtitle).not.toBe(TRIET_LY_VI.header.subtitle);
    expect(TRIET_LY_EN.nguyenLyHeading).not.toBe(TRIET_LY_VI.nguyenLyHeading);
  });
});
