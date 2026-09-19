import { describe, expect, it } from "vitest";
import { HUBS } from "./hubs";
import {
  NGUOI_DAN,
  MENTORS,
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
    const toanBo = MUOI_NAM.map((m) => `${m.tieuDe} ${m.chiTiet} ${m.nguon}`).join(" ");
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

describe("NGUOI_DAN", () => {
  it("có đúng bốn vai người dẫn, đúng thứ tự", () => {
    expect(NGUOI_DAN.map((v) => v.ten)).toEqual([
      "Già Làng",
      "Bô Lão",
      "Nghệ nhân",
      "Thợ cả",
    ]);
  });

  it("chỉ Già Làng và Thợ cả nằm trong thang chứng nhận MakerCoach", () => {
    const trongThang = NGUOI_DAN.filter((v) => v.trongThangMakerCoach);
    expect(trongThang.map((v) => v.ten)).toEqual(["Già Làng", "Thợ cả"]);
  });

  it("mọi vai đều nói được mình dẫn ai và làm việc gì cụ thể", () => {
    for (const vai of NGUOI_DAN) {
      expect(vai.dan.length, vai.ten).toBeGreaterThan(20);
      expect(vai.viecCuThe.length, vai.ten).toBeGreaterThan(40);
    }
  });
});

describe("MENTORS", () => {
  it("mọi người dẫn có tên đều mang một vai CÓ THẬT trong NGUOI_DAN", () => {
    const tenVai = NGUOI_DAN.map((v) => v.ten);
    for (const m of MENTORS) {
      expect(tenVai, `"${m.ten}" mang vai lạ: ${m.vai}`).toContain(m.vai);
    }
  });

  it("không người dẫn nào được để trống tên", () => {
    for (const m of MENTORS) {
      expect(m.ten.trim().length, "tên rỗng").toBeGreaterThan(0);
    }
  });

  it("trường tuỳ chọn nào đã điền thì không được là chuỗi rỗng", () => {
    for (const m of MENTORS) {
      if (m.nghe !== undefined) {
        expect(m.nghe.trim().length, `${m.ten}: nghề điền rỗng`).toBeGreaterThan(0);
      }
      if (m.danGi !== undefined) {
        expect(m.danGi.trim().length, `${m.ten}: việc dẫn điền rỗng`).toBeGreaterThan(0);
      }
    }
  });

  it("mỗi vai chỉ có một Già Làng và một Bô Lão", () => {
    const dem = (v: string) => MENTORS.filter((m) => m.vai === v).length;
    expect(dem("Già Làng")).toBeLessThanOrEqual(1);
    expect(dem("Bô Lão")).toBeLessThanOrEqual(1);
  });
});

describe("MENTORS gắn với Maker Hub", () => {
  it("mọi hubId đều trỏ tới một hub CÓ THẬT trong hubs.ts", () => {
    const idThat = HUBS.map((h) => h.id);
    for (const m of MENTORS) {
      if (m.hubId !== undefined) {
        expect(idThat, `"${m.ten}" gắn hub lạ: ${m.hubId}`).toContain(m.hubId);
      }
    }
  });
});
