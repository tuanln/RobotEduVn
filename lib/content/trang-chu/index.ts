import type { Locale } from "@/lib/i18n/locales";
import { TRANG_CHU_EN } from "./en";
import { TRANG_CHU_VI } from "./vi";
import type { TrangChuContent } from "./types";

export function trangChu(locale: Locale): TrangChuContent {
  return locale === "en" ? TRANG_CHU_EN : TRANG_CHU_VI;
}
