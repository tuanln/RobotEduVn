import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { DOC_PAPERT_EN } from "./en";
import { DOC_PAPERT_VI } from "./vi";

describe("DOC_PAPERT_VI", () => {
  it("giữ nguyên tiêu đề và tên sách đang chạy thật", () => {
    expect(DOC_PAPERT_VI.heading).toBe("Đọc Papert");
    expect(DOC_PAPERT_VI.bookTitle).toBe(
      "Mindstorms — Children, Computers, and Powerful Ideas",
    );
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(DOC_PAPERT_VI)).toEqual([]);
  });
});

describe("DOC_PAPERT_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(DOC_PAPERT_VI, DOC_PAPERT_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(DOC_PAPERT_EN)).toEqual([]);
  });

  it("thật sự đã dịch, không chép lại bản tiếng Việt", () => {
    expect(DOC_PAPERT_EN.heading).not.toBe(DOC_PAPERT_VI.heading);
    expect(DOC_PAPERT_EN.introPrefix).not.toBe(DOC_PAPERT_VI.introPrefix);
    expect(DOC_PAPERT_EN.communityBold).not.toBe(DOC_PAPERT_VI.communityBold);
    expect(DOC_PAPERT_EN.notifyLinkText).not.toBe(DOC_PAPERT_VI.notifyLinkText);
  });

  it("ba URL và địa chỉ mailto giống hệt nhau ở cả hai bản — đây là địa chỉ, không phải văn", () => {
    expect(DOC_PAPERT_EN.links).toEqual(DOC_PAPERT_VI.links);
  });
});
