import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { CONG_CU_EN } from "./en";
import { CONG_CU_VI } from "./vi";

describe("CONG_CU", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(CONG_CU_VI, CONG_CU_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(CONG_CU_VI)).toEqual([]);
    expect(emptyStringKeys(CONG_CU_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(CONG_CU_VI.tieuDe).toBe("Công Cụ & Thiết Bị");
    expect(CONG_CU_VI.tools).toHaveLength(7);
  });

  it("tên công cụ và nhịp giống hệt hai bản — tên riêng, không phải văn", () => {
    expect(CONG_CU_EN.tools.map((t) => [t.name, t.nhip])).toEqual(
      CONG_CU_VI.tools.map((t) => [t.name, t.nhip]),
    );
  });

  it("thật sự đã dịch", () => {
    expect(CONG_CU_EN.tools[0].desc).not.toBe(CONG_CU_VI.tools[0].desc);
    expect(CONG_CU_EN.phuDe).not.toBe(CONG_CU_VI.phuDe);
  });
});
