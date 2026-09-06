import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  NGUOI_TRONG_LANG,
  MUOI_NAM,
  DO_NGHE_MUOI_NAM,
  TRICH_DAN_2017,
} from "@/lib/content/lang-maker";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Làng Maker",
  description:
    "Làng Maker dùng robot để tạo ra đứa trẻ — robot không phải đích đến. Mười năm, năm vai trong làng, và một cái xưởng mở cửa từ 2016.",
};

export default function LangMakerPage() {
  const trongThang = NGUOI_TRONG_LANG.filter((v) => v.bac !== null);
  const ngoaiThang = NGUOI_TRONG_LANG.filter((v) => v.bac === null);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          title="Làng Maker"
          subtitle="Một cái xưởng chung, mở cửa từ 2016"
        />

        {/* 1. Luận đề */}
        <section className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
          <h2 className="text-2xl font-bold">Dùng robot để tạo ra đứa trẻ</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Nghe ngược, nhưng đó là điều làng làm. Robot không phải đích đến —
              đứa trẻ mới là thứ được làm ra. Con robot chạy xong rồi cũng cất
              vào tủ; thứ ở lại là một đứa trẻ biết mình làm được.
            </p>
            <p>
              Đồ vật được lập trình ở đây là <strong>đối tác tư duy</strong> của
              trẻ, không phải môn học phải thuộc. Trẻ nghĩ <em>cùng</em> con
              robot, chứ không học <em>về</em> con robot.
            </p>
            <p>
              Câu này có từ ngày đầu, khi làng còn tên là Maker Hanoi:{" "}
              <strong>đóng góp của bạn, chúng ta cùng chia sẻ.</strong>
            </p>
          </div>
        </section>

        {/* Làng là gì · tầm nhìn · sứ mệnh — chuyển từ trang /gioi-thieu cũ */}
        <section className="mt-12 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">Làng Maker là gì?</h2>
            <p className="mt-3 text-muted-foreground">
              Làng Maker là không gian sáng tạo mở, hoạt động phi lợi nhuận, do
              cộng đồng MakerViet · ThingEdu · Rogo dựng lên sau hơn mười năm làm
              mã nguồn mở và giáo dục STEM tại Việt Nam.
            </p>
            <p className="mt-3 text-muted-foreground">
              Chữ “mở” là cốt lõi: mở cửa tri thức, mở mã nguồn, mở mô hình — ai
              cũng có thể tham gia, đóng góp và thụ hưởng.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold">Tầm nhìn</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mỗi trẻ em Việt Nam đều có cơ hội tiếp cận STEM và Robot để phát
                triển tư duy độc lập và làm chủ công nghệ.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold">Sứ mệnh</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Phổ cập STEM và Robot cho 1 triệu trẻ em Việt Nam trong 5 năm,
                bằng hệ sinh thái giáo dục mở, sản phẩm Made in Vietnam, và
                mạng lưới cộng đồng toàn quốc.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Người trong làng */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Người trong làng</h2>
          <p className="mt-2 text-muted-foreground">
            Làng không có lớp chia theo tuổi. Người mới học cạnh người giỏi,
            trong cùng một việc thật.
          </p>

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
            Đứa trẻ bước vào làng là <strong>dân làng</strong>. Con đường đi lên
            là có thật — và nó khép lại đúng ở nhịp{" "}
            <Link href="/hanh-trinh/chia-se" className="text-primary hover:underline">
              Chia sẻ
            </Link>
            , khi em quay lại dẫn lớp sau.
          </p>
        </section>

        {/* 3. Mười năm */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Mười năm</h2>

          <figure className="mt-4 rounded-xl border-l-4 border-primary bg-card p-6">
            <blockquote className="text-lg italic leading-relaxed">
              “{TRICH_DAN_2017.loi}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              — {TRICH_DAN_2017.nguoiNoi}, {TRICH_DAN_2017.thoiDiem}.{" "}
              {TRICH_DAN_2017.ghiChu}
            </figcaption>
          </figure>

          <ol className="mt-8 space-y-6 border-l border-border pl-6">
            {MUOI_NAM.map((moc) => (
              <li key={moc.moc + moc.tieuDe} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />
                <p className="text-sm font-bold text-primary">{moc.moc}</p>
                <h3 className="mt-1 font-bold">{moc.tieuDe}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{moc.chiTiet}</p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  Căn cứ: {moc.nguon}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold">Mười năm làm đồ nghề</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Thứ được làm ra không phải mấy con robot này, mà là những người
              biết làm ra chúng.
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

        {/* 4. Cửa vào */}
        <section className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold">Vào làng thế nào?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Buổi đầu tiên miễn phí, và không cần biết gì trước.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/cong-dong/maker-hub">
                <MapPin className="mr-2 h-4 w-4" aria-hidden />
                Tìm Maker Hub gần bạn
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/hanh-trinh/choi">
                Bắt đầu từ nhịp Chơi
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
