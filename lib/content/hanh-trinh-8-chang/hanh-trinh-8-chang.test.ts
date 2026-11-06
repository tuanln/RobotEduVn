import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { HANH_TRINH_EN } from "./en";
import { HANH_TRINH_VI } from "./vi";
import type { HanhTrinhContent } from "./types";

const MA_ANH = /^[A-Z]\d?$/;
const BAN = { vi: HANH_TRINH_VI, en: HANH_TRINH_EN } as const;

function maAnh(t: HanhTrinhContent): string[] {
  return [...t.giaiDoan.map((g) => g.anh), ...t.chuyenThat.ds.flatMap((c) => c.anh)];
}

describe("HANH_TRINH", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(HANH_TRINH_VI, HANH_TRINH_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(HANH_TRINH_VI)).toEqual([]);
    expect(emptyStringKeys(HANH_TRINH_EN)).toEqual([]);
  });

  it("bốn giai đoạn cây tre, tám chặng, năm nguyên tắc, hai chuyện thật", () => {
    for (const t of Object.values(BAN)) {
      expect(t.giaiDoan.map((g) => g.ma)).toEqual([
        "gieo-hat",
        "vuon-canh",
        "ket-trai",
        "rung-ve-coi",
      ]);
      expect(t.chang.map((c) => c.so)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(t.viSao.nguyenTac).toHaveLength(5);
      expect(t.chuyenThat.ds).toHaveLength(2);
    }
  });

  it("mỗi giai đoạn có đúng hai chặng, theo thứ tự slide", () => {
    for (const t of Object.values(BAN)) {
      const theoGiaiDoan = t.giaiDoan.map((g) =>
        t.chang.filter((c) => c.giaiDoan === g.ma).map((c) => c.so),
      );
      expect(theoGiaiDoan).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);
    }
  });

  it("chuyện thật bắt buộc có nguồn; mã ảnh đúng dạng", () => {
    for (const t of Object.values(BAN)) {
      for (const c of t.chuyenThat.ds) expect(c.nguon.trim()).not.toBe("");
      for (const ma of maAnh(t)) expect(ma).toMatch(MA_ANH);
    }
  });

  it("mã ảnh, mã chuyện, đường dẫn nút giống hệt hai bản — không phải văn để dịch", () => {
    expect(maAnh(HANH_TRINH_EN)).toEqual(maAnh(HANH_TRINH_VI));
    expect(HANH_TRINH_EN.chuyenThat.ds.map((c) => c.ma)).toEqual(
      HANH_TRINH_VI.chuyenThat.ds.map((c) => c.ma),
    );
    expect(HANH_TRINH_EN.giaiDoan.map((g) => g.link.href)).toEqual(
      HANH_TRINH_VI.giaiDoan.map((g) => g.link.href),
    );
  });

  it("dòng 'con lớn lên thế nào' đứng trước đồ nghề trong từng giai đoạn", () => {
    for (const t of Object.values(BAN)) {
      for (const g of t.giaiDoan) {
        const keys = Object.keys(g);
        expect(keys.indexOf("lonLen")).toBeLessThan(keys.indexOf("doNghe"));
      }
    }
  });

  it("thật sự đã dịch", () => {
    expect(HANH_TRINH_EN.phuDe).not.toBe(HANH_TRINH_VI.phuDe);
    expect(HANH_TRINH_EN.viSao.moTa).not.toBe(HANH_TRINH_VI.viSao.moTa);
  });
});
