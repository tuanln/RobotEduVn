import type { Locale } from "@/lib/i18n/locales";
import { pathFor, type RouteKey } from "@/lib/i18n/routes";

/**
 * Chín mục menu. Nhãn tiếng Việt giữ nguyên bản đang chạy.
 * Nhãn tiếng Anh giữ "Làng Maker" và "Maker Hub" nguyên tiếng Việt theo
 * quy tắc thuật ngữ (spec 2026-09-23 mục 2.6).
 */
const MUC: { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: "home", label: { vi: "Trang Chủ", en: "Home" } },
  { key: "howWeLearn", label: { vi: "Cách Học", en: "How We Learn" } },
  { key: "makerVillage", label: { vi: "Làng Maker", en: "Làng Maker" } },
  { key: "tools", label: { vi: "Công Cụ", en: "Tools" } },
  { key: "makerHubs", label: { vi: "Maker Hub", en: "Maker Hub" } },
  { key: "philosophy", label: { vi: "Triết Lý Papert", en: "Papert’s Philosophy" } },
  { key: "forMentors", label: { vi: "Cho Mentor", en: "For Mentors" } },
  { key: "videos", label: { vi: "Video Hub", en: "Video Hub" } },
  { key: "community", label: { vi: "Cộng Đồng", en: "Community" } },
];

export function navItems(locale: Locale): { label: string; href: string }[] {
  return MUC.map(({ key, label }) => ({
    label: label[locale],
    href: pathFor(key, locale),
  }));
}
