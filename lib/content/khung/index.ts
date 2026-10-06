import type { Locale } from "@/lib/i18n/locales";
import { KHUNG_EN } from "./en";
import { KHUNG_VI } from "./vi";
import type { KhungContent } from "./types";

export function khung(locale: Locale): KhungContent {
  return locale === "en" ? KHUNG_EN : KHUNG_VI;
}
