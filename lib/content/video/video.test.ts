import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { VIDEO_EN } from "./en";
import { VIDEO_VI } from "./vi";
import { nhanTuoi } from "./index";

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
    expect(nhanTuoi(VIDEO_VI.tuoi, "10-15", "vi")).toBe("10-15 tuổi");
  });

  it("thật sự đã dịch", () => {
    expect(VIDEO_EN.phuDe).not.toBe(VIDEO_VI.phuDe);
    expect(VIDEO_EN.tuoi).not.toBe(VIDEO_VI.tuoi);
  });

  it("bản en ghi Ages kèm gạch nối en dash", () => {
    expect(nhanTuoi(VIDEO_EN.tuoi, "10-15", "en")).toBe("Ages 10–15");
  });
});
