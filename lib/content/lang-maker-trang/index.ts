import type { Locale } from "@/lib/i18n/locales";
import { LM_EN } from "./en";
import { LM_VI } from "./vi";
import type { LangMakerTrangContent } from "./types";

export function langMakerTrang(locale: Locale): LangMakerTrangContent {
  return locale === "en" ? LM_EN : LM_VI;
}
