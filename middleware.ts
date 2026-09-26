import { NextResponse, type NextRequest } from "next/server";
import { rewriteTarget } from "@/lib/i18n/rewrite";
import { routeKeyFromPath } from "@/lib/i18n/routes";
import { TRANSLATED_ROUTES } from "@/lib/i18n/translated";

/**
 * N-02: mọi URL /en/* mà route đó KHÔNG có bản dịch thật (không nằm trong
 * TRANSLATED_ROUTES) đều bị gắn X-Robots-Tag: noindex — kể cả khi trả 200,
 * kể cả khi bị vào thẳng bằng link chứ không qua menu. Danh sách trang nào
 * đã dịch nằm nguyên ở TRANSLATED_ROUTES (lib/i18n/translated.ts); dịch
 * xong trang nào thì thêm khoá vào đó, header tự rụng — KHÔNG liệt kê danh
 * sách trang ở đây.
 */
function shouldNoindex(pathname: string): boolean {
  if (pathname !== "/en" && !pathname.startsWith("/en/")) return false;
  const key = routeKeyFromPath(pathname);
  return key === null || !TRANSLATED_ROUTES.has(key);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const target = rewriteTarget(pathname);

  const response = ((): NextResponse => {
    if (target === null) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.rewrite(url);
  })();

  if (shouldNoindex(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
