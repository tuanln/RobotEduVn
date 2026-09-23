import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/section-header";
import { VongLap } from "@/components/nhip/vong-lap";

export const metadata: Metadata = {
  title: "Cách Học Ở Làng Maker",
  description:
    "Ba nhịp lặp lại: chơi cho tò mò, bắt tay làm ra sản phẩm thật, rồi kể lại cho người khác. Không phải thang bậc — là vòng lặp.",
};

export default function HanhTrinhPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Cách Học Ở Làng Maker"
          subtitle="Ba nhịp lặp đi lặp lại — không ai phải leo bậc, ai cũng đi qua đủ ba"
        />
        <VongLap />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Từ 4 đến 18 tuổi đều đi qua đủ ba nhịp này. Khác nhau không nằm ở nhịp
          nào, mà ở độ khó của thứ trẻ chọn làm.
        </p>
      </div>
    </div>
  );
}
