import type { Locale } from "@/lib/i18n/locales";
import { CONG_DONG_EN } from "./en";
import { CONG_DONG_VI } from "./vi";
import type { CongDongContent } from "./types";

export function congDong(locale: Locale): CongDongContent {
  return locale === "en" ? CONG_DONG_EN : CONG_DONG_VI;
}

/** mailto: có tiêu đề, mã hoá đúng chuẩn thay vì "%20" ghi tay. */
export function mailto(subject: string): string {
  return `mailto:lang@makerviet.org?subject=${encodeURIComponent(subject)}`;
}
