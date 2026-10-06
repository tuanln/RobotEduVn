import type { Locale } from "@/lib/i18n/locales";
import { CONG_CU_EN } from "./en";
import { CONG_CU_VI } from "./vi";
import type { CongCuContent } from "./types";

export function congCu(locale: Locale): CongCuContent {
  return locale === "en" ? CONG_CU_EN : CONG_CU_VI;
}
