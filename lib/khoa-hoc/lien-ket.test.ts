import { describe, expect, it } from "vitest";
import { laTepTaiVe } from "./lien-ket";

describe("laTepTaiVe", () => {
  it("tệp trong /hoc-lieu (bài mẫu .tb) là tệp tải về, không đi qua next/link", () => {
    expect(laTepTaiVe("/hoc-lieu/thingblock/tep/k2-robot-vu-cong-v1.tb")).toBe(true);
  });
  it("trang khóa học và neo trong trang không phải tệp tải về", () => {
    expect(laTepTaiVe("/khoa-hoc/thingedu/thingblock/cai-dat")).toBe(false);
    expect(laTepTaiVe("/khoa-hoc/thingedu/thingblock/cai-dat#macos")).toBe(false);
    expect(laTepTaiVe("#macos")).toBe(false);
  });
});
