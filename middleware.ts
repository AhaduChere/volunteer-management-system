import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith('/api') ||
    path.startsWith('/_next') ||
    path.startsWith('/favicon') ||
    path.endsWith('.svg') ||
    path.endsWith('.css') ||
    path.endsWith('.js') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.ico') ||
    path.endsWith('.woff') ||
    path.endsWith('.woff2')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('session_token');
  let isLoggedIn = false;

  if (token) {
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value }),
    });
    isLoggedIn = response.ok;
  }

  const isRoot = path === '/';

  if (!isLoggedIn && !isRoot) {
    return NextResponse.redirect(new URL('/', request.url)); // go to login if not logged in
  } else if (isLoggedIn && isRoot) {
    return NextResponse.redirect(new URL('/admin', request.url)); // go to "home" if try to access login while logged in
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/:path*'],
};
