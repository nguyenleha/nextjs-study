import { LinkMetaMessage } from '@/types/common'

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

/**
 * =====================
 * Page
 * =====================
 */
export interface PermissionList {
  id: number
  name: string
}

export interface PageList {
  id: number
  name: string
  permissions: {
    count: number
    permission_list: Array<PermissionList>
  }
}

export interface Pages extends LinkMetaMessage {
  data: {
    count: number
    page_list: Array<PageList>
  }
  errors?: {
    per_page: string[]
  }
}

/**
 * =====================
 * Permission
 * =====================
 */

export interface Permissions extends LinkMetaMessage {
  data: {
    count: number
    permission_list: Array<PermissionList>
  }
  errors?: {
    per_page: string[]
  }
}
