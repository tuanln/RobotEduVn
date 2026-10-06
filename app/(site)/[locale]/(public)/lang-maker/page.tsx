import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  NGUOI_DAN,
  MENTORS,
  NGUOI_TRONG_LANG,
  MUOI_NAM,
  DO_NGHE_MUOI_NAM,
  TRICH_DAN_2017,
} from "@/lib/content/lang-maker";
import { HUBS } from "@/lib/content/hubs";
import { langMakerTrang } from "@/lib/content/lang-maker-trang";
import type { Manh } from "@/lib/content/lang-maker-trang/types";
import { mailto } from "@/lib/content/cong-dong";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { localeOf } from "@/lib/i18n/params";
import { pathFor } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await localeOf(params);
  return pageMetadata("makerVillage", locale, langMakerTrang(locale).meta);
}

/** Dựng một đoạn từ các mảnh — thay cho dangerouslySetInnerHTML. */
function Doan({ manh }: { manh: Manh[] }) {
  return (
    <>
      {manh.map((m, i) =>
        m.dam ? (
          <strong key={i}>{m.text}</strong>
        ) : m.nghieng ? (
          <em key={i}>{m.text}</em>
        ) : (
          <span key={i}>{m.text}</span>
        ),
      )}
    </>
  );
}

export default async function LangMakerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await localeOf(params);
  const t = langMakerTrang(locale);
  // Tên người, tên hub và căn cứ `nguon` là dữ liệu tiếng Việt — trang en
  // đánh dấu lang="vi" để trình đọc màn hình đọc đúng giọng.
  const duLieu = locale === "en" ? "vi" : undefined;

  // Chữ của vai lấy theo vị trí: `t.nguoiTrongLang.vai[i]` khớp NGUOI_TRONG_LANG[i].
  const vaiLang = NGUOI_TRONG_LANG.map((v, i) => ({
    ...v,
    ...t.nguoiTrongLang.vai[i],
  }));
  const trongThang = vaiLang.filter((v) => v.bac !== null);
  const ngoaiThang = vaiLang.filter((v) => v.bac === null);
  const vaiDan = NGUOI_DAN.map((v, i) => ({ ...v, ...t.nguoiDan.vai[i] }));

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />

        {/* 1. Luận đề */}
        <section className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
          <h2 className="text-2xl font-bold">{t.luanDe.tieuDe}</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            {t.luanDe.doan.map((manh, i) => (
              <p key={i}>
                <Doan manh={manh} />
              </p>
            ))}
          </div>
        </section>

        {/* Làng là gì · tầm nhìn · sứ mệnh — chuyển từ trang /gioi-thieu cũ */}
        <section className="mt-12 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">{t.laGi.tieuDe}</h2>
            {t.laGi.doan.map((d) => (
              <p key={d} className="mt-3 text-muted-foreground">
                {d}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[t.laGi.tamNhin, t.laGi.suMenh].map((k) => (
              <div key={k.tieuDe} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold">{k.tieuDe}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{k.noiDung}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Người trong làng */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">{t.nguoiTrongLang.tieuDe}</h2>
          <p className="mt-2 text-muted-foreground">{t.nguoiTrongLang.moTa}</p>

          <ol className="mt-6 space-y-3">
            {trongThang.map((vai) => (
              <li
                key={vai.ten}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground"
                  aria-hidden
                >
                  {vai.bac}
                </span>
                <div>
                  <h3 className="font-bold">{vai.ten}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{vai.laAi}</p>
                </div>
              </li>
            ))}
          </ol>

          {ngoaiThang.map((vai) => (
            <div
              key={vai.ten}
              className="mt-3 rounded-xl border border-dashed border-border p-5"
            >
              <h3 className="font-bold">{vai.ten}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{vai.laAi}</p>
            </div>
          ))}

          <p className="mt-6 rounded-xl bg-muted/50 p-5 text-sm">
            <Doan manh={t.nguoiTrongLang.ket.truoc} />
            <Link
              href={pathFor("nhipShare", locale)}
              className="text-primary hover:underline"
            >
              {t.nguoiTrongLang.ket.link}
            </Link>
            {t.nguoiTrongLang.ket.sau}
          </p>
        </section>

        {/* 3. Người dẫn ở làng */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">{t.nguoiDan.tieuDe}</h2>
          <p className="mt-2 text-muted-foreground">{t.nguoiDan.moTa}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {vaiDan.map((vai) => (
              <div
                key={vai.ten}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold">{vai.ten}</h3>
                  {vai.trongThangMakerCoach && (
                    <span className="flex-shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {t.nguoiDan.coChungNhan}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">{vai.dan}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {vai.viecCuThe}
                </p>
              </div>
            ))}
          </div>

          {MENTORS.length > 0 ? (
            <div className="mt-6">
              <h3 className="font-bold">{t.nguoiDan.oCacHub}</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                {MENTORS.map((m) => (
                  <div
                    key={m.ten + m.vai}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <h4 lang={duLieu} className="font-bold">
                      {m.ten}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-primary">
                      {m.vai}
                    </p>
                    {m.nghe && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t.nguoiDan.ngheMentor[m.ten] ?? m.nghe}
                      </p>
                    )}
                    {m.danGi && (
                      <p lang={duLieu} className="mt-2 text-sm text-muted-foreground">
                        {m.danGi}
                      </p>
                    )}
                    {m.hubId && (
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
                        <span lang={duLieu}>
                          {HUBS.find((h) => h.id === m.hubId)?.name ?? ""}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {t.nguoiDan.danhSachDai}{" "}
                <a
                  href={mailto(t.nguoiDan.mailSubject)}
                  className="text-primary hover:underline"
                >
                  {t.nguoiDan.gioiThieuMinh} &rarr;
                </a>
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">{t.nguoiDan.rongMoTa}</p>
              <a
                href={mailto(t.nguoiDan.mailSubject)}
                className="mt-2 inline-block text-sm text-primary hover:underline"
              >
                {t.nguoiDan.gioiThieuMinh} &rarr;
              </a>
            </div>
          )}
        </section>

        {/* 4. Mười năm */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">{t.muoiNam.tieuDe}</h2>

          <figure className="mt-4 rounded-xl border-l-4 border-primary bg-card p-6">
            <blockquote className="text-lg italic leading-relaxed">
              “{t.muoiNam.trichDan.loi}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              — <span lang={duLieu}>{TRICH_DAN_2017.nguoiNoi}</span>,{" "}
              {TRICH_DAN_2017.thoiDiem}. {t.muoiNam.trichDan.ghiChu}
            </figcaption>
          </figure>

          <ol className="mt-8 space-y-6 border-l border-border pl-6">
            {MUOI_NAM.map((moc, i) => (
              <li key={moc.moc + moc.tieuDe} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />
                <p className="text-sm font-bold text-primary">{moc.moc}</p>
                <h3 className="mt-1 font-bold">{t.muoiNam.moc[i].tieuDe}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.muoiNam.moc[i].chiTiet}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  {t.muoiNam.canCu} <span lang={duLieu}>{moc.nguon}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold">{t.muoiNam.doNghe.tieuDe}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.muoiNam.doNghe.moTa}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {DO_NGHE_MUOI_NAM.map((ten, i) => (
                <span key={ten} className="flex items-center gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-sm">
                    {ten}
                  </span>
                  {i < DO_NGHE_MUOI_NAM.length - 1 && (
                    <span className="text-muted-foreground" aria-hidden>
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Cửa vào */}
        <section className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold">{t.cuaVao.tieuDe}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.cuaVao.moTa}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={pathFor("makerHubs", locale)}>
                <MapPin className="mr-2 h-4 w-4" aria-hidden />
                {t.cuaVao.timHub}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={pathFor("nhipPlay", locale)}>
                {t.cuaVao.batDauChoi}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
