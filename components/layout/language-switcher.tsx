"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/locales";
import { alternatePath } from "@/lib/i18n/routes";

/**
 * Chuyển sang ĐÚNG trang tương ứng, không đá về trang chủ (spec mục 2.4).
 * Trang không có bản đối ứng thì nút bị vô hiệu, không dẫn tới 404.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const to: Locale = locale === "vi" ? "en" : "vi";
  const href = alternatePath(pathname, to);
  const nhan = to === "en" ? "English" : "Tiếng Việt";

  if (href === null) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        title={
          locale === "vi"
            ? "Trang này chưa có bản tiếng Anh"
            : "This page has no Vietnamese version yet"
        }
      >
        <Languages className="h-4 w-4" aria-hidden />
        {nhan}
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href={href} hrefLang={to} aria-label={`Chuyển sang ${nhan}`}>
        <Languages className="h-4 w-4" aria-hidden />
        {nhan}
      </Link>
    </Button>
  );
}
