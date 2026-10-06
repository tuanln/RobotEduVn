import type { Locale } from "@/lib/i18n/locales";
import { CACH_HOC_EN } from "./en";
import { CACH_HOC_VI } from "./vi";
import type { CachHocContent } from "./types";

export function cachHoc(locale: Locale): CachHocContent {
  return locale === "en" ? CACH_HOC_EN : CACH_HOC_VI;
}
