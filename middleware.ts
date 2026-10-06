import { NextResponse, type NextRequest } from "next/server";
import { rewriteTarget } from "@/lib/i18n/rewrite";
import { shouldNoindex } from "@/lib/i18n/noindex";

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
