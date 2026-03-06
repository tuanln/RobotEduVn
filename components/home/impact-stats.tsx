"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/common/section-header";

const stats = [
  { value: 1000000, label: "Trẻ em mục tiêu", suffix: "", prefix: "" },
  { value: 50, label: "CLB Robotics", suffix: "+", prefix: "" },
  { value: 34, label: "Tỉnh thành", suffix: "", prefix: "" },
  { value: 200, label: "Hoạt động GCompris", suffix: "+", prefix: "" },
];

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
}: {
  value: number;
  label: string;
  suffix: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-primary md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function ImpactStats() {
  return (
    <section className="border-y border-border bg-card py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Tác Động Của Chúng Ta"
          subtitle="Cùng hướng tới mục tiêu 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot"
        />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
