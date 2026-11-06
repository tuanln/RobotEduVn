import Link from "next/link";
import type { HanhTrinhContent } from "@/lib/content/hanh-trinh-8-chang";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";

/**
 * #vi-sao: năm nguyên tắc Papert, mỗi nguyên tắc một cảnh thật ở Làng
 * (spec 2026-11-06 mục 10.2). Nền tảng FabLab/Arduino/FIRST ghi bằng chữ
 * thường, không logo. "Đọc sâu hơn" dẫn tới trang Triết Lý còn giữ.
 */
export function ViSao({ t, locale }: { t: HanhTrinhContent["viSao"]; locale: Locale }) {
  return (
    <section id="vi-sao" className="scroll-mt-20">
      <h2 className="text-3xl font-bold">{t.tieuDe}</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">{t.moTa}</p>
      <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {t.nguyenTac.map((n, i) => (
          <li key={n.ten} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{i + 1}</p>
            <h3 className="mt-1 text-lg font-bold">{n.ten}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{n.canh}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted-foreground">
        {t.nenTang}{" "}
        <Link href={pathFor("philosophy", locale)} className="font-medium text-primary hover:underline">
          {t.docThem} &rarr;
        </Link>
      </p>
    </section>
  );
}
