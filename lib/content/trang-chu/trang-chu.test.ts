import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { TRANG_CHU_EN } from "./en";
import { TRANG_CHU_VI } from "./vi";

describe("TRANG_CHU", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(TRANG_CHU_VI, TRANG_CHU_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(TRANG_CHU_VI)).toEqual([]);
    expect(emptyStringKeys(TRANG_CHU_EN)).toEqual([]);
  });

  it("câu mở sổ tay số: robot là vật để nghĩ", () => {
    expect(TRANG_CHU_VI.hero.tieuDe.join(" ")).toBe("Robot là vật để nghĩ cùng");
    expect(TRANG_CHU_VI.hero.papert).toContain("Seymour Papert");
  });

  it("bốn hoạt động AI có thật, gắn chặng", () => {
    for (const t of [TRANG_CHU_VI, TRANG_CHU_EN]) {
      expect(t.baMang.vong).toHaveLength(3);
      expect(t.baMang.hoatDongAI.ds).toHaveLength(4);
      for (const hd of t.baMang.hoatDongAI.ds) expect(hd.chang).toMatch(/\d/);
    }
  });

  it("khối FanRoc: bản vi dẫn tới Sân chơi, bản en không dẫn tới trang chỉ có bản Việt", () => {
    expect(TRANG_CHU_VI.fanroc.href).toBe("/san-choi#fanroc");
    expect(TRANG_CHU_EN.fanroc.href.startsWith("/en/")).toBe(true);
  });

  it("thật sự đã dịch", () => {
    expect(TRANG_CHU_EN.hero.moTa).not.toBe(TRANG_CHU_VI.hero.moTa);
    expect(TRANG_CHU_EN.cta.tieuDe).not.toBe(TRANG_CHU_VI.cta.tieuDe);
  });

  it("en giữ Làng Maker và chú giải lần đầu", () => {
    expect(TRANG_CHU_EN.hero.moTa).toContain("Làng Maker (the Maker Village)");
  });

  it("tên đối tác giống hệt hai bản — tên riêng", () => {
    expect(TRANG_CHU_EN.doiTac.ds.map((d) => d.name)).toEqual(
      TRANG_CHU_VI.doiTac.ds.map((d) => d.name),
    );
  });
});
