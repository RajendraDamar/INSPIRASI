import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

// Protect /reports/* and /profile
const PROTECTED_PATHS = ['/reports', '/profile']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // only handle protected paths
  if (!PROTECTED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  const authToken = req.cookies.get('auth_token')?.value

  if (!authToken) {
    const loginUrl = new URL('/auth/login', req.url)
    // preserve original destination so the app can redirect after login
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    await verifyToken(authToken)
    return NextResponse.next()
  } catch (err) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/reports/:path*', '/profile'],
}
