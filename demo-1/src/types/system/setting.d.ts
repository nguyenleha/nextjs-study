import { LinkMetaMessage } from '@/types/common'

export interface SettingList {
  id: number
  key: string
  value: string
  type: string
  description: string
  group: string
}

export interface Setting extends LinkMetaMessage {
  data: Array<SettingList>
  message?: string
}

export interface SettingForm {
  key?: string
  value?: string
  type?: string
  description?: string
  group?: string
  is_public?: boolean
}

export interface ErrorsSetting {
  key?: string[]
  value?: string[]
  type?: string[]
  description?: string[]
  group?: string[]
}

export interface SettingDetail {
  data: SettingList
  errors: ErrorsSetting
  message?: string
}
