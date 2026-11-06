import type { Metadata } from "next";
import { AnhLang } from "@/components/common/anh-lang";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";
import { TamChang } from "@/components/hanh-trinh/tam-chang";
import { ViSao } from "@/components/hanh-trinh/vi-sao";
import { ChuyenThat } from "@/components/hanh-trinh/chuyen-that";
import { hanhTrinh } from "@/lib/content/hanh-trinh-8-chang";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("howWeLearn", locale, hanhTrinh(locale).meta);
}

/**
 * Trang Hành trình (spec 2026-11-06 mục 4): làng nghề → vòng ba nhịp + chu kỳ
 * 7+1 → tám chặng theo bốn giai đoạn → cam kết 4:1 → #vi-sao → #chuyen-that
 * → bệ phóng. Ba trang con /choi, /lam, /chia-se vẫn dùng cach-hoc.
 */
export default async function HanhTrinhPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = hanhTrinh(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl space-y-20 px-4">
        <div>
          <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
          <section className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold">{t.langNghe.tieuDe}</h2>
            <div className="mt-4 space-y-3 text-muted-foreground">
              {t.langNghe.doan.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AnhLang ma="A3" alt={t.langNghe.tieuDe} />
              <AnhLang ma="A4" alt={t.langNghe.tieuDe} />
            </div>
          </section>
        </div>

        <section>
          <VongLap locale={locale} />
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">{t.chuKy.tieuDe}</h2>
            <p className="mt-2 text-muted-foreground">{t.chuKy.moTa}</p>
          </div>
        </section>

        <section id="tam-chang" className="scroll-mt-20">
          <h2 className="text-3xl font-bold">{t.tamChang.tieuDe}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{t.tamChang.phuDe}</p>
          <div className="mt-8">
            <TamChang t={t} />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-400/60 bg-amber-50 p-8 dark:bg-amber-950/30">
          <h2 className="text-2xl font-bold">{t.camKet.tieuDe}</h2>
          <p className="mt-2 text-muted-foreground">{t.camKet.moTa}</p>
        </section>

        <ViSao t={t.viSao} locale={locale} />

        <ChuyenThat t={t} />

        <section>
          <h2 className="text-3xl font-bold">{t.bePhong.tieuDe}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.bePhong.y.map((y) => (
              <li key={y} className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                {y}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
