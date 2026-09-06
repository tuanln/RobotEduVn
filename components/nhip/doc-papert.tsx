import { BookOpen, Download, ExternalLink } from "lucide-react";

/**
 * Canon DOMAIN_MAP mục 1: vai trò số một của robot.edu.vn là "phổ cập Papert".
 * Link PDF nằm trên CDN của MIT nên có thể đổi — luôn kèm link trang chủ MIT
 * và bản Internet Archive để người đọc tự tìm lại được.
 * Ba link kiểm tra HTTP 200 ngày 2026-09-06.
 */
export function DocPapert() {
  return (
    <section className="rounded-2xl border border-border bg-card p-8">
      <div className="flex items-start gap-4">
        <BookOpen className="mt-1 h-6 w-6 flex-shrink-0 text-primary" aria-hidden />
        <div>
          <h2 className="text-xl font-bold">Đọc Papert</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Toàn bộ cách học ở Làng Maker bắt nguồn từ một cuốn sách năm 1980
            (ấn bản 2 năm 1993) của
            Seymour Papert: <em>Mindstorms — Children, Computers, and Powerful
            Ideas</em>. MIT Media Lab đăng công khai bản đầy đủ, miễn phí, với sự
            cho phép của gia đình Papert.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://dam-prod.media.mit.edu/x/2025/01/27/Mindstorms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden />
              Tải sách bản gốc
              <span className="opacity-70">(PDF, 60 MB)</span>
            </a>
            <a
              href="https://archive.org/details/mindstormschildr0000pape"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Đọc trực tuyến, không cần tải
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Nguồn chính thức:{" "}
            <a
              href="https://www.media.mit.edu/publications/mindstorms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              trang xuất bản của MIT Media Lab
            </a>
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
            <p className="text-sm">
              <span className="font-semibold">Bản tiếng Việt đang được cộng
              đồng dịch</span>, kèm <em>Chuyện Làng Maker</em> sau mỗi chương —
              kể lại mười năm Maker Việt đã sống với đúng ý tưởng của chương đó
              ra sao.
            </p>
            <a
              href="mailto:lang@makerviet.org?subject=Nhận%20tin%20bản%20tiếng%20Việt%20Mindstorms"
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              Nhận tin khi bản dịch xong &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
