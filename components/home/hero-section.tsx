import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NHIP } from "@/lib/content/nhip";

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
            Chơi{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-600 to-amber-600 bg-clip-text text-transparent dark:from-primary dark:via-emerald-400 dark:to-amber-400">
              Làm
            </span>{" "}
            Chia sẻ
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Ba nhịp lặp lại ở Làng Maker: chơi cho tò mò, bắt tay làm ra thứ
            chạy được, rồi kể lại cho người khác nghe.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/hanh-trinh">
                Xem cách học
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/video-hub">Xem Video Hub</Link>
            </Button>
          </div>
          {/* Nhìn thấy ngay ba nhịp trước khi cuộn xuống */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {NHIP.map((nhip, i) => (
              <li key={nhip.slug} className="flex items-center gap-2">
                <Link
                  href={`/hanh-trinh/${nhip.slug}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${nhip.borderColor} ${nhip.bgColor} ${nhip.color} hover:brightness-95`}
                >
                  <span aria-hidden>{nhip.icon}</span>
                  {nhip.ten}
                </Link>
                {i < NHIP.length - 1 && (
                  <span className="text-muted-foreground/40" aria-hidden>
                    &rarr;
                  </span>
                )}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground/40" aria-hidden>
                &rarr;
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-muted-foreground/40 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                &#8635; lặp lại
              </span>
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            Mục tiêu 5 năm: 1 triệu trẻ em Việt Nam tiếp cận STEM &amp; Robot
          </p>
        </div>
      </div>
    </section>
  );
}
