import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-500/10" />
      </div>
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Sẵn Sàng Bắt Đầu Hành Trình STEM?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Từ 4 tuổi đã có thể bắt đầu. Chọn giai đoạn phù hợp và khám phá ngay
          — hoàn toàn miễn phí.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/hanh-trinh">
              Chọn Lộ Trình Học
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cong-dong/maker-hub">Tìm Maker Hub Gần Bạn</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
