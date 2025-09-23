'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/oauth2'
import { TextInput } from '@/components/ui/TextInput'
import { Button } from '@/components/ui/Button'
import { LoginResponse } from '@/types/login'
import { setToken } from '@/lib/constants'

// import { loginService } from '@/services/authService'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('super_admin')
    const [password, setPassword] = useState('Pa12345!@#@')
    const [loading, setLoading] = useState(false)


    const fetchData = useCallback(async () => {
        // setLoading(true)
        try {
            const res = await apiFetch<LoginResponse>('/system/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    remember_me: true,
                    zone: 'DASHBOARD',
                }),
            })
            console.log('res :>> ', res);

            setToken(res, 'access_token')
            setToken(res, 'refresh_token')

            router.refresh()
        } finally {
            // setLoading(false)
        }
    }, [username, password, router])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        try {
            // For demo purposes, we ignore password in the mock service
            await fetchData()
        } catch {
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
            <form
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 20,
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    minWidth: 320,
                }}
            >
                <h1 style={{ fontSize: 20, fontWeight: 600 }}>Đăng nhập</h1>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span>Tài khoản</span>
                    <TextInput placeholder="Nhập tài khoản" value={username} onChange={setUsername} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span>Mật khẩu</span>
                    <TextInput placeholder="Nhập mật khẩu" type="password" value={password} onChange={setPassword} />
                </label>
                <Button type="submit" disabled={loading || !username || !password}>
                    {loading ? 'Đang đăng nhập…' : 'Login'}
                </Button>
            </form>
        </div>
    )
}
