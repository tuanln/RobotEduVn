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
  it("đủ 102 trang: 48 trang Maker Việt + trang ThingBot FanRoc Challenge + 53 trang ThingBlock (16 + 37 trang ví dụ)", () => {
    expect(md).toHaveLength(102);
    expect(tatCa.filter(({ p }) => p.startsWith("/thingedu/thingblock/"))).toHaveLength(53);
    expect(tatCa.filter(({ p }) => p.startsWith("/thingedu/thingblock/vi-du/"))).toHaveLength(37);
  });

  it("trang ThingBlock ghi nguồn ThingEdu, trang chép từ Moodle thì không khai nguồn (mặc định Maker Việt)", () => {
    for (const { p, text } of tatCa) {
      const nguon = text.match(/^nguon: "(.+)"$/m)?.[1];
      if (p.startsWith("/thingedu/thingblock/") || p === "/thingedu/thingbot/fanroc-challenge.md") expect(nguon, p).toMatch(/^ThingEdu/);
      else expect(nguon, p).toBeUndefined();
    }
  });

  it("không có chuỗi dấu cách không ngắt (NBSP) dài từ Moodle — nó không xuống dòng, đẩy trang tràn ngang trên điện thoại", () => {
    const tran = tatCa.filter(({ text }) => /\u00a0{5,}/.test(text)).map(({ p }) => p);
    expect(tran).toEqual([]);
  });

  it("mỗi tệp .tb (16 bài mẫu + 36 ví dụ) đều có trang dẫn tới, không tệp nào mồ côi", () => {
    const daDung = new Set(links.map(({ url }) => url));
    for (const [thuMuc, soTep] of [["tep", 16], ["vi-du", 36]] as const) {
      const tep = readdirSync(join(PUBLIC, "hoc-lieu/thingblock", thuMuc)).filter((n) => n.endsWith(".tb"));
      expect(tep, thuMuc).toHaveLength(soTep);
      expect(tep.filter((n) => !daDung.has(`/hoc-lieu/thingblock/${thuMuc}/${n}`))).toEqual([]);
    }
  });

  it("mỗi trang ví dụ dẫn tới đúng tệp .tb cùng tên và mở được ví dụ trong ThingBlock 0.6", () => {
    const viDu = tatCa.filter(({ p }) => p.startsWith("/thingedu/thingblock/vi-du/") && !p.endsWith("/index.md"));
    for (const { p, text } of viDu) {
      const ma = p.slice("/thingedu/thingblock/vi-du/".length, -3);
      expect(text, p).toContain(`](/hoc-lieu/thingblock/vi-du/${ma}.tb)`);
      expect(text, p).toContain("**Tập tin → Ví dụ… →");
      expect(text, p).toContain("## Thử thách");
    }
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

  it("không ảnh nào lấy từ host ngoài — remark-image tải ảnh ngoài lúc build, host đó sập là deploy hỏng", () => {
    const ngoai = tatCa.flatMap(({ p, text }) =>
      [...text.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)/g)].map((m) => ({ p, url: m[1] })),
    );
    expect(ngoai).toEqual([]);
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

  it("chỉ link nội bộ tới /khoa-hoc, /hoc-lieu, /mo-phong — không trỏ sang trang chỉ có ở makerviet", () => {
    // /mo-phong là web mô phỏng ThingBot, chuyển tiếp ngầm từ next.config.ts (có ?bai=N).
    const la = links.filter(({ url }) => url.startsWith("/") && !/^\/(khoa-hoc|hoc-lieu|mo-phong)(\/|\?|$)/.test(url));
    expect(la).toEqual([]);
  });

  it("không còn dấu vết vsteam hay rác Moodle", () => {
    const ban = tatCa.filter(({ text }) => /vsteam\.edu\.vn|💬|cmid \d+|_Loại:|Trường làng/.test(text));
    expect(ban.map(({ p }) => p)).toEqual([]);
  });
});
