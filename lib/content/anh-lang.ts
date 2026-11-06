import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Ảnh hoạt động của Làng: `public/hoc-lieu/lang/<mã>.webp`.
 *
 * Mã ảnh ghi trong kế hoạch (spec 2026-11-06 mục 5): A1 con đường 8 chặng,
 * A2 trẻ chơi NEO One, F1 BlueSilk, G1–G3 Team Vietnam FGC… Chỗ nào chưa có
 * tệp thì component AnhLang trả null — trang không hiện ô trống, và thêm ảnh
 * sau không cần sửa mã. Kiểm tra lúc render phía server, không chạy ở client.
 */
const THU_MUC = ["public", "hoc-lieu", "lang"] as const;
const MA_HOP_LE = /^[A-Za-z0-9-]+$/;

export function duongDanAnh(ma: string): string | null {
  if (!MA_HOP_LE.test(ma)) {
    throw new Error(`Mã ảnh không hợp lệ: "${ma}"`);
  }
  const tep = path.join(process.cwd(), ...THU_MUC, `${ma}.webp`);
  return existsSync(tep) ? `/hoc-lieu/lang/${ma}.webp` : null;
}
