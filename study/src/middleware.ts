import { NextResponse, type NextRequest } from 'next/server'

// Simple auth guard middleware
export function middleware(req: NextRequest) {
    const { nextUrl, cookies } = req
    const accessToken = cookies.get('access_token')?.value
    const pathname = nextUrl.pathname

    // Visiting login: if already authed, bounce to redirect target or default
    if (pathname.startsWith('/login')) {
        if (accessToken) {
            const target = nextUrl.searchParams.get('redirect') || '/projects'
            return NextResponse.redirect(new URL(target, nextUrl))
        }
        return NextResponse.next()
    }

    // If already authenticated, allow
    if (accessToken) return NextResponse.next()

    // Otherwise redirect to login with redirect back to original url
    const loginUrl = new URL('/login', nextUrl)
    loginUrl.searchParams.set('redirect', nextUrl.pathname + nextUrl.search)
    return NextResponse.redirect(loginUrl)
}

// Apply only to dashboard-protected routes
export const config = {
    matcher: [
        // App routes inside (dashboard) segment
        '/projects/:path*',
        '/settings/:path*',
        '/test/:path*',
        // Handle login bounce when already authed
        '/login',
        // You can add more protected paths here, e.g. '/dashboard/:path*'
    ],
}
