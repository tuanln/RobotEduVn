import { canonicalPathFromEn } from "./routes";

/** Đường dẫn middleware không được đụng tới. */
const BO_QUA = [
  "/api",
  "/dashboard",
  "/dang-nhap",
  // S-01: trang admin đã dời sang app/(admin)/admin — ngoài cây [locale],
  // nên KHÔNG được gắn tiền tố /vi nữa (route đó không tồn tại và sẽ 404).
  "/admin",
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
 * xử" — dùng cho khu quản trị/api/tài nguyên tĩnh. Nhánh /en/* KHÔNG dùng
 * quy ước này: mặc định TỪ CHỐI. Chỉ khi slug khớp đúng một bản dịch khai
 * trong ROUTES (canonicalPathFromEn khác null) mới được viết lại; mọi
 * trường hợp còn lại — kể cả route ĐỘNG chưa dịch như
 * /en/video-hub/<id-thật> — đều bị ép về DUONG_DAN_KHONG_TON_TAI để Next
 * 404. Cách này an toàn hơn bản trước (chỉ so khớp route TĨNH bằng
 * routeKeyFromPath): route động không có trong bảng ROUTES nên trước đây
 * lọt lưới, trả 200 với nội dung tiếng Việt dưới URL /en/*.
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

    return DUONG_DAN_KHONG_TON_TAI;
  }

  return pathname === "/" ? "/vi" : `/vi${pathname}`;
}
