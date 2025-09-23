import { LoginResponse } from '@/types/login'
import { RequestOptions } from '@/types/next'
import { API_BASE_URL, getCookieValue, removeCookieValue, setToken, clearToken } from './constants'

export async function apiFetch<T>(path: string, options: RequestOptions = {}, cookieMap?: Partial<{ [key: string]: string }>): Promise<T> {
    try {
        const base = options.baseUrl ?? API_BASE_URL ?? ''
        const accessToken = cookieMap?.['access_token'] ?? (await getCookieValue('access_token'))
        const refreshToken = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token'))
        const tokenType = cookieMap?.['token_type'] ?? (await getCookieValue('token_type')) ?? 'Bearer'

        const hdrs = new Headers(options.headers || {})
        if (!hdrs.has('Content-Type')) hdrs.set('Content-Type', 'application/json')
        if (!hdrs.has('accept-language')) {
            hdrs.set('accept-language', options.language ?? 'ja')
        }

        if (accessToken) {
            hdrs.set('authorization', `${tokenType} ${accessToken}`)
        } else {
            hdrs.delete('authorization')
            hdrs.delete('Authorization')
        }

        const res = await fetch(base + path, {
            headers: hdrs,
            ...options,
            cache: options.cache ?? 'no-cache',
        })

        if (res.status === 401) {
            if (refreshToken) {
                const refresh_token = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token'))
                await removeCookieValue('refresh_token')
                await apiFetch<LoginResponse>('/system/refresh-token', {
                    method: 'POST',
                    body: JSON.stringify({
                        refresh_token,
                    }),
                })
                    .then(async (newTokens) => {
                        console.log('newTokens :>> ', newTokens)
                        if (!newTokens.access_token || !newTokens.refresh_token) {
                            await setToken(newTokens, 'access_token')
                            await setToken(newTokens, 'refresh_token')
                            await apiFetch<T>(path, options, cookieMap)
                        }
                    })
                    .catch((error) => {
                        if (error instanceof Error) {
                            console.error('Token refresh failed:', error.message)
                            throw error
                        }
                    })
            } else {
                await clearToken()
            }
            return (await res.json()) as T
        } else {
            if (!res.ok) {
                const text = await res.text()
                throw new Error(`HTTP ${res.status}: ${text}`)
            }
            return (await res.json()) as T
        }
    } catch (error) {
        console.error('API fetch error:', error)
        throw error
    }
}
