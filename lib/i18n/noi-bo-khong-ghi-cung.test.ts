import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

/**
 * Link nội bộ ghi cứng đường dẫn tiếng Việt làm người đọc trang /en bị đá
 * về bản tiếng Việt. Mọi link nội bộ phải đi qua pathFor()/videoPath().
 */
function tsx(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return tsx(p);
    return p.endsWith(".tsx") ? [p] : [];
  });
}

const VI_PATHS = Object.values(ROUTES)
  .map((r) => r.vi)
  .filter((p) => p !== "/");
const FILES = [...tsx("app/(site)"), ...tsx("components")].filter(
  (f) => !f.includes("dashboard"),
);

// Bật ở Task 9 của kế hoạch 2 — tới lúc đó các trang chưa chuyển sang
// pathFor() nên test này đỏ theo đúng dự kiến.
describe.skip("không ghi cứng đường dẫn tiếng Việt trong href", () => {
  for (const f of FILES) {
    it(f, () => {
      const src = readFileSync(f, "utf8");
      const hits = VI_PATHS.filter((p) =>
        new RegExp(`href=\\{?[\`"]${p.replace(/\//g, "\\/")}(["\`/?]|$)`).test(
          src,
        ),
      );
      expect(hits).toEqual([]);
    });
  }
});
