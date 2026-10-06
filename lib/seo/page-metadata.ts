import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor, type RouteKey } from "@/lib/i18n/routes";
import { TRANSLATED_ROUTES } from "@/lib/i18n/translated";
import { ogImages } from "./metadata";

/**
 * Metadata chuẩn cho một trang công khai. Gác TRANSLATED_ROUTES: route chưa
 * dịch thì KHÔNG khai hreflang (khai là nói dối Google rằng có bản dịch).
 * Luôn tự mang `images` vì openGraph của trang ghi đè nguyên khối của layout.
 */
export function pageMetadata(
  key: RouteKey,
  locale: Locale,
  meta: { title: string; description: string },
): Metadata {
  const url = pathFor(key, locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      ...(TRANSLATED_ROUTES.has(key) && {
        languages: {
          vi: pathFor(key, "vi"),
          en: pathFor(key, "en"),
          "x-default": pathFor(key, "vi"),
        },
      }),
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "vi_VN",
      url,
      title: meta.title,
      description: meta.description,
      images: ogImages(meta.title),
    },
  };
}
