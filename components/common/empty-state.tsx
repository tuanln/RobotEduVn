import { Button } from "@/components/ui/button";

/**
 * Trạng thái "chưa có nội dung" dùng chung. Thà nói thật là chưa có còn hơn
 * lấp chỗ trống bằng dữ liệu mẫu.
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <p className="text-5xl" aria-hidden>
        {icon}
      </p>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Button asChild className="mt-6">
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
    </div>
  );
}
