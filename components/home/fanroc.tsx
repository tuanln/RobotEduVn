import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";

/** Khối mùa thi FanRoc: một đoạn ngắn và nút sang Sân chơi (đợt 1). */
export function FanRoc({ t }: { t: TrangChuContent["fanroc"] }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-amber-400/60 bg-amber-50 p-8 dark:bg-amber-950/30 md:flex-row md:items-center">
          <Trophy className="h-10 w-10 shrink-0 text-amber-600" aria-hidden />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{t.tieuDe}</h2>
            <p className="mt-2 text-muted-foreground">{t.moTa}</p>
          </div>
          <Button asChild>
            <Link href={t.href}>
              {t.nut}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
