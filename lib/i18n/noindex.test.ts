import { describe, expect, it } from "vitest";
import { shouldNoindex } from "./noindex";

describe("shouldNoindex", () => {
  it("trang tiếng Việt không bao giờ noindex", () => {
    expect(shouldNoindex("/cong-cu")).toBe(false);
    expect(shouldNoindex("/video-hub/mv-thingbot-kit-2026")).toBe(false);
  });

  it("trang tiếng Anh đã dịch thì không noindex", () => {
    expect(shouldNoindex("/en/tools")).toBe(false);
  });

  it("trang video tiếng Anh không bị noindex khi Video Hub đã dịch", () => {
    expect(shouldNoindex("/en/videos/mv-thingbot-kit-2026")).toBe(false);
  });

  it("đường dẫn tiếng Anh lạ vẫn noindex", () => {
    expect(shouldNoindex("/en/khong-co")).toBe(true);
    expect(shouldNoindex("/en/videos/a/b")).toBe(true);
  });
});
