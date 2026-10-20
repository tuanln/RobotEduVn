import { loader } from "fumadocs-core/source";
import { defineDocs } from "fumadocs-mdx/macro";
import { z } from "zod";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";

/**
 * Thư viện khóa học — Markdown chép từ web makerviet (học liệu Moodle cũ của
 * Maker Việt) cộng các khóa ThingEdu viết mới (ThingBlock). Chỉ có bản tiếng Việt: /en/khoa-hoc tự 404 nhờ
 * middleware mặc định từ chối slug /en không có trong ROUTES.
 *
 * Dùng fumadocs ở chế độ headless (cây mục lục, TOC, tìm kiếm); giao diện
 * vẽ bằng component của site trong components/khoa-hoc.
 */
const docs = defineDocs({
  dir: "content/khoa-hoc",
  docs: {
    // `nguon`: ghi nguồn cuối trang; bỏ trống = Maker Việt (học liệu Moodle cũ).
    schema: pageSchema.extend({ nguon: z.string().optional() }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export const KHOA_HOC_URL = "/khoa-hoc";

export const khoaHoc = loader({
  baseUrl: KHOA_HOC_URL,
  source: docs.toFumadocsSource(),
});
