import { loader } from "fumadocs-core/source";
import { defineDocs } from "fumadocs-mdx/macro";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";

/**
 * Thư viện khóa học — 48 trang Markdown chép từ web makerviet (học liệu
 * Moodle cũ của Maker Việt). Chỉ có bản tiếng Việt: /en/khoa-hoc tự 404 nhờ
 * middleware mặc định từ chối slug /en không có trong ROUTES.
 *
 * Dùng fumadocs ở chế độ headless (cây mục lục, TOC, tìm kiếm); giao diện
 * vẽ bằng component của site trong components/khoa-hoc.
 */
const docs = defineDocs({
  dir: "content/khoa-hoc",
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export const KHOA_HOC_URL = "/khoa-hoc";

export const khoaHoc = loader({
  baseUrl: KHOA_HOC_URL,
  source: docs.toFumadocsSource(),
});
