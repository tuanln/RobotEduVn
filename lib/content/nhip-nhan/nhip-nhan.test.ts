import { describe, expect, it } from "vitest";
import { emptyStringKeys, missingKeys } from "@/lib/i18n/parity";
import { NHIP } from "@/lib/content/nhip";
import { NHIP_NHAN_EN } from "./en";
import { NHIP_NHAN_VI } from "./vi";

describe("NHIP_NHAN_VI", () => {
  it("có nhãn cho đúng ba nhịp, khớp slug trong NHIP", () => {
    expect(Object.keys(NHIP_NHAN_VI).sort()).toEqual(
      NHIP.map((n) => n.slug).sort(),
    );
  });

  it("giữ nguyên nhãn tiếng Việt đang chạy thật", () => {
    expect(NHIP_NHAN_VI["choi"].ten).toBe("Chơi");
    expect(NHIP_NHAN_VI["lam"].ten).toBe("Làm");
    expect(NHIP_NHAN_VI["chia-se"].ten).toBe("Chia sẻ");
    expect(NHIP_NHAN_VI["lam"].tenHuyHieu).toBe("Thợ Làm");
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(NHIP_NHAN_VI)).toEqual([]);
  });
});

describe("NHIP_NHAN_EN", () => {
  it("không thiếu khoá nào so với bản tiếng Việt", () => {
    expect(missingKeys(NHIP_NHAN_VI, NHIP_NHAN_EN)).toEqual([]);
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(NHIP_NHAN_EN)).toEqual([]);
  });

  it("thật sự đã dịch, không chép lại bản tiếng Việt", () => {
    for (const slug of Object.keys(NHIP_NHAN_VI) as (keyof typeof NHIP_NHAN_VI)[]) {
      expect(NHIP_NHAN_EN[slug].khauHieu).not.toBe(NHIP_NHAN_VI[slug].khauHieu);
      expect(NHIP_NHAN_EN[slug].moTaNgan).not.toBe(NHIP_NHAN_VI[slug].moTaNgan);
    }
  });
});
