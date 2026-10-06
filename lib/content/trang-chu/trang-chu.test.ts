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

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(TRANG_CHU_VI.hero.moTa).toBe(
      "Ba nhịp lặp lại ở Làng Maker: chơi cho tò mò, bắt tay làm ra thứ chạy được, rồi kể lại cho người khác nghe.",
    );
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
