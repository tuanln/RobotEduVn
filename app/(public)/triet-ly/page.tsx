import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";
import { DocPapert } from "@/components/nhip/doc-papert";

export const metadata: Metadata = {
  title: "Triết Lý Giáo Dục",
  description:
    "Ba trụ cột triết lý của OpenSTEM: Tư tưởng Hồ Chí Minh, Triết lý Kiến tạo Papert, Tinh thần Coopertition FIRST.",
};

const pillars = [
  {
    icon: "🇻🇳",
    title: 'Tư Tưởng Hồ Chí Minh — "Bình Dân Học Vụ"',
    quote: '"Không có gì quý hơn độc lập tự do"',
    content: `Áp dụng phương pháp luận chiến tranh nhân dân vào giáo dục: huy động toàn dân tham gia, xây dựng lực lượng ba tầng (đội chủ lực, bộ đội địa phương, dân quân), lấy thế thắng lực.

Độc lập tự chủ về công nghệ — xây dựng sản phẩm Made in Vietnam (ThingBot, NEO One, VIA) thay vì phụ thuộc nước ngoài.

Mô hình "Làng Maker" tại mọi địa phương — mỗi vùng miền tự xây dựng lực lượng với sự hỗ trợ của đội chủ lực.`,
  },
  {
    icon: "🧩",
    title: "Triết Lý Kiến Tạo — Seymour Papert",
    quote: '"Trẻ em phát triển tư duy thông qua việc tạo ra sản phẩm hữu hình"',
    content: `Học bằng làm (Learning by Making) — không chỉ đọc sách hay nghe giảng, mà phải tự tay làm, tự tay tạo ra sản phẩm.

Vòng lặp ba nhịp: Chơi, Làm, Chia sẻ. Không phải thang bậc phải leo — xong Chia sẻ thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn.

Trẻ em là chủ thể — không phải bình chứa để rót kiến thức vào, mà là những nhà kiến trúc tự xây dựng thế giới tri thức của mình.`,
  },
  {
    icon: "🤝",
    title: "Tinh Thần Coopertition — FIRST Robotics",
    quote: '"Cạnh tranh cộng hưởng — cùng nâng cao giá trị cho cộng đồng"',
    content: `Các đội tác vừa hợp tác vừa cạnh tranh lành mạnh. Doanh nghiệp đóng góp và cùng nhận lại giá trị tương xứng về thương hiệu, uy tín và tác động xã hội.

Mô hình ba lực lượng: Đội Chủ lực (đối tác chiến lược), Bộ đội Địa phương (mentor, tình nguyện viên), Dân quân Tự vệ (trẻ em — vừa học vừa chia sẻ).

Giá trị cốt lõi: Mở — Miễn phí — Công bằng — Độc lập — Cộng đồng.`,
  },
];

/** Sáu nguyên lý, rút từ thingedu-canon 00-CANON/PHILOSOPHY.md mục 1, 3, 4, 5, 6, 9. */
const NGUYEN_LY = [
  {
    title: "Chạm trước, ký hiệu sau",
    desc: "Trẻ thao tác với vật thật trước; code và công thức chỉ đến sau, khi đã có trải nghiệm cụ thể để bám vào.",
  },
  {
    title: "Khó mà vui",
    desc: "Học sâu xảy ra khi việc khó nhưng do chính trẻ chọn làm, đầy hứng thú — không phải khó vì bị ép.",
  },
  {
    title: "Lỗi là thông tin",
    desc: "Chương trình sai không phải là thua. Trẻ quan sát, đặt giả thuyết, thử lại — người dẫn không sửa hộ, chỉ hỏi ngược.",
  },
  {
    title: "Thế giới thu nhỏ",
    desc: "Mỗi dự án là một thế giới đủ nhỏ để trẻ làm chủ trọn vẹn, đủ thật để chạy được trên thiết bị thật.",
  },
  {
    title: "Học như trường samba",
    desc: "Người mới học cạnh người giỏi trong cùng một việc thật, không chia lớp tách biệt theo tuổi hay trình độ.",
  },
  {
    title: "Tách trẻ khỏi màn hình",
    desc: "Mọi tương tác số đều bắt nguồn từ một hành động vật lý: lắp ráp, thao tác thiết bị, quan sát hiện tượng.",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Triết Lý Giáo Dục"
          subtitle="Ba trụ cột định hướng mọi hoạt động của OpenSTEM Foundation"
        />

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Vòng lặp ba nhịp</h2>
          <p className="mb-6 text-muted-foreground">
            Cách học ở Làng Maker không phải một thang bậc phải leo, mà là ba nhịp lặp
            đi lặp lại. Mỗi vòng, thứ trẻ chọn làm lại khó hơn một chút.
          </p>
          <VongLap />
        </section>

        <div className="space-y-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-5xl">{pillar.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">
                    Trụ cột {i + 1}: {pillar.title}
                  </h2>
                  <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {pillar.quote}
                  </blockquote>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {pillar.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Sáu nguyên lý dẫn đường</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {NGUYEN_LY.map((n) => (
              <div key={n.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <DocPapert />
        </div>
      </div>
    </div>
  );
}
