import { LoginResponse } from '@/types/login'
import { RequestOptions } from '@/types/next'
import { API_BASE_URL, getCookieValue, setToken, clearToken } from './constants'

export async function apiFetch<T>(path: string, options: RequestOptions = {}, cookieMap?: Partial<{ [key: string]: string }>): Promise<T> {
    const base = options.baseUrl ?? API_BASE_URL ?? ''

    // Read tokens (cookieMap overrides cookies when provided)
    const accessToken = cookieMap?.['access_token'] ?? (await getCookieValue('access_token'))
    const refreshToken = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token'))
    const tokenType = cookieMap?.['token_type'] ?? (await getCookieValue('token_type')) ?? 'Bearer'

    // Normalize headers
    const hdrs = new Headers(options.headers || {})
    if (!hdrs.has('Content-Type')) hdrs.set('Content-Type', 'application/json')
    if (!hdrs.has('accept-language')) hdrs.set('accept-language', options.language ?? 'ja')

    if (accessToken) hdrs.set('authorization', `${tokenType} ${accessToken}`)
    else {
        hdrs.delete('authorization')
        hdrs.delete('Authorization')
    }

    const doRequest = async () =>
        fetch(base + path, {
            ...options,
            headers: hdrs,
            cache: options.cache ?? 'no-cache',
        })

    try {
        // First attempt
        let res = await doRequest()

        if (res.status !== 401) {
            if (!res.ok) {
                const text = await res.text()
                throw new Error(`HTTP ${res.status}: ${text}`)
            }
            return (await res.json()) as T
        }

        // 401: attempt refresh if possible
        if (!refreshToken) {
            await clearToken()
            const text = await res.text().catch(() => '')
            throw new Error(text || 'Unauthorized')
        }

        // Refresh tokens
        const refreshRes = await fetch(base + '/system/refresh-token', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'accept-language': hdrs.get('accept-language') ?? 'ja' }),
            body: JSON.stringify({ refresh_token: refreshToken }),
            cache: 'no-cache',
        })

        if (!refreshRes.ok) {
            await clearToken()
            const text = await refreshRes.text().catch(() => '')
            throw new Error(text || `HTTP ${refreshRes.status}: Refresh failed`)
        }

        const newTokens = (await refreshRes.json()) as LoginResponse
        if (!newTokens.access_token || !newTokens.refresh_token) {
            await clearToken()
            throw new Error('Invalid refresh token response')
        }

        // Persist tokens and retry once
        await setToken(newTokens, 'access_token')
        await setToken(newTokens, 'refresh_token')
        hdrs.set('authorization', `${newTokens.token_type ?? tokenType} ${newTokens.access_token}`)

        res = await doRequest()
        if (!res.ok) {
            const text = await res.text()
            throw new Error(`HTTP ${res.status}: ${text}`)
        }
        return (await res.json()) as T
    } catch (error) {
        console.error('API fetch error:', error)
        throw error
    }
}
