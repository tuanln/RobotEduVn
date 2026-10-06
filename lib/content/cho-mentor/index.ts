import type { Locale } from "@/lib/i18n/locales";
import { CHO_MENTOR_EN } from "./en";
import { CHO_MENTOR_VI } from "./vi";
import type { ChoMentorContent } from "./types";

export function choMentor(locale: Locale): ChoMentorContent {
  return locale === "en" ? CHO_MENTOR_EN : CHO_MENTOR_VI;
}
