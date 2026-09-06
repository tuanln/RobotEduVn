import { Badge } from "@/components/ui/badge";
import { NhipSlug } from "@/lib/types";
import { getNhip } from "@/lib/content/nhip";

/** Nhãn nhịp. Màu lấy từ chính dữ liệu nhịp nên không lệch với các trang khác. */
export function StageBadge({ stage }: { stage: NhipSlug }) {
  const nhip = getNhip(stage);
  return (
    <Badge
      variant="outline"
      className={`${nhip.bgColor} ${nhip.color} ${nhip.borderColor}`}
    >
      {nhip.ten}
    </Badge>
  );
}
