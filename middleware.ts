import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, stripLocaleFromPathname } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const { locale, pathname: strippedPath } = stripLocaleFromPathname(pathname);

  if (locale) {
    const rewriteUrl = request.nextUrl.clone();

    rewriteUrl.pathname = strippedPath;

    const response = NextResponse.rewrite(rewriteUrl);

    response.cookies.set("locale", locale, { path: "/" });

    return response;
  }

  const response = NextResponse.next();
  const storedLocale = request.cookies.get("locale")?.value ?? defaultLocale;

  response.cookies.set("locale", storedLocale, { path: "/" });

  return response;
};

export const config = {
  matcher: "/:path*",
};
