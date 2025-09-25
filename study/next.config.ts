import type { NextConfig } from 'next'

// Common security headers applied at the edge (still recommended to configure in Nginx too)
const securityHeaders: { key: string; value: string }[] = [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Minimal, permissive CSP suited for a starter; tighten as needed
    {
        key: 'Content-Security-Policy',
        value: ["default-src 'self'", "script-src 'self' 'unsafe-inline' 'unsafe-eval'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self' data:", "connect-src 'self' https: http:", "frame-ancestors 'self'", "base-uri 'self'", "form-action 'self'"].join('; '),
    },
]

const nextConfig: NextConfig = {
    // Enable standalone output for Docker runtime (smaller image)
    output: 'standalone',

    // Ensure strict runtime checks in React
    reactStrictMode: true,

    // Remove x-powered-by header
    poweredByHeader: false,

    // Avoid failing production builds due to lint issues (run `npm run lint` separately)
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Image config: keep defaults, but opt-in to modern formats
    images: {
        formats: ['image/avif', 'image/webp'],
    },

    // Typed routes (moved from experimental in Next.js 15)
    typedRoutes: true,

    // Trust proxy headers when behind Nginx for correct URL generation
    // experimental: {
    //     // Removed: typedRoutes moved to main config
    // },

    // Apply basic security headers to all routes
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
}

export default nextConfig
