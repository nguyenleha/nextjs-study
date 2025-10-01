import { LocalePrefixMode, defineRouting } from 'next-intl/routing'

// Available options: 'always' | 'never' | 'as-needed'
// - 'always': Always prefix the locale (e.g., /en, /ja)
// - 'never': Never prefix the locale (e.g., /about)
// - 'as-needed': Prefix the locale only when it's not the default locale (e.g., /about, /ja/about if default is 'en')
const localePrefix: LocalePrefixMode = 'as-needed'

export const routing = defineRouting({
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localePrefix,
})
