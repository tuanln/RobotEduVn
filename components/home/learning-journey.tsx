import Link from "next/link";
import { VongLap } from "@/components/nhip/vong-lap";
import { SectionHeader } from "@/components/common/section-header";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";

export function LearningJourney({
  t,
  locale,
}: {
  t: TrangChuContent["baNhip"];
  locale: Locale;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title={t.tieuDe}
          subtitle={t.phuDe}
        />

        <VongLap locale={locale} />

        <div className="mt-8 text-center">
          <Link
            href={pathFor("howWeLearn", locale)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {t.xemChiTiet} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
