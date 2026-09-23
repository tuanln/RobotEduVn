import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "./locales";

describe("LOCALES", () => {
  it("có đúng hai ngôn ngữ, tiếng Việt đứng trước", () => {
    expect(LOCALES).toEqual(["vi", "en"]);
  });

  it("mặc định là tiếng Việt — đây là site cho trẻ em Việt Nam", () => {
    expect(DEFAULT_LOCALE).toBe("vi");
  });
});

describe("isLocale", () => {
  it("nhận đúng hai mã hợp lệ", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("từ chối mã lạ, rỗng, undefined và kiểu khác", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(7)).toBe(false);
  });
});
