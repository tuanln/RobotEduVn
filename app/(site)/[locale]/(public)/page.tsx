import type { Metadata } from "next";
import { trangChu } from "@/lib/content/trang-chu";
import { hanhTrinh } from "@/lib/content/hanh-trinh-8-chang";
import { HeroSection } from "@/components/home/hero-section";
import { ConMayTuoi } from "@/components/home/con-may-tuoi";
import { ConDuong8Chang } from "@/components/home/con-duong-8-chang";
import { BaMang } from "@/components/home/ba-mang";
import { FanRoc } from "@/components/home/fanroc";
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

/**
 * Trang mở đầu sổ tay số (spec 2026-11-06 mục 4): câu mở → Con mấy tuổi?
 * → Con đường 8 chặng → Một robot ba mảng → Mùa thi FanRoc → Đối tác → Lời mời.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = trangChu(locale);

  return (
    <>
      <HeroSection t={t.hero} locale={locale} />
      <ConMayTuoi t={hanhTrinh(locale)} />
      <ConDuong8Chang t={t.conDuong} locale={locale} />
      <BaMang t={t.baMang} />
      <FanRoc t={t.fanroc} />
      <PartnersSection t={t.doiTac} />
      <CTASection t={t.cta} locale={locale} />
    </>
  );
}
