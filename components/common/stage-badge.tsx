import { Badge } from "@/components/ui/badge";
import { NhipSlug } from "@/lib/types";
import { getNhip } from "@/lib/content/nhip";
import { NHIP_NHAN_EN } from "@/lib/content/nhip-nhan/en";
import { NHIP_NHAN_VI } from "@/lib/content/nhip-nhan/vi";
import type { Locale } from "@/lib/i18n/locales";

/** Nhãn nhịp. Màu lấy từ chính dữ liệu nhịp nên không lệch với các trang khác. */
export function StageBadge({
  stage,
  locale,
}: {
  stage: NhipSlug;
  locale: Locale;
}) {
  const nhip = getNhip(stage);
  const nhan = locale === "en" ? NHIP_NHAN_EN : NHIP_NHAN_VI;
  return (
    <Badge
      variant="outline"
      className={`${nhip.bgColor} ${nhip.color} ${nhip.borderColor}`}
    >
      {nhan[stage].ten}
    </Badge>
  );
}
