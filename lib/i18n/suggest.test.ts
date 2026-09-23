import { describe, expect, it } from "vitest";
import { nenGoiY } from "./suggest";

describe("nenGoiY", () => {
  it("người dùng trình duyệt tiếng Anh đang xem bản tiếng Việt thì gợi ý tiếng Anh", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["en-US", "en"], daTuChoi: false }),
    ).toBe("en");
  });

  it("người dùng trình duyệt tiếng Việt thì KHÔNG gợi ý gì", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["vi-VN", "vi"], daTuChoi: false }),
    ).toBeNull();
  });

  it("đang xem đúng ngôn ngữ của mình rồi thì không gợi ý", () => {
    expect(
      nenGoiY({ current: "en", browserLangs: ["en-US"], daTuChoi: false }),
    ).toBeNull();
  });

  it("đã đóng dải một lần thì không gợi ý lại nữa", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: ["en-US"], daTuChoi: true }),
    ).toBeNull();
  });

  it("ngôn ngữ trình duyệt không phải vi cũng không phải en thì gợi ý tiếng Anh", () => {
    // Người Nhật, người Pháp… đọc bản tiếng Anh dễ hơn bản tiếng Việt.
    expect(
      nenGoiY({ current: "vi", browserLangs: ["ja-JP"], daTuChoi: false }),
    ).toBe("en");
  });

  it("không có thông tin ngôn ngữ thì KHÔNG gợi ý — im lặng hơn là đoán bừa", () => {
    expect(
      nenGoiY({ current: "vi", browserLangs: [], daTuChoi: false }),
    ).toBeNull();
  });
});
