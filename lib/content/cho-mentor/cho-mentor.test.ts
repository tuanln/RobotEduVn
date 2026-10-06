import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { CHO_MENTOR_EN } from "./en";
import { CHO_MENTOR_VI } from "./vi";

describe("CHO_MENTOR", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(CHO_MENTOR_VI, CHO_MENTOR_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(CHO_MENTOR_VI)).toEqual([]);
    expect(emptyStringKeys(CHO_MENTOR_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(CHO_MENTOR_VI.buoc[0]).toBe(
      "Đăng ký tham gia cộng đồng Mentor qua email lang@makerviet.org",
    );
  });

  it("icon và đích liên kết giống hệt hai bản", () => {
    expect(CHO_MENTOR_EN.taiNguyen.map((r) => [r.icon, r.route])).toEqual(
      CHO_MENTOR_VI.taiNguyen.map((r) => [r.icon, r.route]),
    );
  });

  it("thật sự đã dịch", () => {
    expect(CHO_MENTOR_EN.buoc).not.toEqual(CHO_MENTOR_VI.buoc);
  });
});
