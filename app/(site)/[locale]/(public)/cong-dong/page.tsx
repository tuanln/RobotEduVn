import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";
import { getHubs, getVideos } from "@/lib/sheets";
import { congDong } from "@/lib/content/cong-dong";
import { localeOf } from "@/lib/i18n/params";
import { pathFor } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("community", locale, congDong(locale).tongQuan.meta);
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = congDong(locale).tongQuan;
  const [hubs, videos] = await Promise.all([getHubs(), getVideos()]);
  const cities = new Set(hubs.map((h) => h.city).filter(Boolean));

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />

        {/* Số liệu lấy từ dữ liệu thật, không phải con số ước lượng */}
        <div className="mb-12 grid grid-cols-3 gap-4 text-center">
          {[
            { value: String(hubs.length), label: t.soLieu.hub },
            { value: String(cities.size), label: t.soLieu.tinh },
            { value: String(videos.length), label: t.soLieu.video },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="text-2xl font-extrabold text-primary">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.muc.map((section) => (
            <Link
              key={section.route}
              href={pathFor(section.route, locale)}
              className={`rounded-xl border ${section.color} p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}
            >
              <span className="text-4xl">{section.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {section.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* External */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold">{t.ketNoi}</h2>
          <div className="mt-4 space-y-3">
            {t.linkNgoai.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div>
                  <h3 className="text-sm font-semibold">{link.name}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
