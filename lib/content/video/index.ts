import type { Locale } from "@/lib/i18n/locales";
import { VIDEO_EN } from "./en";
import { VIDEO_VI } from "./vi";
import type { VideoContent } from "./types";

/** "10-15" → "10-15 tuổi" (vi, giữ nguyên) | "Ages 10–15" (en, gạch nối en dash). */
export function nhanTuoi(khuon: string, range: string, locale: Locale): string {
  return khuon.replace("{range}", locale === "en" ? range.replace("-", "–") : range);
}

export function videoChu(locale: Locale): VideoContent {
  return locale === "en" ? VIDEO_EN : VIDEO_VI;
}
