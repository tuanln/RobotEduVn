import Link from "next/link";
import { VongLap } from "@/components/nhip/vong-lap";
import { SectionHeader } from "@/components/common/section-header";

export function LearningJourney() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Ba Nhịp Lặp Lại"
          subtitle='Theo triết lý Kiến tạo của Seymour Papert — "Học bằng làm"'
        />

        <VongLap />

        <div className="mt-8 text-center">
          <Link
            href="/hanh-trinh"
            className="text-sm font-medium text-primary hover:underline"
          >
            Xem chi tiết cách học &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
