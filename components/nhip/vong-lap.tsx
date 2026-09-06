import Link from "next/link";
import { NHIP } from "@/lib/content/nhip";

/**
 * Sơ đồ vòng lặp ba nhịp. Điểm bắt buộc theo spec: có đường quay lại từ nhịp
 * cuối về nhịp đầu — đây là thứ phân biệt vòng lặp với thang bậc.
 */
export function VongLap() {
  return (
    <div className="relative">
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {NHIP.map((nhip) => (
          <li key={nhip.slug}>
            <Link
              href={`/hanh-trinh/${nhip.slug}`}
              className={`flex h-full flex-col rounded-2xl border p-6 transition-all hover:shadow-lg ${nhip.borderColor} ${nhip.bgColor}`}
            >
              <span className="text-4xl" aria-hidden>
                {nhip.icon}
              </span>
              <h3 className={`mt-3 text-2xl font-extrabold ${nhip.color}`}>
                {nhip.ten}
              </h3>
              <p className="mt-1 text-sm font-medium">{nhip.khauHieu}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {nhip.moTaNgan}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span aria-hidden>{nhip.huyHieu}</span>
                {nhip.tenHuyHieu}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {/* Đường quay lại — vòng lặp, không phải thang bậc */}
      <p className="mt-6 flex items-center justify-center gap-2 rounded-full border border-dashed border-primary/40 bg-primary/5 px-5 py-3 text-center text-sm">
        <span aria-hidden>↻</span>
        Chia sẻ xong thì quay lại Chơi ở vòng sau, với câu hỏi khó hơn
      </p>
    </div>
  );
}
