"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/common/section-header";

export interface ImpactStat {
  value: number;
  label: string;
  suffix?: string;
  note?: string;
  /** "vi" khi note là dữ liệu tiếng Việt hiện trên trang tiếng Anh. */
  noteLang?: "vi";
}

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

function StatCard({
  value,
  label,
  suffix,
  note,
  noteLang,
  soLocale,
}: ImpactStat & { soLocale: string }) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-primary md:text-5xl">
        {count.toLocaleString(soLocale)}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note && (
        <p lang={noteLang} className="mt-1 text-xs text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}

export function ImpactStats({
  stats,
  tieuDe,
  phuDe,
  mucTieuDam,
  mucTieuThan,
  locale,
}: {
  stats: ImpactStat[];
  tieuDe: string;
  phuDe: string;
  mucTieuDam: string;
  mucTieuThan: string;
  locale: "vi" | "en";
}) {
  const soLocale = locale === "en" ? "en-US" : "vi-VN";
  return (
    <section className="border-y border-border bg-card py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title={tieuDe}
          subtitle={phuDe}
        />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} soLocale={soLocale} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-dashed border-primary/40 bg-primary/5 px-6 py-4 text-center text-sm">
          <span className="font-semibold">{mucTieuDam}</span> {mucTieuThan}
        </p>
      </div>
    </section>
  );
}
