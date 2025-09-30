import { FormSearch, Query } from '@/types/common'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const getQuery = (searchParams: ReadonlyURLSearchParams): Query => {
    // Convert searchParams to object
    const queryObj: Query = {}
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

export const validate = (pending: boolean, errMes: Record<string, string[] | undefined>) => {
    return (
        !pending &&
        Object.values(errMes)
            .filter((item) => item)
            .every((item) => item?.length === 0)
    )
}

export const scrollErr = () => {
    const errDiv = document.getElementById('form_error')
    if (errDiv) {
        const offsetTop = errDiv.offsetTop
        const offHeader = 130
        window.scrollTo({
            top: offsetTop - offHeader,
            behavior: 'smooth',
        })
    }
}

export const routeQuery = (queryObj: Query, currentPage: number, formSearch: FormSearch, keySort: Record<string, string>) => {
    let newQueryObj: Query = { ...queryObj }
    if (currentPage !== 1) newQueryObj = Object({ ...newQueryObj, currentPage: `${currentPage}` })
    Object.entries(formSearch).forEach(([key, value]) => {
        if (key && value && Number(value) !== -1) {
            newQueryObj[key] = value
        }
    })
    Object.entries(keySort).forEach(([key, value]) => {
        if (value && key) {
            newQueryObj[key] = value
        }
    })
    const searchParams = new URLSearchParams()
    Object.entries(newQueryObj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val) => searchParams.append(key, val))
        } else {
            searchParams.append(key, String(value))
        }
    })
    return { newQueryObj, querySearchParams: searchParams.toString() }
}
