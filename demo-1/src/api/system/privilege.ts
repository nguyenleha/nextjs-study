import ApiService from '@/services/ApiService'
import type { Request } from '@/types/common'
import type { Setting, SettingDetail, SettingForm } from '@/types/system/setting'
import type { Pages, Roles, Permissions } from '@/types/system/privilege'
import { AppConfig } from '@/utils/AppConfig'

const url = '/system'

export const fetchRoles = (request: Request) => {
  return ApiService.post<Roles>(`${url}/roles`, request)
}
export const fetchPages = (request: Request) => {
  return ApiService.post<Pages>(`${url}/pages`, request)
}

export const fetchPermissions = (request: Request) => {
  return ApiService.post<Permissions>(`${url}/pages`, request)
}

export const fetchSetting = (request: Request) => {
  return ApiService.post<Setting>(`${url}/settings/search`, request)
}

export const fetchSettingCreate = (request: SettingForm) => {
  return ApiService.post<SettingDetail>(`${url}/settings`, request)
}

export const fetchSettingUpdate = (param: string, request: SettingForm) => {
  return ApiService.put<SettingDetail>(`${url}/settings/${param}`, request)
}

export const fetchSettingManualSyncEnabled = () => {
  return ApiService.get<SettingDetail>(
    `${url}/settings/key/${AppConfig.SETTING_MANUAL_SYNC_ENABLED}`,
  )
}
