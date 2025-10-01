import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './I18nRouting'

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

    // Import từng namespace (app, component, ...)
    const [appMessages, animationsMessages, chartsMessages, dashboardMessages, formsMessages, settingsMessages, componentMessages] = await Promise.all([
        // App messages
        import(`../lang/app/${locale}.json`).then((m) => m.default),
        // Animations messages
        import(`../lang/app/animations/${locale}.json`).then((m) => m.default),
        // Charts messages
        import(`../lang/app/charts/${locale}.json`).then((m) => m.default),
        // Dashboard messages
        import(`../lang/app/dashboard/${locale}.json`).then((m) => m.default),
        // Forms messages
        import(`../lang/app/forms/${locale}.json`).then((m) => m.default),
        // Settings messages
        import(`../lang/app/settings/${locale}.json`).then((m) => m.default),
        // Component messages
        import(`../lang/component/${locale}.json`).then((m) => m.default),
    ])

    return {
        locale,
        messages: {
            ...appMessages,
            animations: animationsMessages,
            charts: chartsMessages,
            dashboard: dashboardMessages,
            forms: formsMessages,
            settings: settingsMessages,
            component: componentMessages,
        },
    }
})
