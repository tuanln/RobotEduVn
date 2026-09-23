import { NextResponse, type NextRequest } from "next/server";
import { rewriteTarget } from "@/lib/i18n/rewrite";

export function middleware(request: NextRequest) {
  const target = rewriteTarget(request.nextUrl.pathname);
  if (target === null) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
