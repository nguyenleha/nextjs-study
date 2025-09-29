export type RequestOptions = RequestInit & { baseUrl?: string } & { language?: string }

export interface RequestJson {
    json?: Array<object>
    join?: object
    has?: object
    json_sort?: { orderBy: Array<object> }
    where?: Array<object>
    orderByJoin?: object
    orderBy?: Array<object>
    with?: string[]
    page?: number
    perPage?: number
    all?: boolean
    withCount?: object
    topByColumn?: Array<object>
}

export interface Request {
    doesntHave?: object
    join?: object
    must_join?: object
    has?: object
    where?: Array<object>
    must_where?: Array<object>
    with?: string[]
    page?: number
    perPage?: number
    orderBy?: string | Array<object>
    orderByJoin?: object
    descending?: boolean
    dispatchRecordId?: number
    all?: boolean
    withCount?: object
    topByColumn?: Array<object>
}

export interface LinkMetaMessage {
    links?: {
        first: string
        last: string
        prev: number
        next: number
    }
    meta?: {
        current_page: number
        from: number
        last_page: number
        links: Array<{
            url: string
            label: string
            active: boolean
        }>
        path: string
        per_page: number
        to: number
        total: number
    }
    message?: string
}
export interface TokenResponse extends LinkMetaMessage {
    token_type: string
    expires_in: number
    access_token: string
    refresh_token: string
    remember_me?: boolean
    errors: {
        username: string[]
    }
}

export interface AsideType {
    id: number
    name: string
    aside_btn: boolean
    role?: boolean
    path: string
    sub: Array<{
        name: string
        path: string
        role?: boolean
        new_tab: boolean
    }>
}

export interface FormSearch {
    [key: string]: string | number | string[]
}

export interface OrderBy {
    column: string
    direction: string
}

export type Query = Record<string, string | string[] | number>

export type Params = Record<string, string | string[] | number>

export type WhereCondition = Record<string, string | string[] | { from: string; to: string } | { greaterThanOrEqualTo: string } | { lessThanOrEqualTo: string }>

export type JoinOrderBy = { [key: string]: { orderBy: OrderBy[]; relationship: string } }
