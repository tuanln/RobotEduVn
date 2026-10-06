// Cổng nghiệm thu song ngữ: đọc HTML THẬT của mọi trang /en, bỏ <script>,
// <style> và mọi phần tử lang="vi" (dữ liệu gốc tiếng Việt đã đánh dấu), rồi
// liệt kê từ có chữ cái riêng của tiếng Việt — trong chữ hiển thị VÀ trong
// alt/title/aria-label/placeholder/meta content — không nằm trong danh sách
// cho phép. Lõi quét ở lib/i18n/leak-scan.mjs (có test).
//
// Dùng: npm run check:en [-- http://localhost:3000]   (server phải đang chạy)
// Thoát mã 1 nếu còn rò hoặc có trang không trả 200.
import { ROUTES } from "../lib/i18n/routes.ts";
import { ALLOW } from "../lib/i18n/en-allowlist.mjs";
import { chuCanQuet } from "../lib/i18n/leak-scan.mjs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

// Thêm một trang một video (route động) — đại diện cho cả loại trang này.
const VIDEO = "/en/videos/mv-thingbot-kit-2026";
const PATHS = [...Object.values(ROUTES).map((r) => r.en), VIDEO];
const ALLOW_DAI_TRUOC = [...ALLOW].sort((a, b) => b.length - a.length);

// Trang một video: <title> và các thẻ meta tiêu đề/mô tả LÀ tiêu đề, mô tả
// video YouTube — dữ liệu gốc tiếng Việt, mà <title>/<meta> không nhận lang.
const META_VIDEO =
  /<meta\b[^>]*\b(name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description)"[^>]*>/gi;

let tong = 0;
for (const path of PATHS) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) {
    console.log(`✗ ${path} → HTTP ${res.status}`);
    tong++;
    continue;
  }
  let html = await res.text();
  if (path === VIDEO) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, " ").replace(META_VIDEO, " ");
  }
  let text = chuCanQuet(html);
  for (const a of ALLOW_DAI_TRUOC) text = text.split(a).join(" ");
  const ro = [...new Set(text.split(/\s+/).filter((w) => VI.test(w)))];
  console.log(`${ro.length ? "✗" : "✓"} ${path}${ro.length ? `  (${ro.length}) ${ro.join(" ")}` : ""}`);
  tong += ro.length;
}
console.log(tong ? `\n${tong} chỗ rò.` : "\nKhông còn chữ tiếng Việt rò trên trang /en.");
process.exit(tong ? 1 : 0);
