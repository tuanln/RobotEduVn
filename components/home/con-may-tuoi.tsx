import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import type { HanhTrinhContent } from "@/lib/content/hanh-trinh-8-chang";

/** Màu nhấn theo giai đoạn cây tre: mầm, cành, quả, cội. */
const MAU: Record<string, string> = {
  "gieo-hat": "border-lime-400/60 bg-lime-50 dark:bg-lime-950/30",
  "vuon-canh": "border-emerald-400/60 bg-emerald-50 dark:bg-emerald-950/30",
  "ket-trai": "border-amber-400/60 bg-amber-50 dark:bg-amber-950/30",
  "rung-ve-coi": "border-orange-500/60 bg-orange-50 dark:bg-orange-950/30",
};

/**
 * Khối "Con mấy tuổi?" (id #bat-dau): bốn thẻ theo quãng tuổi. Dòng "Con lớn
 * lên thế nào" đứng TRÊN dòng đồ nghề — đó là điều quan trọng nhất
 * (spec 2026-11-06 mục 10.1).
 */
export function ConMayTuoi({ t }: { t: HanhTrinhContent }) {
  return (
    <section id="bat-dau" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t.conMayTuoi.tieuDe} subtitle={t.conMayTuoi.phuDe} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.giaiDoan.map((g) => (
            <article
              key={g.ma}
              className={`flex flex-col rounded-2xl border p-6 ${MAU[g.ma] ?? ""}`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {g.ten}
              </p>
              <h3 className="mt-1 text-2xl font-bold">{g.tuoi}</h3>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.nhan.conLonLen}
              </p>
              <p className="mt-1 font-medium">{g.lonLen}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.nhan.doNghe}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                {g.doNghe.map((d) => (
                  <li key={d}>&bull; {d}</li>
                ))}
              </ul>
              <Link
                href={g.link.href}
                className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-primary hover:underline"
              >
                {g.link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
