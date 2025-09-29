import ApiService from '@/services/ApiService'
import { Request } from '@/types/common'
import { FormCreate, User, UserDetail } from '@/types/userManagement'
import { AppConfig, RoleConfig } from '@/utils/AppConfig'

const url = '/system/user'

export const fetchUser = (request: Request) => {
    return ApiService.post<User>(`${url}/search`, {
        ...request,
        doesntHave: {
            roles: {
                where: [
                    {
                        'roles.id': [RoleConfig.ROLE.SUPER_ADMIN, RoleConfig.ROLE.STAFF],
                        strict: AppConfig.STRICT.AND,
                    },
                ],
                relationship: 'roles',
            },
        },
    })
}

export const fetchUserCreate = (request: FormCreate) => {
    return ApiService.post<UserDetail>(`${url}`, request)
}
export const fetchUserDetail = (param: string) => {
    return ApiService.get<UserDetail>(`${url}/${param}`)
}
export const fetchUserUpdate = (param: string, request: FormCreate) => {
    return ApiService.put<UserDetail>(`${url}/${param}`, request)
}
