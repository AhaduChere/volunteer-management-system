import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const isLoggedIn = false;

  const path = request.nextUrl.pathname;
  const isRoot = path === '/';

  if (!isLoggedIn && !isRoot) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLoggedIn && isRoot) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg|favicon.png|Camera.svg|robots.txt|sitemap.xml).*)'
  ],
};
