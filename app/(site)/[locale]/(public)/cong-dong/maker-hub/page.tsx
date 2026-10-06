import type { Metadata } from "next";
import { MapPin, Clock, Users, Cpu, Mail, ExternalLink } from "lucide-react";
import { getHubs } from "@/lib/sheets";
import { hubMapUrl } from "@/lib/content/hubs";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import type { MakerHub } from "@/lib/types";
import type { CongDongContent } from "@/lib/content/cong-dong/types";
import type { Locale } from "@/lib/i18n/locales";
import { congDong, mailto } from "@/lib/content/cong-dong";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("makerHubs", locale, congDong(locale).hub.meta);
}

const typeColors: Record<MakerHub["type"], string> = {
  "fpt-shop": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  clb: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "truong-hoc": "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

function HubCard({
  hub,
  t,
  locale,
}: {
  hub: MakerHub;
  t: CongDongContent["hub"];
  locale: Locale;
}) {
  const pending = <span className="text-muted-foreground">{t.dangCapNhat}</span>;
  // Tên hub, địa chỉ, tên mentor là dữ liệu tiếng Việt — trang en đánh dấu lang="vi".
  const duLieu = locale === "en" ? "vi" : undefined;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 lang={duLieu} className="text-lg font-bold leading-snug">
            {hub.name}
          </h3>
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[hub.type]}`}
          >
            {t.loai[hub.type]}
          </span>
        </div>
        <MapPin className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
      </div>

      <p lang={duLieu} className="mt-4 text-sm text-muted-foreground">
        {hub.address}
      </p>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        <Detail icon={Clock} label={t.lich}>
          {hub.schedule ? <span lang={duLieu}>{hub.schedule}</span> : pending}
        </Detail>
        <Detail icon={Users} label={t.mentor}>
          {hub.mentors.length > 0 ? (
            <span lang={duLieu}>{hub.mentors.join(", ")}</span>
          ) : (
            pending
          )}
        </Detail>
        <Detail icon={Cpu} label={t.thietBi}>
          {hub.equipment.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {hub.equipment.map((eq) => (
                <span
                  key={eq}
                  className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {eq}
                </span>
              ))}
            </div>
          ) : (
            pending
          )}
        </Detail>
        <Detail icon={Mail} label={t.lienHe}>
          <a
            href={`mailto:${hub.contact}`}
            className="text-primary hover:underline"
          >
            {hub.contact}
          </a>
        </Detail>
      </div>

      <a
        href={hubMapUrl(hub)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {t.banDo}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    </article>
  );
}

export default async function MakerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = congDong(locale).hub;
  const duLieu = locale === "en" ? "vi" : undefined;
  const hubs = await getHubs();

  const cities = [...new Set(hubs.map((h) => h.city).filter(Boolean))];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title={t.tieuDe}
          subtitle={t.phuDe}
        />

        {hubs.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-4 text-center sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-3xl font-extrabold text-primary">
                {hubs.length}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.dangHoatDong}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-3xl font-extrabold text-primary">
                {cities.length}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.tinh}</p>
            </div>
            <div className="col-span-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 sm:col-span-1">
              <div className="text-sm font-semibold">{t.moHub}</div>
              <a
                href={mailto(t.mailSubject)}
                className="mt-1 inline-block text-sm text-primary hover:underline"
              >
                {t.guiDangKy} &rarr;
              </a>
            </div>
          </div>
        )}

        {cities.map((city) => (
          <section key={city} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              <span lang={duLieu}>{city}</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {hubs
                .filter((h) => h.city === city)
                .map((hub) => (
                  <HubCard key={hub.id} hub={hub} t={t} locale={locale} />
                ))}
            </div>
          </section>
        ))}

        {hubs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-medium">{t.rongTieuDe}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.rongMoTa}
            </p>
            <Button asChild className="mt-6">
              <a href={mailto(t.mailSubject)}>{t.rongNut}</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
