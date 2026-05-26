import { NextResponse, type NextRequest } from "next/server";

const KNOWN_PATHS = [
  /^\/$/,
  /^\/search(\/.*)?$/,
  /^\/product\/[^/]+$/,
  /^\/api\/.*$/
];

const isKnownPath = (pathname: string) =>
  KNOWN_PATHS.some((pattern) => pattern.test(pathname));

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (isKnownPath(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ]
};
