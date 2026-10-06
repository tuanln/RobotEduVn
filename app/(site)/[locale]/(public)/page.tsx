import type { Metadata } from "next";
import { getHubs, getVideos } from "@/lib/sheets";
import { NHIP } from "@/lib/content/nhip";
import { trangChu } from "@/lib/content/trang-chu";
import { HeroSection } from "@/components/home/hero-section";
import { LearningJourney } from "@/components/home/learning-journey";
import { ImpactStats, type ImpactStat } from "@/components/home/impact-stats";
import { PartnersSection } from "@/components/home/partners-section";
import { CTASection } from "@/components/home/cta-section";
import { localeOf } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  const { meta } = trangChu(locale);
  // Tiêu đề trang chủ đã chứa tên site — "absolute" để template
  // "%s | Robot.Edu.VN" của layout không nhân đôi tên.
  return { ...pageMetadata("home", locale, meta), title: { absolute: meta.title } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = trangChu(locale);
  const s = t.soLieu;
  const [hubs, videos] = await Promise.all([getHubs(), getVideos()]);
  const cities = new Set(hubs.map((h) => h.city).filter(Boolean));

  // Số liệu suy ra từ dữ liệu thật để không bao giờ lệch với nội dung trên site.
  const stats: ImpactStat[] = [
    { value: hubs.length, label: s.hub.label, note: s.hub.note },
    {
      value: cities.size,
      label: s.tinh.label,
      // Tên tỉnh là dữ liệu tiếng Việt — trang en đánh dấu lang="vi".
      note: [...cities].join(" · ") || s.tinh.chuaCo,
      noteLang: cities.size > 0 && locale === "en" ? "vi" : undefined,
    },
    { value: videos.length, label: s.video.label, note: s.video.note },
    { value: NHIP.length, label: s.nhip.label, note: s.nhip.note },
  ];

  return (
    <>
      <HeroSection t={t.hero} locale={locale} />
      <LearningJourney t={t.baNhip} locale={locale} />
      <ImpactStats
        stats={stats}
        tieuDe={s.tieuDe}
        phuDe={s.phuDe}
        mucTieuDam={s.mucTieuDam}
        mucTieuThan={s.mucTieuThan}
        locale={locale}
      />
      <PartnersSection t={t.doiTac} />
      <CTASection t={t.cta} locale={locale} />
    </>
  );
}
