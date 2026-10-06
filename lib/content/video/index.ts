import type { Locale } from "@/lib/i18n/locales";
import { VIDEO_EN } from "./en";
import { VIDEO_VI } from "./vi";
import type { VideoContent } from "./types";

export function videoChu(locale: Locale): VideoContent {
  return locale === "en" ? VIDEO_EN : VIDEO_VI;
}
