import { LocalePrefixMode } from 'next-intl/routing'

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    BUILD_ENV: process.env.BUILD_ENV,
    TZ: process.env.TZ,
    SETTING_MANUAL_SYNC_ENABLED: process.env.SETTING_MANUAL_SYNC_ENABLED,

    /**
     * Per page
     */
    DISPATCH_CONTENT_PER_PAGE: 20 as const,
    DISPOSAL_FACILITY_PER_PAGE: 20 as const, // A5
    WORK_ACTIVITY_PER_PAGE: 20 as const, // A6
    DISPATCH_PER_PAGE: 20 as const, // A7
    EMPLOYEE_PER_PAGE: 20 as const, // A8
    VEHICLE_PER_PAGE: 20 as const, // A9
    RESERVATION_PER_PAGE: 20 as const, // A10
    USER_MANAGEMENT_PER_PAGE: 3 as const, // A11

    STRICT: {
        AND: true as const,
        OR: false as const,
    },
}

export const RoleConfig = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    VEHICLE_MANAGEMENT: 'VEHICLE_MANAGEMENT',
    STAFF: 'STAFF',
    APPROVER: 'APPROVER',
    SALE: 'SALE',
    PAGE: {
        DASHBOARD: 1,
        STAFF_ZONE: 2,
        DISPATCH_RECORD: 3,
        APPROVING: 4,
        DISPOSAL_FACILITY: 5,
        WORK_ACTIVITY: 6,
        DISPATCH: 7,
        EMPLOYEE: 8,
        VEHICLE: 9,
        RESERVATION: 10,
        USER: 11,
        SETTING: 12,
    },
    PERMISSIONS: {
        CREATE: 1,
        READ: 2,
        UPDATE: 3,
        DELETE: 4,
        IMPORT: 5,
        EXPORT: 6,
        PDF: 7,
        MENU: 8,
        UPDATE_POSITION: 9,
        UPDATE_PROFILE: 10,
        SYNC_KINTONE: 11,
        FIX_APPROVAL_STATUS: 12,
    },
    ROLE: {
        SUPER_ADMIN: 1,
        ADMIN: 2,
        VEHICLE_MANAGEMENT: 3,
        STAFF: 4,
        APPROVER: 5,
        SALE: 6,
    },
}

const localePrefix: LocalePrefixMode = 'as-needed' // 'always' | 'never' | 'as-needed'

// Available options: 'always' | 'never' | 'as-needed'
// - 'always': Always prefix the locale (e.g., /en, /ja)
// - 'never': Never prefix the locale (e.g., /about)
// - 'as-needed': Prefix the locale only when it's not the default locale (e.g., /about, /ja/about if default is 'en')
export const LocaleConfig = {
    name: 'Nextjs Starter',
    locales: ['ja', 'vi'],
    defaultLocale: 'ja',
    localePrefix,
}
