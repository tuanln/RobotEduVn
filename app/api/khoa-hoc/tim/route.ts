import { createFromSource } from "fumadocs-core/search/server";
import { khoaHoc } from "@/lib/khoa-hoc/source";

// Chỉ mục dựng một lần lúc build; tokenizer mặc định tách được tiếng Việt có dấu.
export const revalidate = false;

export const { GET } = createFromSource(khoaHoc);
