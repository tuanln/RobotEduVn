/**
 * Lõi của scripts/check-en-leaks.mjs, tách ra để vitest thử được.
 * JS thuần (.mjs) vì script chạy bằng node, không qua bundler.
 */

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "source", "track", "wbr",
]);

/**
 * Bỏ mọi phần tử có lang="vi" (dữ liệu gốc tiếng Việt đã đánh dấu), kể cả
 * lồng nhau cùng tên thẻ. Thẻ rỗng (img, …) hay thẻ tự đóng `/>` chỉ bỏ
 * đúng thẻ đó. Không tìm được thẻ đóng thì NÉM LỖI — cắt tới cuối trang sẽ
 * giấu chỗ rò và cho cổng nghiệm thu xanh giả.
 */
export function boLangVi(html) {
  const mo = /<(\w+)\b[^>]*\blang="vi"[^>]*>/i;
  let m;
  while ((m = mo.exec(html))) {
    const tag = m[1].toLowerCase();
    let het;
    if (VOID.has(tag) || m[0].endsWith("/>")) {
      het = m.index + m[0].length;
    } else {
      const re = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, "gi");
      re.lastIndex = m.index + m[0].length;
      let sau = 1;
      let t;
      while (sau > 0 && (t = re.exec(html))) {
        if (t[1]) sau--;
        else if (!t[2]) sau++;
      }
      if (sau > 0) {
        throw new Error(`Không thấy thẻ đóng </${tag}> cho phần tử lang="vi" ở vị trí ${m.index}`);
      }
      het = t.index + t[0].length;
    }
    html = html.slice(0, m.index) + " " + html.slice(het);
  }
  return html;
}

/** Các thuộc tính người dùng nghe/thấy được — trình đọc màn hình đọc chúng. */
const THUOC_TINH = /\b(alt|title|aria-label|placeholder|content)="([^"]*)"/gi;

/**
 * Chữ cần quét của một trang: chữ hiển thị + giá trị thuộc tính nghe/thấy
 * được, sau khi bỏ <script>, <style> và mọi phần tử lang="vi".
 */
export function chuCanQuet(html) {
  const s = boLangVi(
    html
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
      // Thẻ <html lang="..."> bao cả trang — chỉ bỏ phần tử con có lang="vi".
      .replace(/<html\b[^>]*>/i, " "),
  );
  const thuocTinh = [...s.matchAll(THUOC_TINH)].map((m) => m[2]);
  const chu = s.replace(/<[^>]+>/g, " ");
  return [chu, ...thuocTinh]
    .join(" ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ");
}
