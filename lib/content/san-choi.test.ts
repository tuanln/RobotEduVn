import { describe, expect, it } from "vitest";
import { CHON_THEO_TUOI, MUC_HOP, SAN_CHOI, sanChoiTheoMuc } from "./san-choi";

describe("SAN_CHOI", () => {
  it("đủ mười sân chơi, mã duy nhất", () => {
    expect(SAN_CHOI).toHaveLength(10);
    expect(new Set(SAN_CHOI.map((s) => s.ma)).size).toBe(10);
  });

  it("mỗi sân chơi bắt buộc có nguồn đã kiểm và link https", () => {
    for (const s of SAN_CHOI) {
      expect(s.nguon.trim().length, `"${s.ten}" thiếu nguồn`).toBeGreaterThan(10);
      expect(s.link, `"${s.ten}" link sai`).toMatch(/^https:\/\//);
    }
  });

  it("không ghi ngày của mùa tới: không có năm 2027", () => {
    for (const s of SAN_CHOI) expect(s.thoiGian).not.toMatch(/2027/);
  });

  it("FanRoc là cửa vào, mức rất hợp, mã 'fanroc' để trang chủ neo tới", () => {
    const f = SAN_CHOI.find((s) => s.ma === "fanroc");
    expect(f?.mucHop).toBe("rat-hop");
  });

  it("mỗi mức hợp có ít nhất một sân chơi và có nhãn", () => {
    for (const muc of Object.keys(MUC_HOP) as (keyof typeof MUC_HOP)[]) {
      expect(sanChoiTheoMuc(muc).length).toBeGreaterThan(0);
      expect(MUC_HOP[muc].ten.trim()).not.toBe("");
    }
  });

  it("sơ đồ chọn theo tuổi chỉ trỏ tới mã có thật", () => {
    const ma = new Set(SAN_CHOI.map((s) => s.ma));
    for (const nhom of CHON_THEO_TUOI) {
      for (const m of nhom.ma) expect(ma.has(m), `mã lạ: ${m}`).toBe(true);
    }
  });
});
