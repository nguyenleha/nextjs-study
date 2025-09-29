declare global {
    interface JQuery {
        datetimepicker(options?: Record<string, unknown>): JQuery
        select2(options?: Record<string, unknown>): JQuery
    }

    interface JQueryStatic {
        datetimepicker: {
            setLocale(locale: string): void
        }
    }
}
export {}
