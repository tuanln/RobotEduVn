import type { RouteKey } from "./routes";

/**
 * Các route ĐÃ có bản dịch tiếng Anh thật sự (nội dung khác biệt với bản
 * tiếng Việt) — không phải chỉ có đường dẫn `/en/...` trả về 200 nhưng
 * phục vụ y nguyên chữ tiếng Việt.
 *
 * Sitemap và hreflang chỉ được khai bản đối ứng tiếng Anh cho route nằm
 * trong tập này; nếu không, đó là khai báo sai với Google (tuyên bố một
 * bản dịch chưa tồn tại).
 *
 * Kế hoạch sau dịch xong trang nào thì thêm khoá trang đó vào đây.
 */
export const TRANSLATED_ROUTES: ReadonlySet<RouteKey> = new Set<RouteKey>([
  "philosophy",
]);
