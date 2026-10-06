import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { KHUNG_EN } from "./en";
import { KHUNG_VI } from "./vi";
import type { KhungContent } from "./types";

const ngoai = (k: KhungContent) =>
  k.footer.cot.flatMap((c) => c.links.map((l) => l.href ?? l.route));

describe("KHUNG", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(KHUNG_VI, KHUNG_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(KHUNG_VI)).toEqual([]);
    expect(emptyStringKeys(KHUNG_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(KHUNG_VI.skipLink).toBe("Bỏ qua menu, tới nội dung chính");
    expect(KHUNG_VI.footer.mucTieu).toBe(
      "Mục tiêu: 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot",
    );
  });

  it("thật sự đã dịch", () => {
    expect(KHUNG_EN.footer.gioiThieu).not.toBe(KHUNG_VI.footer.gioiThieu);
    expect(KHUNG_EN.chat.goiY).not.toEqual(KHUNG_VI.chat.goiY);
  });

  it("đích của link giống hệt nhau ở hai bản — địa chỉ không phải văn", () => {
    expect(ngoai(KHUNG_EN)).toEqual(ngoai(KHUNG_VI));
  });
});
