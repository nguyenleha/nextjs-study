'use client'

import Image from 'next/image'
import userIcon from '@/assets/images/login/user_icon.svg'
import pwdIcon from '@/assets/images/login/pwd_icon.svg'
import { useEffect, useState } from 'react'
import { clearToken, setToken } from '@/utils/ApiUtils'
import { fetchAuthen, fetchLogin } from '@/api/system/auth'
import { LoginRequest } from '@/types/system/user'
import { TextInput } from '@/components/ui/TextInput'
import { Button } from '@/components/ui/Button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAuth, setRoleRedux, setUrlAfterLogin } from '@/store/slice/auth'
import { useRouter } from 'next/navigation'
import { validate } from '@/utils/Common'

export default function LoginPage() {
    const router = useRouter()

    const [valLogin, setValLogin] = useState<LoginRequest>({ username: 'super_admin', password: 'Pa12345!@#@', remember_me: true, zone: 'DASHBOARD' })
    const [errMes, setErrMes] = useState<{ username?: string[]; password?: string[] }>({})
    const [pending, setPending] = useState(false)
    const authStore = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setErrMes({})
    }, [valLogin])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate(pending, errMes)) {
            setPending(true)
            await clearToken()
            // Submit logic here
            await fetchLogin({
                username: valLogin.username,
                password: valLogin.password,
                remember_me: valLogin.remember_me,
                zone: valLogin.zone,
            })
                .then(async (res) => {
                    await setToken(res, 'access_token')
                    await setToken(res, 'refresh_token')
                    const apiAuthen = await fetchAuthen()
                    dispatch(setAuth(apiAuthen || {}))
                    dispatch(setRoleRedux(apiAuthen.data.roles.role_list))

                    const urlAfterLogin = authStore.urlAfterLogin
                    dispatch(setUrlAfterLogin(''))
                    router.push(urlAfterLogin || '/')
                })
                .catch((error) => {
                    if (error?.errors) {
                        setErrMes(error.errors)
                    }
                    console.error('Login failed:', error)
                })
        }
        setPending(false)
    }

    return (
        <>
            <h1 className="login_title">ログイン</h1>
            <form onSubmit={submit}>
                <ul className="login_list">
                    <li className="login_item">
                        <div className="login_input_block">
                            <Image src={userIcon} width={24} height={24} alt="user" />
                            <TextInput placeholder="User" type="text" value={valLogin.username} onChange={(value) => setValLogin((v) => ({ ...v, username: value }))} className="login_input" />
                        </div>
                        {errMes?.username && errMes.username[0] && <p className="form_error">{errMes.username[0]}</p>}
                    </li>
                    <li className="login_item">
                        <div className="login_input_block">
                            <Image src={pwdIcon} width={24} height={24} alt="password" />
                            <TextInput placeholder="Password" type="password" value={valLogin.password} onChange={(value) => setValLogin((v) => ({ ...v, password: value }))} className="login_input" />
                        </div>
                        {errMes?.password && errMes.password[0] && <p className="form_error">{errMes.password[0]}</p>}
                    </li>
                </ul>
                <Button type="submit" className="common_highlight_btn w240 center" pending={{ action: pending, white: true }}>
                    ログイン
                </Button>
            </form>
        </>
    )
}
