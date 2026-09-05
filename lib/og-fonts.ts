import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Font nhúng sẵn cho ảnh OG. Không dùng font tải động của next/og vì nó phải
 * gọi ra Google Fonts lúc build — hỏng mạng là chữ tiếng Việt mất dấu.
 * Be Vietnam Pro có đầy đủ dấu tiếng Việt (OFL).
 */
export async function ogFonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(join(dir, "BeVietnamPro-Regular.ttf")),
    readFile(join(dir, "BeVietnamPro-Bold.ttf")),
  ]);

  return [
    { name: "Be Vietnam Pro", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Be Vietnam Pro", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}
