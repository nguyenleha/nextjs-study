import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const baseConfig: NextConfig = {
    eslint: {
        dirs: ['.'],
    },
    poweredByHeader: false,
    reactStrictMode: false,
    outputFileTracingIncludes: {
        '/': ['./migrations/**/*'],
    },
}
let configWithPlugins = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig)

if (process.env.ANALYZE === 'true') {
    configWithPlugins = withBundleAnalyzer()(configWithPlugins)
}

const nextConfig = configWithPlugins

export default nextConfig
