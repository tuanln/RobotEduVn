import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { STAGES } from "@/lib/content/stages";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            OpenSTEM Foundation
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Khám Phá{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-600 to-amber-600 bg-clip-text text-transparent dark:from-primary dark:via-emerald-400 dark:to-amber-400">
              STEM & Robotics
            </span>{" "}
            Qua Trải Nghiệm
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Học đi đôi với Làm — Mỗi trẻ em là một Nhà Sáng Tạo. Lộ trình 5
            bước từ Khám phá đến Chia sẻ, theo triết lý Seymour Papert.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/hanh-trinh">
                Bắt Đầu Hành Trình
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/video-hub">Xem Video Hub</Link>
            </Button>
          </div>
          {/* Nhìn thấy ngay 5 chặng trước khi cuộn xuống */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {STAGES.map((stage, i) => (
              <li key={stage.slug} className="flex items-center gap-2">
                <Link
                  href={`/hanh-trinh/${stage.slug}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${stage.borderColor} ${stage.bgColor} ${stage.color} hover:brightness-95`}
                >
                  <span aria-hidden>{stage.icon}</span>
                  {stage.titleVi}
                </Link>
                {i < STAGES.length - 1 && (
                  <span className="text-muted-foreground/40" aria-hidden>
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            Mục tiêu 5 năm: 1 triệu trẻ em Việt Nam tiếp cận STEM &amp; Robot
          </p>
        </div>
      </div>
    </section>
  );
}
