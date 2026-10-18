import { notFound } from "next/navigation";
import { ThanhBen } from "@/components/khoa-hoc/thanh-ben";
import { khoaHoc } from "@/lib/khoa-hoc/source";
import { localeOf } from "@/lib/i18n/params";

/** Thư viện khóa học chỉ có tiếng Việt — nhánh /en dừng ở đây cho chắc. */
export default async function KhoaHocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  if ((await localeOf(params)) !== "vi") notFound();

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
      <ThanhBen tree={khoaHoc.getPageTree()} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
