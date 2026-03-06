"use client";

import Link from "next/link";
import { STAGES } from "@/lib/data";
import { SectionHeader } from "@/components/common/section-header";

export function LearningJourney() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Hành Trình Học 5 Bước"
          subtitle='Theo triết lý Kiến tạo của Seymour Papert — "Học bằng làm"'
        />

        {/* Flow Chart */}
        <div className="relative">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between gap-2">
              {STAGES.map((stage, i) => (
                <div key={stage.slug} className="flex items-center">
                  <Link
                    href={`/hanh-trinh/${stage.slug}`}
                    className={`group relative flex w-52 flex-col items-center rounded-xl border ${stage.borderColor} ${stage.bgColor} p-6 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/5`}
                  >
                    <span className="text-4xl">{stage.icon}</span>
                    <h3
                      className={`mt-3 text-lg font-bold ${stage.color}`}
                    >
                      {stage.titleVi}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stage.ageRange} tuổi
                    </p>
                    <p className="mt-2 text-center text-xs text-muted-foreground/80">
                      {stage.tools.join(", ")}
                    </p>
                  </Link>
                  {i < STAGES.length - 1 && (
                    <div className="mx-1 flex-shrink-0 text-2xl text-muted-foreground/40">
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical flow */}
          <div className="space-y-3 lg:hidden">
            {STAGES.map((stage, i) => (
              <div key={stage.slug}>
                <Link
                  href={`/hanh-trinh/${stage.slug}`}
                  className={`flex items-center gap-4 rounded-xl border ${stage.borderColor} ${stage.bgColor} p-4 transition-all hover:scale-[1.02]`}
                >
                  <span className="text-3xl">{stage.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-bold ${stage.color}`}>
                      {stage.titleVi}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stage.ageRange} tuổi &bull; {stage.tools.join(", ")}
                    </p>
                  </div>
                  <span className="text-muted-foreground/40">&rarr;</span>
                </Link>
                {i < STAGES.length - 1 && (
                  <div className="ml-8 h-3 border-l-2 border-dashed border-muted-foreground/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/hanh-trinh"
            className="text-sm font-medium text-primary hover:underline"
          >
            Xem chi tiết lộ trình học &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
