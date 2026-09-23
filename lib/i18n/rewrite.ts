import { canonicalPathFromEn, routeKeyFromPath } from "./routes";

/** Đường dẫn middleware không được đụng tới. */
const BO_QUA = [
  "/api",
  "/dashboard",
  "/dang-nhap",
  "/_next",
  "/anh",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/opengraph-image",
];

/**
 * Đường dẫn nội bộ giả, chắc chắn không khớp route thật nào. Dùng để ép Next
 * trả 404 khi một URL /en/<slug> trùng tên với thư mục route tiếng Việt.
 *
 * Lý do cần: các route nằm thẳng dưới [locale] mang TÊN THƯ MỤC TIẾNG VIỆT
 * (vd. app/(site)/[locale]/(public)/lang-maker). Nếu middleware chỉ trả
 * null (không viết lại gì) cho "/en/lang-maker", Next vẫn tự khớp được vì
 * [locale] nhận mọi giá trị kể cả "en" — kết quả là URL tiếng Anh giả lọt
 * ra 200, trùng nội dung với "/en/maker-village" (bản đúng). Phải viết lại
 * sang một đường dẫn chắc chắn không tồn tại để Next 404 thật.
 */
const DUONG_DAN_KHONG_TON_TAI = "/en/__khong-ton-tai__";

/**
 * Đường dẫn công khai → đường dẫn nội bộ có tiền tố ngôn ngữ.
 *
 * Trả null mang ĐÚNG MỘT nghĩa: "không phải việc của middleware, để Next tự
 * xử" — dùng cho khu quản trị/api/tài nguyên tĩnh, và cho slug tiếng Anh lạ
 * không trùng bất kỳ route tiếng Việt nào (Next tự 404 vì không có thư mục
 * khớp). Với slug tiếng Anh KHÔNG hợp lệ nhưng TRÙNG TÊN một route tiếng
 * Việt thật, middleware chủ động viết lại sang DUONG_DAN_KHONG_TON_TAI để
 * ép 404, thay vì để lọt qua thành URL công khai trùng lặp.
 */
export function rewriteTarget(pathname: string): string | null {
  if (BO_QUA.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  // Mọi tệp có phần mở rộng đều là tài nguyên tĩnh. Cần dòng này vì ảnh OG do
  // Next sinh ra mang tên băm (/opengraph-image-a1b2c3.png) nên không khớp
  // được bằng danh sách tiền tố cố định ở trên.
  if (pathname.includes(".")) return null;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const canonical = canonicalPathFromEn(pathname);
    if (canonical !== null) {
      return canonical === "/" ? "/en" : `/en${canonical}`;
    }

    // Không phải slug tiếng Anh hợp lệ. Nếu phần còn lại (bỏ tiền tố /en)
    // lại trùng đúng một route tiếng Việt thật, đây là kiểu lọt route ở
    // trên — ép 404 thay vì cho qua.
    const phanCon = pathname === "/en" ? "/" : pathname.slice(3);
    if (routeKeyFromPath(phanCon) !== null) {
      return DUONG_DAN_KHONG_TON_TAI;
    }

    return null;
  }

  return pathname === "/" ? "/vi" : `/vi${pathname}`;
}
