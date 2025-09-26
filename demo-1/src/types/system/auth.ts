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
