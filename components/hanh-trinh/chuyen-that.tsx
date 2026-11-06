import { AnhLang } from "@/components/common/anh-lang";
import type { HanhTrinhContent } from "@/lib/content/hanh-trinh-8-chang";

/**
 * #chuyen-that: BlueSilk và Team Vietnam FGC. Mỗi chuyện bắt buộc có nguồn;
 * ảnh theo mã, thiếu tệp thì ẩn.
 */
export function ChuyenThat({ t }: { t: HanhTrinhContent }) {
  const c = t.chuyenThat;
  return (
    <section id="chuyen-that" className="scroll-mt-20">
      <h2 className="text-3xl font-bold">{c.tieuDe}</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">{c.phuDe}</p>
      <div className="mt-8 space-y-10">
        {c.ds.map((ch) => (
          <article key={ch.ma} id={ch.ma} className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-2xl font-bold">{ch.tieuDe}</h3>
            <div className="mt-4 space-y-3 text-muted-foreground">
              {ch.doan.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ch.anh.map((ma) => (
                <AnhLang key={ma} ma={ma} alt={ch.tieuDe} />
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground/80">
              {t.nhan.nguon}: {ch.nguon}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
