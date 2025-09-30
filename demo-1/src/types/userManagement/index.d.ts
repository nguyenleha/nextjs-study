import type { LinkMetaMessage } from '@/types/common'

export interface UserList {
  id: number
  full_name: string
  username: string
  last_login_at: string
  created_at: string
  updated_at: string
  roles: {
    count: number
    role_list: Array<{
      id: number
      name: string
      name_jp: string
    }>
  }
}

export interface ErrorsUser {
  full_name?: string[]
  username?: string[]
  password?: string[]
  [key: string]: string[] | undefined
}
export interface User extends LinkMetaMessage {
  data: Array<UserList>
  message?: string
}

export interface FormSearchUser {
  username: string
  full_name: string
  role: number
  from: string
  to: string
}
export interface UserDetail {
  data: UserList
  errors: ErrorsUser
  message?: string
}

export interface FormCreate {
  full_name: string
  username?: string
  password?: string
  roles: Array<number>
}
