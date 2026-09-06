/**
 * Slug ba nhịp của vòng lặp Chơi → Làm → Chia sẻ.
 * Thứ tự trong mảng chính là thứ tự vòng lặp; đừng đổi.
 */
export const NHIP_SLUGS = ["choi", "lam", "chia-se"] as const;

export type NhipSlug = (typeof NHIP_SLUGS)[number];

/**
 * Bản đồ 5 giai đoạn cũ → 3 nhịp mới. Giữ lại vĩnh viễn: document Firestore và
 * dòng Google Sheet tạo trước 09/2026 vẫn mang giá trị cũ, chuẩn hoá lúc đọc
 * rẻ hơn và an toàn hơn là migration dữ liệu.
 */
const SLUG_CU: Record<string, NhipSlug> = {
  "kham-pha": "choi",
  "tu-duy": "lam",
  "lap-trinh": "lam",
  "iot-robot": "lam",
  "chia-se": "chia-se",
};

export function normalizeNhipSlug(
  raw: string | undefined | null
): NhipSlug {
  const key = (raw ?? "").trim().toLowerCase();
  if ((NHIP_SLUGS as readonly string[]).includes(key)) {
    return key as NhipSlug;
  }
  return SLUG_CU[key] ?? NHIP_SLUGS[0];
}
