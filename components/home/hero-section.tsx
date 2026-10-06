import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NHIP } from "@/lib/content/nhip";
import { NHIP_ROUTE_KEY } from "@/lib/content/nhip-slug";
import { NHIP_NHAN_EN } from "@/lib/content/nhip-nhan/en";
import { NHIP_NHAN_VI } from "@/lib/content/nhip-nhan/vi";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";
import type { Locale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";

export function HeroSection({
  t,
  locale,
}: {
  t: TrangChuContent["hero"];
  locale: Locale;
}) {
  const nhan = locale === "en" ? NHIP_NHAN_EN : NHIP_NHAN_VI;
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
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
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            {t.moTa}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href={pathFor("howWeLearn", locale)}>
                {t.nutCachHoc}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={pathFor("videos", locale)}>{t.nutVideo}</Link>
            </Button>
          </div>
          {/* Nhìn thấy ngay ba nhịp trước khi cuộn xuống */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {NHIP.map((nhip, i) => (
              <li key={nhip.slug} className="flex items-center gap-2">
                <Link
                  href={pathFor(NHIP_ROUTE_KEY[nhip.slug], locale)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${nhip.borderColor} ${nhip.bgColor} ${nhip.color} hover:brightness-95`}
                >
                  <span aria-hidden>{nhip.icon}</span>
                  {nhan[nhip.slug].ten}
                </Link>
                {i < NHIP.length - 1 && (
                  <span className="text-muted-foreground/40" aria-hidden>
                    &rarr;
                  </span>
                )}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground/40" aria-hidden>
                &rarr;
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-muted-foreground/40 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                &#8635; {t.lapLai}
              </span>
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            {t.mucTieu}
          </p>
        </div>
      </div>
    </section>
  );
}
