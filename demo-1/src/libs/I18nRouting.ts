import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
    locales: ['en', 'fr'],
    localePrefix: 'as-needed',
    defaultLocale: 'en',
})
