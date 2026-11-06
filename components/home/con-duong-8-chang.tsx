import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnhLang } from "@/components/common/anh-lang";
import { SectionHeader } from "@/components/common/section-header";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";

/** Ảnh A1 (sơ đồ tám chặng) và nút sang trang Hành trình. */
export function ConDuong8Chang({
  t,
  locale,
}: {
  t: TrangChuContent["conDuong"];
  locale: Locale;
}) {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <AnhLang ma="A1" alt={t.altAnh} width={2752} height={1490} className="mx-auto" />
        <Button size="lg" className="mt-10" asChild>
          <Link href={pathFor("howWeLearn", locale)}>
            {t.nut}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
