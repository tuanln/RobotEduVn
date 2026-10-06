import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { NHIP } from "@/lib/content/nhip";
import { TRIET_LY_EN } from "@/lib/content/triet-ly/en";
import { CACH_HOC_EN } from "./en";
import { CACH_HOC_VI } from "./vi";

describe("CACH_HOC", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(CACH_HOC_VI, CACH_HOC_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(CACH_HOC_VI)).toEqual([]);
    expect(emptyStringKeys(CACH_HOC_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(CACH_HOC_VI.tieuDe).toBe("Cách Học Ở Làng Maker");
    expect(CACH_HOC_VI.nhan.nhipTiepTheo).toBe("Nhịp tiếp theo:");
  });

  it("vi dựng từ NHIP, không chép tay", () => {
    for (const n of NHIP) {
      expect(CACH_HOC_VI.nhip[n.slug].moTaDai).toBe(n.moTaDai);
      expect(CACH_HOC_VI.nhip[n.slug].taiLangMaker).toBe(n.taiLangMaker);
    }
  });

  it("số hướng làm và nguyên tắc khớp NHIP", () => {
    for (const n of NHIP) {
      expect(CACH_HOC_EN.nhip[n.slug].huong?.length).toBe(n.huong?.length);
      expect(CACH_HOC_EN.nhip[n.slug].nguyenTac?.length).toBe(
        n.nguyenTac?.length,
      );
    }
  });

  it("ba nguyên tắc nhịp Làm khớp ba nguyên lý đầu của Triết Lý bản en", () => {
    expect(CACH_HOC_EN.nhip.lam.nguyenTac?.map((x) => x.title)).toEqual(
      TRIET_LY_EN.nguyenLy.slice(0, 3).map((x) => x.title),
    );
  });

  it("thật sự đã dịch", () => {
    for (const n of NHIP) {
      expect(CACH_HOC_EN.nhip[n.slug].moTaDai).not.toBe(n.moTaDai);
    }
    expect(CACH_HOC_EN.nhan.taiLangMaker).not.toBe(CACH_HOC_VI.nhan.taiLangMaker);
  });
});
