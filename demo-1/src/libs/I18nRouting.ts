import { defineRouting } from 'next-intl/routing'
import { LocaleConfig } from '@/utils/AppConfig'

export const routing = defineRouting({
    locales: LocaleConfig.locales,
    localePrefix: LocaleConfig.localePrefix,
    defaultLocale: LocaleConfig.defaultLocale,
})
