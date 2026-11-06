import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { duongDanAnh } from "./anh-lang";

const THU_MUC = path.join(process.cwd(), "public", "hoc-lieu", "lang");
const MA_TAM = "ZZ-test-tam";

describe("duongDanAnh", () => {
  afterEach(() => {
    rmSync(path.join(THU_MUC, `${MA_TAM}.webp`), { force: true });
  });

  it("mã có ký tự lạ thì ném lỗi, không đọc đĩa", () => {
    expect(() => duongDanAnh("../x")).toThrow(/không hợp lệ/);
    expect(() => duongDanAnh("A 1")).toThrow(/không hợp lệ/);
  });

  it("chưa có tệp thì trả null để khung tự ẩn", () => {
    expect(duongDanAnh(MA_TAM)).toBeNull();
  });

  it("có tệp thì trả đường dẫn công khai", () => {
    mkdirSync(THU_MUC, { recursive: true });
    writeFileSync(path.join(THU_MUC, `${MA_TAM}.webp`), "");
    expect(duongDanAnh(MA_TAM)).toBe(`/hoc-lieu/lang/${MA_TAM}.webp`);
  });
});
