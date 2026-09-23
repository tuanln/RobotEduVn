import { describe, expect, it } from "vitest";
import { emptyStringKeys } from "@/lib/i18n/parity";
import { TRIET_LY_VI } from "./vi";

describe("TRIET_LY_VI", () => {
  it("có đúng ba trụ cột", () => {
    expect(TRIET_LY_VI.truCot).toHaveLength(3);
  });

  it("có đúng sáu nguyên lý", () => {
    expect(TRIET_LY_VI.nguyenLy).toHaveLength(6);
  });

  it("ba nguyên lý đầu lấy từ nhịp Làm, không chép tay", () => {
    // Chép tay thì hai bản sẽ trôi khỏi nhau. Nguồn sự thật là nhip.ts.
    expect(TRIET_LY_VI.nguyenLy[0].title).toBe("Chạm trước, ký hiệu sau");
    expect(TRIET_LY_VI.nguyenLy[1].title).toBe("Khó mà vui");
    expect(TRIET_LY_VI.nguyenLy[2].title).toBe("Lỗi là thông tin");
  });

  it("không trường nào bỏ trống", () => {
    expect(emptyStringKeys(TRIET_LY_VI)).toEqual([]);
  });

  it("giữ nguyên tiêu đề ba trụ cột đang chạy thật", () => {
    expect(TRIET_LY_VI.truCot.map((t) => t.title)).toEqual([
      'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
      "Triết Lý Kiến Tạo — Seymour Papert",
      "Tinh Thần Coopertition — FIRST Robotics",
    ]);
  });
});
