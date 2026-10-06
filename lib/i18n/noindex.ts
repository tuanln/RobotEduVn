import { canonicalPathFromEn, routeKeyFromPath } from "./routes";
import { TRANSLATED_ROUTES } from "./translated";

/**
 * N-02: mọi URL /en/* mà route đó KHÔNG có bản dịch thật (không nằm trong
 * TRANSLATED_ROUTES) đều bị gắn X-Robots-Tag: noindex — kể cả khi trả 200,
 * kể cả khi bị vào thẳng bằng link chứ không qua menu. Trang một video đi
 * theo Video Hub: Video Hub đã dịch thì trang video cũng đã dịch.
 *
 * Tách khỏi middleware.ts để test gọi được mà không nạp next/server.
 */
export function shouldNoindex(pathname: string): boolean {
  if (pathname !== "/en" && !pathname.startsWith("/en/")) return false;
  const key = routeKeyFromPath(pathname);
  if (key !== null) return !TRANSLATED_ROUTES.has(key);
  const laVideo = canonicalPathFromEn(pathname)?.startsWith("/video-hub/");
  return !(laVideo && TRANSLATED_ROUTES.has("videos"));
}
