import { Article } from "@/lib/types";

/**
 * Tạp chí / dự án cộng đồng. Hiện chưa có bài viết thật nào được duyệt —
 * để mảng rỗng thay vì bài mẫu, giao diện sẽ hiện trạng thái "chưa có nội dung"
 * kèm lời mời gửi bài. Nội dung thật đổ vào qua Google Sheet "Articles".
 */
export const ARTICLES: Article[] = [];
