import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { VIDEO_EN } from "./en";
import { VIDEO_VI } from "./vi";

describe("VIDEO", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(VIDEO_VI, VIDEO_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(VIDEO_VI)).toEqual([]);
    expect(emptyStringKeys(VIDEO_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(VIDEO_VI.timKiem).toBe("Tìm kiếm video...");
    expect(VIDEO_VI.tuoi).toBe("tuổi");
  });

  it("thật sự đã dịch", () => {
    expect(VIDEO_EN.phuDe).not.toBe(VIDEO_VI.phuDe);
    expect(VIDEO_EN.tuoi).not.toBe(VIDEO_VI.tuoi);
  });
});
