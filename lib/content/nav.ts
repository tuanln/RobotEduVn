import type { Locale } from "@/lib/i18n/locales";
import { pathFor, type RouteKey } from "@/lib/i18n/routes";

/**
 * Menu sổ tay số (spec 2026-11-06 mục 4, sửa 07/11/2026): bốn mục tiếng Việt, ba mục
 * tiếng Anh. Mô Phỏng không còn đứng riêng trong menu tiếng Việt — nó nằm trong Khóa Học
 * (/khoa-hoc, mục đầu); bản tiếng Anh không có Khóa Học nên vẫn giữ Simulator trong menu.
 * Trang Chủ không còn trong menu — logo đã dẫn về trang chủ. Các trang Triết Lý,
 * Công Cụ, Maker Hub, Cho Mentor, Video Hub, Cộng Đồng vẫn tồn tại, chỉ dẫn từ
 * chân trang. Nhãn tiếng Anh giữ "Làng Maker" nguyên tiếng Việt (spec 2026-09-23
 * mục 2.6).
 */
const MUC: { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: "howWeLearn", label: { vi: "Hành Trình", en: "How We Learn" } },
  { key: "makerVillage", label: { vi: "Làng Maker", en: "Làng Maker" } },
];

/**
 * Sân chơi và Khóa học chỉ có bản tiếng Việt và cố ý KHÔNG là RouteKey: thêm
 * vào ROUTES sẽ bắt cổng check:en, hreflang và sitemap đòi bản dịch không có.
 * Mô phỏng là app riêng chuyển tiếp ngầm (next.config.ts), cũng không là RouteKey.
 */
const SAN_CHOI = { label: "Sân Chơi", href: "/san-choi" };
const KHOA_HOC = { label: "Khóa Học", href: "/khoa-hoc" };
const MO_PHONG: Record<Locale, { label: string; href: string }> = {
  vi: { label: "Mô Phỏng", href: "/mo-phong" }, // không dùng trong menu vi, giữ để nơi khác tham chiếu
  en: { label: "Simulator", href: "/mo-phong" },
};

export function navItems(locale: Locale): { label: string; href: string }[] {
  const [hanhTrinh, langMaker] = MUC.map(({ key, label }) => ({
    label: label[locale],
    href: pathFor(key, locale),
  }));
  if (locale === "vi") {
    return [hanhTrinh, SAN_CHOI, KHOA_HOC, langMaker];
  }
  return [hanhTrinh, langMaker, MO_PHONG.en];
}
