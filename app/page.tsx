import { HeroSection } from "@/components/home/hero-section";
import { LearningJourney } from "@/components/home/learning-journey";
import { ImpactStats } from "@/components/home/impact-stats";
import { PartnersSection } from "@/components/home/partners-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LearningJourney />
      <ImpactStats />
      <PartnersSection />
      <CTASection />
    </>
  );
}
