import { BookOpen, Download, ExternalLink } from "lucide-react";
import { DOC_PAPERT_EN } from "@/lib/content/doc-papert/en";
import { DOC_PAPERT_VI } from "@/lib/content/doc-papert/vi";
import type { DocPapertContent } from "@/lib/content/doc-papert/types";
import type { Locale } from "@/lib/i18n/locales";

function noiDung(locale: Locale): DocPapertContent {
  return locale === "en" ? DOC_PAPERT_EN : DOC_PAPERT_VI;
}

/**
 * Canon DOMAIN_MAP mục 1: vai trò số một của robot.edu.vn là "phổ cập Papert".
 * Link PDF nằm trên CDN của MIT nên có thể đổi — luôn kèm link trang chủ MIT
 * và bản Internet Archive để người đọc tự tìm lại được.
 * Ba link kiểm tra HTTP 200 ngày 2026-09-06.
 */
export function DocPapert({ locale }: { locale: Locale }) {
  const t = noiDung(locale);

  return (
    <section className="rounded-2xl border border-border bg-card p-8">
      <div className="flex items-start gap-4">
        <BookOpen className="mt-1 h-6 w-6 flex-shrink-0 text-primary" aria-hidden />
        <div>
          <h2 className="text-xl font-bold">{t.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.introPrefix}
            <em>{t.bookTitle}</em>
            {t.introSuffix}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={t.links.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden />
              {t.downloadLabel}
              <span className="opacity-70">{t.downloadSize}</span>
            </a>
            <a
              href={t.links.archiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {t.readOnlineLabel}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {t.officialSourceLabel}{" "}
            <a
              href={t.links.mitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t.officialSourceLinkText}
            </a>
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
            <p className="text-sm">
              <span className="font-semibold">{t.communityBold}</span>
              {t.communityMiddle}
              <em>{t.communityBookTitle}</em>
              {t.communityAfter}
            </p>
            <a
              href={t.links.mailto}
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              {t.notifyLinkText} &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
