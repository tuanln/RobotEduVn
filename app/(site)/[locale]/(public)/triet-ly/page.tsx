import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";
import { DocPapert } from "@/components/nhip/doc-papert";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locales";
import { TRIET_LY_EN } from "@/lib/content/triet-ly/en";
import { TRIET_LY_VI } from "@/lib/content/triet-ly/vi";
import type { TrietLyContent } from "@/lib/content/triet-ly/types";

function noiDung(locale: Locale): TrietLyContent {
  return locale === "en" ? TRIET_LY_EN : TRIET_LY_VI;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { meta } = noiDung(locale);
  return { title: meta.title, description: meta.description };
}

export default async function PhilosophyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = noiDung(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader title={t.header.title} subtitle={t.header.subtitle} />

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{t.vongLap.heading}</h2>
          <p className="mb-6 text-muted-foreground">{t.vongLap.intro}</p>
          <VongLap />
        </section>

        <div className="space-y-8">
          {t.truCot.map((pillar, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start gap-4">
                <span className="text-5xl">{pillar.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">
                    {t.truCotHeading} {i + 1}: {pillar.title}
                  </h2>
                  <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {pillar.quote}
                  </blockquote>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {pillar.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">{t.nguyenLyHeading}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.nguyenLy.map((n) => (
              <div key={n.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <DocPapert />
        </div>
      </div>
    </div>
  );
}
