import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import {
  CHON_THEO_TUOI,
  MUC_HOP,
  SAN_CHOI,
  sanChoiTheoMuc,
  type MucHop,
} from "@/lib/content/san-choi";
import { localeOf } from "@/lib/i18n/params";
import { pathFor } from "@/lib/i18n/routes";
import { ogImages } from "@/lib/seo/metadata";

const META = {
  title: "Sân Chơi: Các Cuộc Thi Robot & AI",
  description:
    "Cuộc thi là nhịp Chia sẻ ở quy mô lớn. Mười sân chơi có thật cho học sinh Việt Nam, xếp theo mức hợp với cách học của Làng Maker và theo tuổi: FanRoc, WRO, FTC, FIRST Global, NASA Space Apps…",
};

/** Trang chỉ có bản tiếng Việt: không vào ROUTES, /en/san-choi trả 404. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  if ((await localeOf(params)) !== "vi") notFound();
  return {
    ...META,
    alternates: { canonical: "/san-choi" },
    openGraph: { ...META, type: "website", locale: "vi_VN", url: "/san-choi", images: ogImages(META.title) },
  };
}

const THU_TU: MucHop[] = ["rat-hop", "hop", "de-sau"];
const MAU: Record<MucHop, string> = {
  "rat-hop": "border-emerald-400/60",
  hop: "border-amber-400/60",
  "de-sau": "border-border",
};

export default async function SanChoiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if ((await localeOf(params)) !== "vi") notFound();
  const tenTheoMa = new Map(SAN_CHOI.map((s) => [s.ma, s.ten]));

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl space-y-16 px-4">
        <div>
          <SectionHeader
            title="Sân Chơi"
            subtitle="Cuộc thi là nhịp Chia sẻ ở quy mô lớn: làm ở Làng bảy buổi, mang ra Chợ Phiên buổi tám, rồi mang bản tốt hơn ra sân bên ngoài."
          />
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
            Làng (Chơi → Làm → Chợ Phiên) → sân chơi trong nước → sân chơi quốc tế → trở về dẫn đội.
            Đó là vòng “Rụng về cội” của{" "}
            <Link href={`${pathFor("howWeLearn", "vi")}#tam-chang`} className="font-medium text-primary hover:underline">
              hành trình 8 chặng
            </Link>
            .
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold">Chọn theo tuổi</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {CHON_THEO_TUOI.map((n) => (
              <div key={n.tuoi} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold">{n.tuoi}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.goiY}</p>
                {n.ma.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {n.ma.map((m) => (
                      <li key={m}>
                        <a
                          href={`#${m}`}
                          className="rounded-full border border-border px-3 py-1 text-sm hover:bg-accent"
                        >
                          {tenTheoMa.get(m)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Xếp theo mức hợp với cách học của Làng</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Ba tiêu chí: học sinh tự làm, có luật chống làm hộ · bài toán mở lấy từ đời thật · đề cao
            chia sẻ và hợp tác.
          </p>
          <div className="mt-8 space-y-12">
            {THU_TU.map((muc) => (
              <div key={muc}>
                <h3 className="text-xl font-bold">{MUC_HOP[muc].ten}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{MUC_HOP[muc].moTa}</p>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {sanChoiTheoMuc(muc).map((s) => (
                    <article
                      key={s.ma}
                      id={s.ma}
                      className={`flex scroll-mt-20 flex-col rounded-2xl border-2 bg-card p-6 ${MAU[muc]}`}
                    >
                      <h4 className="text-xl font-bold">{s.ten}</h4>
                      <p className="text-sm text-muted-foreground">{s.tenDayDu}</p>
                      <dl className="mt-4 space-y-1.5 text-sm">
                        <Dong nhan="Dạng" gia={s.dang} />
                        <Dong nhan="Ai dự" gia={s.aiDu} />
                        <Dong nhan="Khi nào" gia={s.thoiGian} />
                        <Dong nhan="Chặng" gia={s.chang} />
                        <Dong nhan="Chuẩn bị ở Làng" gia={s.chuanBi} />
                      </dl>
                      <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm">{s.viSaoHop}</p>
                      <p className="mt-auto pt-4 text-xs text-muted-foreground/80">Nguồn: {s.nguon}</p>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Xem thông tin gốc <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-muted-foreground">
          Thiếu sân chơi nào? Mentor góp thêm một mục vào <code>lib/content/san-choi.ts</code> trên
          GitHub, kèm nguồn đã kiểm. Xem{" "}
          <Link href={pathFor("forMentors", "vi")} className="font-medium text-primary hover:underline">
            cách góp bài
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Dong({ nhan, gia }: { nhan: string; gia: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-32 shrink-0 text-muted-foreground">{nhan}</dt>
      <dd>{gia}</dd>
    </div>
  );
}
