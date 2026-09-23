import { getHubs, getVideos } from "@/lib/sheets";
import { NHIP } from "@/lib/content/nhip";
import { HeroSection } from "@/components/home/hero-section";
import { LearningJourney } from "@/components/home/learning-journey";
import { ImpactStats, type ImpactStat } from "@/components/home/impact-stats";
import { PartnersSection } from "@/components/home/partners-section";
import { CTASection } from "@/components/home/cta-section";

export default async function HomePage() {
  const [hubs, videos] = await Promise.all([getHubs(), getVideos()]);
  const cities = new Set(hubs.map((h) => h.city).filter(Boolean));

  // Số liệu suy ra từ dữ liệu thật để không bao giờ lệch với nội dung trên site.
  const stats: ImpactStat[] = [
    { value: hubs.length, label: "Maker Hub", note: "đang hoạt động" },
    {
      value: cities.size,
      label: "Tỉnh thành",
      note: [...cities].join(" · ") || "chưa có",
    },
    { value: videos.length, label: "Video bài học", note: "miễn phí" },
    { value: NHIP.length, label: "Nhịp", note: "lặp lại, vòng sau khó hơn" },
  ];

  return (
    <>
      <HeroSection />
      <LearningJourney />
      <ImpactStats stats={stats} />
      <PartnersSection />
      <CTASection />
    </>
  );
}
