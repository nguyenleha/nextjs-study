import { LinkMetaMessage } from '@/types/common'

export interface Permission {
    role_id: number
    page_id: number
    permission_id: number
}

export interface Ability {
    id: number
    page_permission: Permission[][]
}

export interface PagePermissions {
    role_id: number
    page_id: number
    permission_id: number[]
}

/**
 * =====================
 * Role
 * =====================
 */
export interface RolesPage {
    id: number
    name: string
    description: string
    pivot: {
        role_id: number
        page_id: number
        permission_id: number
    }
}

export interface RolesList {
    id: number
    name: string
    name_jp: string
    pages: Array<RolesPage>
}

export interface Roles extends LinkMetaMessage {
    data: {
        count: number
        role_list: Array<RolesList>
    }
    errors?: {
        per_page: string[]
    }
}
