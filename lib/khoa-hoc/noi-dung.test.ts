import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOB_KHOA_HOC, TEP_BLOB } from "./tep-blob";

const GOC = join(process.cwd(), "content/khoa-hoc");
const PUBLIC = join(process.cwd(), "public");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const md = walk(GOC).filter((p) => p.endsWith(".md"));
const tatCa = md.map((p) => ({ p: p.slice(GOC.length), text: readFileSync(p, "utf8") }));
const links = tatCa.flatMap(({ p, text }) =>
  [...text.matchAll(/\]\((\S+?)(?:\s+"[^"]*")?\)/g)].map((m) => ({ p, url: m[1] })),
);

/** `/khoa-hoc/a/b` → content/khoa-hoc/a/b.md hoặc a/b/index.md. */
function coTrang(url: string): boolean {
  const rel = decodeURIComponent(url.split("#")[0]).replace(/^\/khoa-hoc\/?/, "");
  const p = join(GOC, rel);
  return existsSync(`${p}.md`) || existsSync(join(p, "index.md"));
}

describe("nội dung thư viện khóa học", () => {
  it("đủ 48 trang: 38 phần + 7 tổng quan khóa + 2 khu + 1 trang gốc", () => {
    expect(md).toHaveLength(48);
  });

  it("không còn link /files hay /media kiểu cũ của makerviet", () => {
    const cu = links.filter(({ url }) => /^\/(files|media)\//.test(url));
    expect(cu).toEqual([]);
  });

  it("mọi ảnh /hoc-lieu/media trỏ tới tệp có thật trong public/", () => {
    const hong = links
      .filter(({ url }) => url.startsWith("/hoc-lieu/"))
      .filter(({ url }) => !existsSync(join(PUBLIC, decodeURIComponent(url))));
    expect(hong).toEqual([]);
    expect(links.filter(({ url }) => url.startsWith("/hoc-lieu/")).length).toBeGreaterThan(100);
  });

  it("mọi link Blob nằm trong danh sách tệp đã tải lên", () => {
    const blob = links.filter(({ url }) => url.startsWith(BLOB_KHOA_HOC));
    const thieu = blob.filter(({ url }) => !(TEP_BLOB as readonly string[]).includes(url.slice(BLOB_KHOA_HOC.length + 1)));
    expect(thieu).toEqual([]);
    // mỗi tệp đã tải lên đều được dùng ít nhất một lần
    const dung = new Set(blob.map(({ url }) => url.slice(BLOB_KHOA_HOC.length + 1)));
    expect(TEP_BLOB.filter((t) => !dung.has(t))).toEqual([]);
  });

  it("mọi link /khoa-hoc nội bộ trỏ tới trang có thật", () => {
    const hong = links.filter(({ url }) => url.startsWith("/khoa-hoc")).filter(({ url }) => !coTrang(url));
    expect(hong).toEqual([]);
  });

  it("chỉ link nội bộ tới /khoa-hoc và /hoc-lieu — không trỏ sang trang chỉ có ở makerviet", () => {
    const la = links.filter(({ url }) => url.startsWith("/") && !/^\/(khoa-hoc|hoc-lieu)(\/|$)/.test(url));
    expect(la).toEqual([]);
  });

  it("không còn dấu vết vsteam hay rác Moodle", () => {
    const ban = tatCa.filter(({ text }) => /vsteam\.edu\.vn|💬|cmid \d+|_Loại:|Trường làng/.test(text));
    expect(ban.map(({ p }) => p)).toEqual([]);
  });
});
