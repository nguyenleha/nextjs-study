import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/libs/I18nRouting'

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
    // Set the locale cookie if it's not set
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
    if (!localeCookie) {
        request.cookies.set('NEXT_LOCALE', 'en')
    }

    return handleI18nRouting(request)
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/_next`, `/_vercel` or `monitoring`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
}
