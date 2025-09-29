'use client'

import { fetchAuthen } from '@/api/system/auth'
import { AsideMenu } from '@/components/shared/AsideMenu'
import { Header } from '@/components/shared/Header'
import { Loading } from '@/components/shared/Loading'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAuth, setRoleRedux } from '@/store/slice/auth'

import { useCallback, useEffect } from 'react'

export default function Home() {
    const authStore = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const test = useCallback(async () => {
        try {
            if (authStore.getAuth && Object.keys(authStore.getAuth).length === 0) {
                const apiAuthen = await fetchAuthen()
                dispatch(setAuth(apiAuthen || {}))
                dispatch(setRoleRedux(apiAuthen.data.roles.role_list))
            }
        } catch (error) {
            console.error('Failed to fetch data:', error)
        } finally {
            // setLoading(false)
        }
    }, [dispatch, authStore])

    useEffect(() => {
        test()
    }, [test])

    return (
        <>
            {authStore.getAuth && Object.keys(authStore.getAuth).length > 0 ? (
                <>
                    <Header />
                    <main id="Main" className="common_main">
                        <div id="LayoutWrap" className="layout_wrap">
                            <AsideMenu />
                            <div className="layout_main hidden-menu">
                                {/* <RouterView /> */}
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <div className="pending_app" style={{ height: '50vh' }}>
                    <Loading lg />
                </div>
            )}
        </>
    )
}
