import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnhLang } from "@/components/common/anh-lang";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";

/**
 * Trang mở đầu sổ tay số: câu mở "Robot là vật để nghĩ cùng", dòng Papert
 * dẫn tới #vi-sao, nút chính nhảy tới khối "Con mấy tuổi?" (#bat-dau).
 * Ảnh A2 (trẻ chơi NEO One) tự ẩn khi chưa có tệp.
 */
export function HeroSection({
  t,
  locale,
}: {
  t: TrangChuContent["hero"];
  locale: Locale;
}) {
  const hanhTrinh = pathFor("howWeLearn", locale);
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            {t.nhanTren}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.tieuDe[0]}{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-600 to-amber-600 bg-clip-text text-transparent dark:from-primary dark:via-emerald-400 dark:to-amber-400">
              {t.tieuDe[1]}
            </span>{" "}
            {t.tieuDe[2]}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">{t.moTa}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.papert}{" "}
            <Link href={`${hanhTrinh}#vi-sao`} className="font-medium text-primary hover:underline">
              {t.papertLink} &rarr;
            </Link>
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="#bat-dau">
                {t.nutCachHoc}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={hanhTrinh}>{t.nutVideo}</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{t.mucTieu}</p>
        </div>

        <AnhLang
          ma="A2"
          alt={t.nhanTren}
          priority
          className="mx-auto mt-12 max-w-4xl"
        />
      </div>
    </section>
  );
}
