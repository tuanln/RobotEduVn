import { describe, expect, it } from "vitest";
import { tachDanhDau } from "./tim";

describe("tachDanhDau", () => {
  it("tách chữ khớp ra khỏi chữ thường", () => {
    expect(tachDanhDau("Cấp nguồn cho <mark>mạch VIA</mark> B")).toEqual([
      { chu: "Cấp nguồn cho ", khop: false },
      { chu: "mạch VIA", khop: true },
      { chu: " B", khop: false },
    ]);
  });

  it("nhiều chỗ khớp, khớp ở đầu và cuối", () => {
    expect(tachDanhDau("<mark>động</mark> và <mark>cơ</mark>")).toEqual([
      { chu: "động", khop: true },
      { chu: " và ", khop: false },
      { chu: "cơ", khop: true },
    ]);
  });

  it("bỏ dấu nhấn Markdown và thẻ lạ, không để lọt thẻ HTML", () => {
    expect(tachDanhDau('**Lưu ý:** <img src=x onerror="a()"><mark>pin</mark>')).toEqual([
      { chu: "Lưu ý: ", khop: false },
      { chu: "pin", khop: true },
    ]);
  });

  it("không có chỗ khớp thì trả nguyên chữ", () => {
    expect(tachDanhDau("ThingBot")).toEqual([{ chu: "ThingBot", khop: false }]);
  });
});
