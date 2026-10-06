import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import {
  MENTORS,
  MUOI_NAM,
  NGUOI_DAN,
  NGUOI_TRONG_LANG,
  TRICH_DAN_2017,
} from "@/lib/content/lang-maker";
import { LM_EN } from "./en";
import { LM_VI } from "./vi";

describe("LANG_MAKER_TRANG", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(LM_VI, LM_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(LM_VI)).toEqual([]);
    expect(emptyStringKeys(LM_EN)).toEqual([]);
  });

  it("vi dựng từ lang-maker.ts, không chép tay", () => {
    expect(LM_VI.nguoiTrongLang.vai).toEqual(
      NGUOI_TRONG_LANG.map(({ ten, laAi }) => ({ ten, laAi })),
    );
    expect(LM_VI.muoiNam.moc).toEqual(
      MUOI_NAM.map(({ moc, tieuDe, chiTiet }) => ({ moc, tieuDe, chiTiet })),
    );
    expect(LM_VI.muoiNam.trichDan.loi).toBe(TRICH_DAN_2017.loi);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(LM_VI.luanDe.tieuDe).toBe("Dùng robot để tạo ra đứa trẻ");
    expect(LM_VI.cuaVao.moTa).toBe(
      "Buổi đầu tiên miễn phí, và không cần biết gì trước.",
    );
  });

  it("số vai và số mốc khớp dữ liệu gốc", () => {
    expect(LM_EN.nguoiTrongLang.vai).toHaveLength(NGUOI_TRONG_LANG.length);
    expect(LM_EN.nguoiDan.vai).toHaveLength(NGUOI_DAN.length);
    expect(LM_EN.muoiNam.moc).toHaveLength(MUOI_NAM.length);
  });

  it("mọi mentor có nghề bản en", () => {
    for (const m of MENTORS.filter((x) => x.nghe)) {
      expect(LM_EN.nguoiDan.ngheMentor[m.ten], m.ten).toBeTruthy();
    }
  });

  it("tên vai bản en giữ tiếng Việt, kèm chú giải trong ngoặc", () => {
    expect(LM_EN.nguoiTrongLang.vai.map((v) => v.ten.split(" (")[0])).toEqual(
      NGUOI_TRONG_LANG.map((v) => v.ten),
    );
    expect(LM_EN.nguoiDan.vai.map((v) => v.ten.split(" (")[0])).toEqual(
      NGUOI_DAN.map((v) => v.ten),
    );
  });

  it("trích dẫn 2017 bản en là nguyên văn tiếng Anh của slide", () => {
    expect(LM_EN.muoiNam.trichDan.loi).toContain(
      "I want to create many labs like Maker Hanoi",
    );
  });

  it("thật sự đã dịch", () => {
    expect(LM_EN.muoiNam.moc[0].chiTiet).not.toBe(LM_VI.muoiNam.moc[0].chiTiet);
    expect(LM_EN.laGi.suMenh.noiDung).not.toBe(LM_VI.laGi.suMenh.noiDung);
  });

  it("nhãn ngày bản en không dùng dạng d/m — người Mỹ đọc 3/12/2016 là 12 tháng 3", () => {
    const nhan = [...LM_EN.muoiNam.moc.map((m) => m.moc), LM_EN.muoiNam.trichDan.thoiDiem];
    for (const n of nhan) expect(n, n).not.toMatch(/\d+\/\d+/);
  });

  it("vi giữ nhãn ngày gốc", () => {
    expect(LM_VI.muoiNam.moc.map((m) => m.moc)).toEqual(MUOI_NAM.map((m) => m.moc));
  });
});
