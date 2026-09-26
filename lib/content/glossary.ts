import type { Locale } from "@/lib/i18n/locales";

/**
 * Tám thuật ngữ làng, chốt cách dịch một lần cho cả site (spec 2026-09-23 mục 2.6).
 *
 * Chủ dự án chốt: GIỮ tên tiếng Việt, kèm chú giải tiếng Anh. Không dịch hẳn
 * sang tiếng Anh (mất bản sắc, lại trùng từ vựng đã mòn ở nước ngoài) và không
 * để trần (người đọc mới không hiểu gì).
 *
 * Quy tắc hiển thị: lần đầu xuất hiện trên MỖI trang thì kèm chú giải; các lần
 * sau chỉ còn tên tiếng Việt.
 */
export const GLOSSARY = {
  langMaker: { vi: "Làng Maker", en: "the Maker Village" },
  danLang: {
    vi: "Dân làng",
    en: "Villager — a newcomer; plays first, registers nothing",
  },
  thoHocViec: { vi: "Thợ học việc", en: "Apprentice" },
  thoCa: {
    vi: "Thợ cả",
    en: "Master — leads the session by making alongside, not by lecturing",
  },
  giaLang: { vi: "Già làng", en: "Village Elder" },
  ngheNhan: {
    vi: "Nghệ nhân",
    en: "Artisan — a trade master from outside the village; stands beside the ladder, not on it",
  },
  baNhip: { vi: "Chơi – Làm – Chia sẻ", en: "Play – Make – Share" },
  makerHub: { vi: "Maker Hub", en: "Maker Hub" },
} as const satisfies Record<string, Record<Locale, string>>;

export type GlossaryKey = keyof typeof GLOSSARY;

export function gloss(key: GlossaryKey, locale: Locale): string {
  return GLOSSARY[key][locale];
}
