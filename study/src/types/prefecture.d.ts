// Prefecture item
export type Prefecture = {
    id: number
    name: string // Tên tỉnh (ví dụ: 北海道)
    alphabet: string // alphabet name (ví dụ: hokkaido)
    sort_order: number
    description: string
    featured_flag: '0' | '1' // string flag
    layout: string // ví dụ: "num_1"
    image: string // đường dẫn ảnh
}

// Links trong meta
export type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

// Meta data
export type Meta = {
    current_page: number
    from: number
    last_page: number
    links: PaginationLink[]
    path: string
    per_page: number
    to: number
    total: number
}

// Links ngoài cùng
export type Links = {
    first: string
    last: string
    prev: string | null
    next: string | null
}

// Response chính
export type PrefectureResponse = {
    data: {
        count: number
        list: Prefecture[]
    }
    links: Links
    meta: Meta
}
