import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { CONG_DONG_EN } from "./en";
import { CONG_DONG_VI } from "./vi";

describe("CONG_DONG", () => {
  it("en không thiếu khoá", () => {
    expect(missingKeys(CONG_DONG_VI, CONG_DONG_EN)).toEqual([]);
  });

  it("không trường rỗng", () => {
    expect(emptyStringKeys(CONG_DONG_VI)).toEqual([]);
    expect(emptyStringKeys(CONG_DONG_EN)).toEqual([]);
  });

  it("vi giữ nguyên chữ đang chạy", () => {
    expect(CONG_DONG_VI.tongQuan.tieuDe).toBe("Cộng Đồng Làng Maker");
    expect(CONG_DONG_VI.hub.dangCapNhat).toBe("Đang cập nhật");
    expect(CONG_DONG_VI.tapChi.rong.title).toBe("Số đầu tiên đang được biên tập");
  });

  it("đích liên kết, icon và màu giống hệt hai bản", () => {
    const dich = (c: typeof CONG_DONG_VI) => [
      c.tongQuan.muc.map((m) => [m.icon, m.route, m.color]),
      c.tongQuan.linkNgoai.map((l) => l.url),
    ];
    expect(dich(CONG_DONG_EN)).toEqual(dich(CONG_DONG_VI));
  });

  it("thật sự đã dịch", () => {
    expect(CONG_DONG_EN.hub.rongMoTa).not.toBe(CONG_DONG_VI.hub.rongMoTa);
    expect(CONG_DONG_EN.duAn.rong.description).not.toBe(
      CONG_DONG_VI.duAn.rong.description,
    );
  });
});
