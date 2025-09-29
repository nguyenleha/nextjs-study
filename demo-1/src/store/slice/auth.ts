import { Ability, PagePermissions, Permission, Roles } from '@/types/system/auth'
import { Role, Auth } from '@/types/system/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        urlAfterLogin: '' as string,
        getAuth: {} as Auth,
        system500: false as boolean,
        abilities: [] as Array<PagePermissions>,
        roles: { data: { count: 0, role_list: [] } } as Roles,
    },
    reducers: {
        setUrlAfterLogin: (state, action: PayloadAction<string>) => {
            state.urlAfterLogin = action.payload
        },
        setSystem500: (state) => {
            state.system500 = true
        },
        setAuth: (state, action: PayloadAction<Auth>) => {
            state.getAuth = action.payload
        },
        setRoleRedux: (state, action: PayloadAction<Role[]>) => {
            const roleList = action.payload
            const pagePermissions: PagePermissions[] = []
            roleList.forEach((ability: Ability) => {
                ability.page_permission.forEach((pagePermission: Permission[]) => {
                    pagePermission.forEach((pp: Permission) => {
                        const existingPage = pagePermissions.find((item) => item.page_id === pp.page_id)
                        if (existingPage && !existingPage.permission_id.includes(pp.permission_id)) {
                            existingPage.permission_id.push(pp.permission_id)
                        } else if (!existingPage) {
                            pagePermissions.push({
                                role_id: pp.role_id,
                                page_id: pp.page_id,
                                permission_id: [pp.permission_id],
                            })
                        }
                    })
                })
            })
            state.abilities = pagePermissions
        },
        setRolesRedux: (state, action: PayloadAction<Roles>) => {
            state.roles = action.payload
        },
        setClear: (state, action: PayloadAction<Auth>) => {
            state.abilities = []
            state.getAuth = action.payload
        },
    },
})

// 4. Export actions và reducer
export const { setUrlAfterLogin, setSystem500, setAuth, setRoleRedux, setClear, setRolesRedux } = authSlice.actions
export default authSlice.reducer
