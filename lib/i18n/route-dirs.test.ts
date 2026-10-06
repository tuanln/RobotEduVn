import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

/**
 * Cột `vi` của ROUTES cũng là tên thư mục route. Đổi tên thư mục mà quên
 * bảng thì test khác vẫn xanh còn production 404 — test này bịt lỗ đó.
 */
const GOC = join(process.cwd(), "app/(site)/[locale]/(public)");

describe("ROUTES[*].vi có thư mục route thật", () => {
  for (const [key, { vi }] of Object.entries(ROUTES)) {
    it(key, () => {
      const rel = vi === "/" ? "" : vi.slice(1);
      // ba trang nhịp đi qua thư mục động [slug]
      const tinh = join(GOC, rel, "page.tsx");
      const dong = join(GOC, rel.replace(/[^/]+$/, "[slug]"), "page.tsx");
      expect(existsSync(tinh) || existsSync(dong)).toBe(true);
    });
  }
});
