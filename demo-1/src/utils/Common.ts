import { ReadonlyURLSearchParams } from 'next/navigation'

export const getQuery = (searchParams: ReadonlyURLSearchParams): Record<string, string | string[]> => {
    // Convert searchParams to object
    const queryObj: Record<string, string | string[]> = {}
    searchParams.forEach((value, key) => {
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                ;(queryObj[key] as string[]).push(value)
            } else {
                queryObj[key] = [queryObj[key] as string, value]
            }
        } else {
            queryObj[key] = value
        }
    })
    return queryObj
}
