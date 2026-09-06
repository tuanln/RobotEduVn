"use client";

import Link from "next/link";
import { NHIP } from "@/lib/content/nhip";
import { SectionHeader } from "@/components/common/section-header";

export function LearningJourney() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Vòng Lặp Ba Nhịp"
          subtitle='Theo triết lý Kiến tạo của Seymour Papert — "Học bằng làm"'
        />

        {/* Flow Chart */}
        <div className="relative">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between gap-2">
              {NHIP.map((nhip, i) => (
                <div key={nhip.slug} className="flex items-center">
                  <Link
                    href={`/hanh-trinh/${nhip.slug}`}
                    className={`group relative flex w-52 flex-col items-center rounded-xl border ${nhip.borderColor} ${nhip.bgColor} p-6 pt-8 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/5`}
                  >
                    <span
                      className={`absolute -top-3 flex h-7 w-7 items-center justify-center rounded-full border bg-background text-sm font-bold ${nhip.borderColor} ${nhip.color}`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-4xl" aria-hidden>
                      {nhip.icon}
                    </span>
                    <h3 className={`mt-3 text-lg font-bold ${nhip.color}`}>
                      {nhip.ten}
                    </h3>
                    <p className="mt-3 flex items-center gap-1.5 text-center text-xs font-medium text-muted-foreground">
                      <span aria-hidden>{nhip.huyHieu}</span>
                      {nhip.tenHuyHieu}
                    </p>
                  </Link>
                  {i < NHIP.length - 1 && (
                    <div
                      className="mx-1 flex-shrink-0 text-2xl text-muted-foreground"
                      aria-hidden
                    >
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical flow */}
          <div className="space-y-3 lg:hidden">
            {NHIP.map((nhip, i) => (
              <div key={nhip.slug}>
                <Link
                  href={`/hanh-trinh/${nhip.slug}`}
                  className={`flex items-center gap-4 rounded-xl border ${nhip.borderColor} ${nhip.bgColor} p-4 transition-all hover:scale-[1.02]`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border bg-background text-sm font-bold ${nhip.borderColor} ${nhip.color}`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-3xl" aria-hidden>
                    {nhip.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-bold ${nhip.color}`}>
                      {nhip.ten}
                    </h3>
                  </div>
                  <span className="text-muted-foreground" aria-hidden>
                    &rarr;
                  </span>
                </Link>
                {i < NHIP.length - 1 && (
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
