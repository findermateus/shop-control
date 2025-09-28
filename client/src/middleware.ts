import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {verifyToken} from './lib/auth';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const isAuthenticated = await verifyToken(token || '')

    if (!isAuthenticated && req.nextUrl.pathname !== '/login') {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (req.nextUrl.pathname === '/login' && isAuthenticated) {
        const managerUrl = new URL('/manager/stock', req.url);
        return NextResponse.redirect(managerUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/manager/:path*', '/login'],
};
