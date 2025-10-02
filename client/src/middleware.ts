import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const privateRoutes = ['/manager'];

  if (privateRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!await verifyToken(token || '')) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (req.nextUrl.pathname === '/login' && await verifyToken(token || '')) {
    const managerUrl = new URL('/manager/stock', req.url);
    return NextResponse.redirect(managerUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manager/:path*', '/login'],
};
