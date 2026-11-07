import { AnhLang } from "@/components/common/anh-lang";
import type { HanhTrinhContent } from "@/lib/content/hanh-trinh-8-chang";

const MAU: Record<string, string> = {
  "gieo-hat": "border-lime-400/60",
  "vuon-canh": "border-emerald-400/60",
  "ket-trai": "border-amber-400/60",
  "rung-ve-coi": "border-orange-500/60",
};

/**
 * Tám chặng gom theo bốn giai đoạn cây tre. Mỗi giai đoạn mở đầu bằng dòng
 * "Con lớn lên thế nào" (đặt trên đồ nghề), rồi hai thẻ chặng: Ai, Làm gì,
 * Đạt được, Dấu mốc, Ba mảng.
 */
export function TamChang({ t }: { t: HanhTrinhContent }) {
  return (
    <div className="space-y-10">
      {t.giaiDoan.map((g) => (
        <section key={g.ma} className={`rounded-2xl border-2 p-6 md:p-8 ${MAU[g.ma] ?? ""}`}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-2xl font-bold">{g.ten}</h3>
            <span className="text-muted-foreground">{g.tuoi}</span>
          </div>
          <p className="mt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.nhan.conLonLen}:
            </span>{" "}
            <span className="font-medium">{g.lonLen}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.nhan.doNghe}:</span>{" "}
            {g.doNghe.join(" · ")}
          </p>
          {/* Ảnh giai đoạn (mã GD-*): thiếu tệp thì ẩn. */}
          <AnhLang ma={g.anh} alt={`${g.ten}, ${g.tuoi}`} className="mt-5 max-w-md" width={1200} height={800} />

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.chang
              .filter((c) => c.giaiDoan === g.ma)
              .map((c) => (
                <article key={c.so} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t.nhan.chang} {c.so}
                  </p>
                  <h4 className="mt-1 text-xl font-bold">{c.ten}</h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    <Dong nhan={t.nhan.ai} gia={c.ai} />
                    <Dong nhan={t.nhan.lamGi} gia={c.lamGi} />
                    <Dong nhan={t.nhan.datDuoc} gia={c.datDuoc} />
                    <Dong nhan={t.nhan.dauMoc} gia={c.dauMoc} dam />
                  </dl>
                  <ul className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                    <li>
                      <b className="text-sky-600 dark:text-sky-400">{t.nhan.baMang.dienTu}:</b>{" "}
                      {c.baMang.dienTu}
                    </li>
                    <li>
                      <b className="text-emerald-600 dark:text-emerald-400">{t.nhan.baMang.robotics}:</b>{" "}
                      {c.baMang.robotics}
                    </li>
                    <li>
                      <b className="text-amber-600 dark:text-amber-400">{t.nhan.baMang.ai}:</b>{" "}
                      {c.baMang.ai}
                    </li>
                  </ul>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Dong({ nhan, gia, dam = false }: { nhan: string; gia: string; dam?: boolean }) {
  return (
    <div className="flex gap-2">
      <dt className="w-20 shrink-0 text-muted-foreground">{nhan}</dt>
      <dd className={dam ? "font-semibold" : ""}>{gia}</dd>
    </div>
  );
}
