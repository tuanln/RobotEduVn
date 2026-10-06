import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { StageBadge } from "@/components/common/stage-badge";
import { congCu } from "@/lib/content/cong-cu";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("tools", locale, congCu(locale).meta);
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = congCu(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-sm text-muted-foreground">
          {t.ghiChu}
        </p>

        <div className="space-y-6">
          {t.tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <StageBadge stage={tool.nhip} locale={locale} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tool.type} &bull; {tool.origin}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:w-48">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
