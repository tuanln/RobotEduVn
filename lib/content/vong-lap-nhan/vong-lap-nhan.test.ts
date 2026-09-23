import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { VONG_LAP_NHAN_EN } from "./en";
import { VONG_LAP_NHAN_VI } from "./vi";

describe("VONG_LAP_NHAN_VI", () => {
  it("giữ nguyên câu tiếng Việt đang chạy thật", () => {
    expect(VONG_LAP_NHAN_VI.quayLai).toBe(
      "Chia sẻ xong thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn",
    );
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(VONG_LAP_NHAN_VI)).toEqual([]);
  });
});

describe("VONG_LAP_NHAN_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(VONG_LAP_NHAN_VI, VONG_LAP_NHAN_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(VONG_LAP_NHAN_EN)).toEqual([]);
  });

  it("thật sự đã dịch, không chép lại bản tiếng Việt", () => {
    expect(VONG_LAP_NHAN_EN.quayLai).not.toBe(VONG_LAP_NHAN_VI.quayLai);
  });
});
