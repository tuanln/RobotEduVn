// Cổng nghiệm thu song ngữ: đọc HTML THẬT của mọi trang /en, bỏ <script>,
// <style> và mọi phần tử lang="vi" (dữ liệu gốc tiếng Việt đã đánh dấu), rồi
// liệt kê từ có chữ cái riêng của tiếng Việt không nằm trong danh sách cho phép.
//
// Dùng: npm run check:en [-- http://localhost:3000]   (server phải đang chạy)
// Thoát mã 1 nếu còn rò hoặc có trang không trả 200.
import { ROUTES } from "../lib/i18n/routes.ts";
import { ALLOW } from "../lib/i18n/en-allowlist.mjs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

// Thêm một trang một video (route động) — đại diện cho cả loại trang này.
const VIDEO = "/en/videos/mv-thingbot-kit-2026";
const PATHS = [...Object.values(ROUTES).map((r) => r.en), VIDEO];
const ALLOW_DAI_TRUOC = [...ALLOW].sort((a, b) => b.length - a.length);

/** Bỏ phần tử có lang="vi", kể cả lồng nhau cùng tên thẻ. */
function boLangVi(html) {
  const mo = /<(\w+)\b[^>]*\blang="vi"[^>]*>/i;
  let m;
  while ((m = mo.exec(html))) {
    const tag = m[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    re.lastIndex = m.index + m[0].length;
    let sau = 1;
    let t;
    while (sau > 0 && (t = re.exec(html))) sau += t[1] ? -1 : 1;
    const het = t ? t.index + t[0].length : html.length;
    html = html.slice(0, m.index) + " " + html.slice(het);
  }
  return html;
}

function chuHienThi(html, path) {
  // Trang một video: <title> là tiêu đề video YouTube — dữ liệu gốc tiếng
  // Việt, không bọc lang được vì <title> không nhận thuộc tính đó.
  if (path === VIDEO) html = html.replace(/<title>[\s\S]*?<\/title>/i, " ");
  const s = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    // Thẻ <html lang="..."> bao cả trang — chỉ bỏ phần tử con có lang="vi".
    .replace(/<html\b[^>]*>/i, " ");
  return boLangVi(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ");
}

let tong = 0;
for (const path of PATHS) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) {
    console.log(`✗ ${path} → HTTP ${res.status}`);
    tong++;
    continue;
  }
  let text = chuHienThi(await res.text(), path);
  for (const a of ALLOW_DAI_TRUOC) text = text.split(a).join(" ");
  const ro = [...new Set(text.split(/\s+/).filter((w) => VI.test(w)))];
  console.log(`${ro.length ? "✗" : "✓"} ${path}${ro.length ? `  (${ro.length}) ${ro.join(" ")}` : ""}`);
  tong += ro.length;
}
console.log(tong ? `\n${tong} chỗ rò.` : "\nKhông còn chữ tiếng Việt rò trên trang /en.");
process.exit(tong ? 1 : 0);
