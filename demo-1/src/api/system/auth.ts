import ApiService from '@/services/ApiService'
import { TokenResponse } from '@/types/common'
import { Auth, LoginRequest } from '@/types/system/user'

const url = '/system/auth'

export const fetchLogin = (LoginRequest: LoginRequest): Promise<TokenResponse> => {
    return ApiService.post<TokenResponse>(`${url}/login`, LoginRequest)
}

export const fetchAuthen = (get_privilege: boolean = true) => {
  return ApiService.get<Auth>(`${url}`, { get_privilege })
}
