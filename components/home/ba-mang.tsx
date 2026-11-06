import { SectionHeader } from "@/components/common/section-header";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";

/** Ba vòng tròn giao nhau, robot ở giữa. Vẽ SVG, không cần ảnh. */
const VONG = [
  { cx: 100, cy: 80, mau: "fill-sky-400/40 stroke-sky-500" },
  { cx: 60, cy: 145, mau: "fill-emerald-400/40 stroke-emerald-500" },
  { cx: 140, cy: 145, mau: "fill-amber-400/40 stroke-amber-500" },
];

export function BaMang({ t }: { t: TrangChuContent["baMang"] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[240px_1fr]">
          <svg viewBox="0 0 200 220" className="mx-auto w-56" role="img" aria-label={t.tieuDe}>
            {VONG.map((v, i) => (
              <circle key={i} cx={v.cx} cy={v.cy} r="62" strokeWidth="2" className={v.mau} />
            ))}
            <text x="100" y="60" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
              {t.vong[0].ten}
            </text>
            <text x="42" y="178" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
              {t.vong[1].ten}
            </text>
            <text x="160" y="178" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
              {t.vong[2].ten}
            </text>
            <text x="100" y="128" textAnchor="middle" className="text-[26px]">
              🤖
            </text>
          </svg>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.vong.map((v) => (
              <div key={v.ten} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold">{v.ten}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.moTa}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-14 text-center text-xl font-bold">{t.hoatDongAI.tieuDe}</h3>
        <ol className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {t.hoatDongAI.ds.map((hd) => (
            <li key={hd.ten} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {hd.chang}
              </span>
              <span className="text-sm">{hd.ten}</span>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">{t.kyNang}</p>
      </div>
    </section>
  );
}
