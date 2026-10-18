import { createFromSource } from "fumadocs-core/search/server";
import { bocApiTim } from "@/lib/khoa-hoc/api-tim";
import { khoaHoc } from "@/lib/khoa-hoc/source";

// Chỉ mục dựng trong bộ nhớ ở lần gọi đầu của mỗi instance; kết quả được CDN
// giữ nhờ Cache-Control trong bocApiTim (tokenizer mặc định tách được tiếng
// Việt có dấu).
const { GET: timGoc } = createFromSource(khoaHoc);

export const GET = bocApiTim(timGoc);
