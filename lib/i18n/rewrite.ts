import { canonicalPathFromEn } from "./routes";

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
 * Đường dẫn công khai → đường dẫn nội bộ có tiền tố ngôn ngữ.
 * Trả null nghĩa là "không viết lại" — để Next tự xử (bỏ qua hoặc 404).
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
    if (canonical === null) return null;
    return canonical === "/" ? "/en" : `/en${canonical}`;
  }

  return pathname === "/" ? "/vi" : `/vi${pathname}`;
}
