import type { Locale } from "./locales";

/**
 * Có nên gợi ý đổi ngôn ngữ không (spec 2026-09-23 mục 2.3).
 *
 * Chỉ GỢI Ý, không bao giờ tự chuyển: tự chuyển làm người dùng bực và làm
 * Google index sai. Hàm thuần để test được; phần đọc navigator.languages và
 * localStorage nằm ở component. Việc lọc theo trang đã dịch thật hay chưa
 * (TRANSLATED_ROUTES) cũng nằm ở component vì hàm này không biết route.
 */
export function nenGoiY({
  current,
  browserLangs,
  daTuChoi,
}: {
  current: Locale;
  browserLangs: readonly string[];
  daTuChoi: boolean;
}): Locale | null {
  if (daTuChoi) return null;
  if (browserLangs.length === 0) return null;

  const thichTiengViet = browserLangs.some((l) =>
    l.toLowerCase().startsWith("vi"),
  );
  const muon: Locale = thichTiengViet ? "vi" : "en";

  return muon === current ? null : muon;
}
