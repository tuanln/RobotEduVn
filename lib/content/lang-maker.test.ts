import { describe, expect, it } from "vitest";
import {
  NGUOI_TRONG_LANG,
  MUOI_NAM,
  DO_NGHE_MUOI_NAM,
  TRICH_DAN_2017,
} from "./lang-maker";

describe("NGUOI_TRONG_LANG", () => {
  it("có bốn bậc đúng thứ tự từ dưới lên, cộng nghệ nhân đứng ngoài thang", () => {
    const trongThang = NGUOI_TRONG_LANG.filter((v) => v.bac !== null);
    expect(trongThang.map((v) => v.ten)).toEqual([
      "Dân làng",
      "Thợ học việc",
      "Thợ cả",
      "Già làng",
    ]);
    expect(trongThang.map((v) => v.bac)).toEqual([1, 2, 3, 4]);

    const ngoaiThang = NGUOI_TRONG_LANG.filter((v) => v.bac === null);
    expect(ngoaiThang.map((v) => v.ten)).toEqual(["Nghệ nhân"]);
  });

  it("mọi vai đều nói được mình là ai", () => {
    for (const vai of NGUOI_TRONG_LANG) {
      expect(vai.laAi.length, vai.ten).toBeGreaterThan(20);
    }
  });
});

describe("MUOI_NAM", () => {
  it("MỌI mốc đều có căn cứ — không mốc nào lên trang mà thiếu nguồn", () => {
    for (const moc of MUOI_NAM) {
      expect(moc.nguon.trim().length, `mốc "${moc.moc}" thiếu nguồn`).toBeGreaterThan(10);
    }
  });

  it("không mốc nào ở tương lai và không mốc nào trước khi làng ra đời", () => {
    const namNay = new Date().getFullYear();
    for (const moc of MUOI_NAM) {
      expect(moc.nam, moc.moc).toBeGreaterThanOrEqual(2016);
      expect(moc.nam, moc.moc).toBeLessThanOrEqual(namNay);
    }
  });

  it("sắp xếp theo thứ tự thời gian tăng dần", () => {
    const nam = MUOI_NAM.map((m) => m.nam);
    expect(nam).toEqual([...nam].sort((a, b) => a - b));
  });

  it("không dẫn tên miền đã chết makerhanoi.org", () => {
    const toanBo = MUOI_NAM.map((m) => `${m.chiTiet} ${m.nguon}`).join(" ");
    expect(toanBo.includes("makerhanoi.org")).toBe(false);
  });
});

describe("DO_NGHE_MUOI_NAM", () => {
  it("kể được dòng đồ nghề từ MEO tới ThingBot", () => {
    expect(DO_NGHE_MUOI_NAM[0]).toContain("MEO");
    expect(DO_NGHE_MUOI_NAM[DO_NGHE_MUOI_NAM.length - 1]).toContain("ThingBot");
    expect(DO_NGHE_MUOI_NAM.length).toBeGreaterThanOrEqual(7);
  });
});

describe("TRICH_DAN_2017", () => {
  it("ghi rõ người nói, thời điểm, và nói rõ đây là bản dịch", () => {
    expect(TRICH_DAN_2017.thoiDiem).toBe("6/2017");
    expect(TRICH_DAN_2017.nguoiNoi.length).toBeGreaterThan(3);
    expect(TRICH_DAN_2017.ghiChu.toLowerCase()).toContain("dịch");
  });
});
