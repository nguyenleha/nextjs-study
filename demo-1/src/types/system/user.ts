export interface LoginRequest {
    username: string
    password: string
    remember_me: boolean
    zone: string
}
export interface PagePermission {
    id: number
    role_id: number
    page_id: number
    permission_id: number
}

export interface Role {
    id: number
    name: string
    page_permission: PagePermission[][]
}

export interface Auth {
    data: {
        id: number
        full_name: string
        username: string
        last_update: null | string
        last_login_at: string
        created_at: string
        roles: {
            count: number
            role_list: Role[]
        }
    }
    message?: string
}
