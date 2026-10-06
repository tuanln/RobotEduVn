import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";
import { cachHoc } from "@/lib/content/cach-hoc";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("howWeLearn", locale, cachHoc(locale).meta);
}

export default async function HanhTrinhPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = cachHoc(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <VongLap locale={locale} />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          {t.ghiChuTuoi}
        </p>
      </div>
    </div>
  );
}
