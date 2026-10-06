import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { choMentor } from "@/lib/content/cho-mentor";
import { localeOf } from "@/lib/i18n/params";
import { pathFor } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("forMentors", locale, choMentor(locale).meta);
}

export default async function MentorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = choMentor(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title={t.tieuDe}
          subtitle={t.phuDe}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.taiNguyen.map((res) => (
            <Link
              key={res.title}
              href={pathFor(res.route, locale)}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="text-4xl">{res.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{res.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{res.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold">{t.cachTroThanh}</h2>
          <ol className="mt-6 space-y-4">
            {t.buoc.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <p className="pt-1 text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <a href="mailto:lang@makerviet.org">
                {t.nutLienHe}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
