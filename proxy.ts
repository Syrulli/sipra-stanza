import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    if (pathname.startsWith('/dashboard') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};