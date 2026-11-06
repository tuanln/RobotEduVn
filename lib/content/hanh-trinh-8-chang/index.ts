import type { Locale } from "@/lib/i18n/locales";
import { HANH_TRINH_EN } from "./en";
import { HANH_TRINH_VI } from "./vi";
import type { HanhTrinhContent } from "./types";

export function hanhTrinh(locale: Locale): HanhTrinhContent {
  return locale === "en" ? HANH_TRINH_EN : HANH_TRINH_VI;
}

export type { Chang, ChuyenThat, GiaiDoan, HanhTrinhContent, MaGiaiDoan, NguyenTac } from "./types";
