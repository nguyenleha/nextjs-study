import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from '@/libs/I18nRouting'

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

    // Import main app messages
    const appMessages = await import(`../lang/app/${locale}.json`)
    const componentMessages = await import(`../lang/component/${locale}.json`)

    // Import các namespace con
    const animationsMessages = await import(`../lang/app/animations/${locale}.json`).catch(() => ({ default: {} }))
    const chartsMessages = await import(`../lang/app/charts/${locale}.json`).catch(() => ({ default: {} }))
    const dashboardMessages = await import(`../lang/app/dashboard/${locale}.json`).catch(() => ({ default: {} }))
    const formsMessages = await import(`../lang/app/forms/${locale}.json`).catch(() => ({ default: {} }))
    const settingsMessages = await import(`../lang/app/settings/${locale}.json`).catch(() => ({ default: {} }))
    const authMessages = await import(`../lang/app/auth/${locale}.json`).catch(() => ({ default: {} }))

    return {
        locale,
        messages: {
            ...appMessages.default,
            animations: animationsMessages.default,
            charts: chartsMessages.default,
            dashboard: dashboardMessages.default,
            forms: formsMessages.default,
            settings: settingsMessages.default,
            component: componentMessages.default,
            auth: authMessages.default,
        },
    }
})
