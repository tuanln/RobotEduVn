import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { NHIP, getNhip, nhipKeTiep } from "@/lib/content/nhip";
import {
  NHIP_ROUTE_KEY,
  NHIP_SLUGS,
  type NhipSlug,
} from "@/lib/content/nhip-slug";
import { NHIP_NHAN_EN } from "@/lib/content/nhip-nhan/en";
import { NHIP_NHAN_VI } from "@/lib/content/nhip-nhan/vi";
import { cachHoc } from "@/lib/content/cach-hoc";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";
import { pathFor } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getVideos } from "@/lib/sheets";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return NHIP.map((nhip) => ({ slug: nhip.slug }));
}

function laSlugNhip(slug: string): slug is NhipSlug {
  return (NHIP_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = cachHoc(locale);
  if (!laSlugNhip(slug)) return { title: t.nhan.khongTimThay };
  const nhan = locale === "en" ? NHIP_NHAN_EN : NHIP_NHAN_VI;
  return pageMetadata(NHIP_ROUTE_KEY[slug], locale, {
    title: t.nhip[slug].metaTitle,
    description: nhan[slug].moTaNgan,
  });
}

export default async function NhipPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!laSlugNhip(slug)) notFound();
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = cachHoc(locale);
  const chu = t.nhip[slug];
  const nhan = locale === "en" ? NHIP_NHAN_EN : NHIP_NHAN_VI;

  const nhip = getNhip(slug);
  const keTiep = nhipKeTiep(slug);
  const videos = await getVideos();
  const coVideo = videos.some((v) => v.stage === slug);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href={pathFor("howWeLearn", locale)} className="hover:text-foreground">
            {t.tieuDe}
          </Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className={nhip.color}>{nhan[slug].ten}</span>
        </nav>

        <header
          className={`rounded-2xl border-2 ${nhip.borderColor} ${nhip.bgColor} p-8 text-center`}
        >
          <span className="text-7xl" aria-hidden>{nhip.icon}</span>
          <h1 className={`mt-4 text-4xl font-extrabold ${nhip.color}`}>
            {nhan[slug].ten}
          </h1>
          <p className="mt-2 text-lg font-medium">{nhan[slug].khauHieu}</p>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden>{nhip.huyHieu}</span>
            {nhan[slug].tenHuyHieu}
          </p>
        </header>

        <div className="mt-8 space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            {chu.moTaDai.split("\n\n").map((doan, i) => (
              <p key={i} className="mb-3 leading-relaxed text-muted-foreground">
                {doan}
              </p>
            ))}
          </section>

          <section className="rounded-xl border border-primary/40 bg-primary/5 p-6">
            <h2 className="text-xl font-bold">{t.nhan.taiLangMaker}</h2>
            <p className="mt-2 text-muted-foreground">{chu.taiLangMaker}</p>
          </section>

          {nhip.tramChoi && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">{t.nhan.namNhomTram}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {nhip.tramChoi.map((tram) => (
                  <span
                    key={tram}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium ${nhip.borderColor} ${nhip.bgColor}`}
                  >
                    {tram}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t.nhan.buoiDau}
              </p>
            </section>
          )}

          {/* Thư viện khóa học chỉ có tiếng Việt — không hiện ở bản /en */}
          {slug === "lam" && locale === "vi" && (
            <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Thư viện khóa học</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  7 khóa robotics và IoT của Maker Việt: ThingBot, kit K12 Maker, VORC, CoBot, Đại sứ Robotics.
                </p>
              </div>
              <Link
                href="/khoa-hoc"
                className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Mở thư viện
              </Link>
            </section>
          )}

          {nhip.huong && (
            <section>
              <h2 className="text-xl font-bold">{t.nhan.baHuong}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.nhan.baHuongGhiChu}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {nhip.huong.map((h, i) => (
                  <div
                    key={h.title}
                    className="flex flex-col rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{chu.huong?.[i].title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {chu.huong?.[i].doing}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t.nhan.doNghe}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {h.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {chu.nguyenTac && (
            <section>
              <h2 className="text-xl font-bold">{t.nhan.baNguyenTac}</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {chu.nguyenTac.map((nt) => (
                  <div
                    key={nt.title}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">{nt.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {nt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {coVideo ? (
            <section className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="text-xl font-bold">{t.nhan.videoNhip}</h2>
              <Button asChild className="mt-4">
                <Link href={`${pathFor("videos", locale)}?stage=${nhip.slug}`}>
                  {t.nhan.xemVideo} <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </section>
          ) : (
            <section className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t.nhan.chuaCoVideo}
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href={pathFor("makerHubs", locale)}>{t.nhan.timHub}</Link>
              </Button>
            </section>
          )}

          {/* Vòng lặp: sau nhịp cuối thì dẫn ngược về nhịp đầu */}
          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={pathFor(NHIP_ROUTE_KEY[keTiep.slug], locale)}>
                {slug === "chia-se" ? (
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
                ) : null}
                {`${t.nhan.nhipTiepTheo} ${nhan[keTiep.slug].ten}`}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
