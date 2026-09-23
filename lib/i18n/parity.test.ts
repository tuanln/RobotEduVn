import { describe, expect, it } from "vitest";
import { deepKeys, emptyStringKeys, missingKeys } from "./parity";

describe("deepKeys", () => {
  it("liệt kê khoá lồng nhau theo đường dẫn chấm", () => {
    expect(deepKeys({ a: 1, b: { c: 2 } }).sort()).toEqual(["a", "b.c"]);
  });

  it("đánh số phần tử mảng — để hụt phần tử là phát hiện được", () => {
    expect(deepKeys({ xs: ["p", "q"] }).sort()).toEqual(["xs.0", "xs.1"]);
  });

  it("coi mảng rỗng và object rỗng là một khoá lá", () => {
    expect(deepKeys({ xs: [], o: {} }).sort()).toEqual(["o", "xs"]);
  });
});

describe("missingKeys", () => {
  it("không thiếu gì thì trả mảng rỗng", () => {
    expect(missingKeys({ a: 1, b: { c: 2 } }, { a: 9, b: { c: 8 } })).toEqual([]);
  });

  it("chỉ ra đúng khoá bị thiếu", () => {
    expect(missingKeys({ a: 1, b: { c: 2 } }, { a: 9 })).toEqual(["b.c"]);
  });

  it("chỉ ra phần tử mảng bị hụt", () => {
    expect(missingKeys({ xs: ["p", "q", "r"] }, { xs: ["p", "q"] })).toEqual([
      "xs.2",
    ]);
  });
});

describe("emptyStringKeys", () => {
  it("bắt chuỗi rỗng và chuỗi chỉ có khoảng trắng", () => {
    expect(emptyStringKeys({ a: "xong", b: "", c: "   " }).sort()).toEqual([
      "b",
      "c",
    ]);
  });
});

describe("bắt được hai kiểu dịch sót thường gặp", () => {
  it("phải phát hiện bản en hụt một nguyên lý", () => {
    const vi = { nguyenLy: [{ title: "a" }, { title: "b" }, { title: "c" }] };
    const en = { nguyenLy: [{ title: "a" }, { title: "b" }] };
    expect(missingKeys(vi, en)).toEqual(["nguyenLy.2.title"]);
  });

  it("phải phát hiện bản en để trống một trường", () => {
    const en = { quote: "", title: "Papert" };
    expect(emptyStringKeys(en)).toEqual(["quote"]);
  });
});
