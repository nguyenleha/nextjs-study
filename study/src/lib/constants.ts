import Cookies from 'js-cookie'
import { LoginResponse } from '@/types/login'

export const APP_NAME = 'my-next-app'
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://example.com/api'

export async function getCookieValue(name: string): Promise<string | null> {
    if (typeof window !== 'undefined') {
        return Cookies.get(name) ?? null
    }
    const { cookies: serverCookies } = await import('next/headers')
    const jar = await serverCookies()
    return jar.get(name)?.value ?? null
}

export async function removeCookieValue(name: string): Promise<void> {
    if (typeof window !== 'undefined') {
        Cookies.remove(name)
        return
    }
    const { cookies: serverCookies } = await import('next/headers')
    const jar = await serverCookies()
    jar.delete(name)
}

export async function setToken(login?: LoginResponse, type?: 'access_token' | 'refresh_token') {
    if (login && type && login[type]) {
        const seconds = typeof login.expires_in === 'number' ? login.expires_in : 60 * 60 * 6
        const days = seconds / (60 * 60 * 24)
        const secure = typeof window !== 'undefined' && window.location.protocol === 'https:'
        // Set underscore variant
        Cookies.set(type, login[type], { expires: days, path: '/', sameSite: 'Lax', secure })
        Cookies.set('token_type', login.token_type, { expires: days, path: '/', sameSite: 'Lax', secure })
    }
}

export async function clearToken() {
    await removeCookieValue('access_token')
    await removeCookieValue('refresh_token')
    await removeCookieValue('token_type')
}
