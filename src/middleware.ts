import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  
  const publicRoutes = ['/login', '/register', '/'];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  
  if (!token && !isPublicRoute && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/autos', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)'],
};