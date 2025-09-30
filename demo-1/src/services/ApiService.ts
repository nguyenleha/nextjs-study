import { RequestOptions, TokenResponse } from '@/types/common'
import { clearToken, getCookieValue, removeCookieValue, setToken } from '@/utils/ApiUtils'
import { AppConfig } from '@/utils/AppConfig'

// Base API configuration
const API_BASE_URL = AppConfig.NEXT_PUBLIC_API_URL || ''

class ApiService {
    private baseURL: string

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}, cookieMap?: Partial<Record<string, string>>): Promise<T> {
        const url = `${this.baseURL}${endpoint}`
        const refreshToken = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token')) ?? ''
        const accessToken = cookieMap?.['access_token'] ?? (await getCookieValue('access_token')) ?? ''
        const tokenType = cookieMap?.['token_type'] ?? (await getCookieValue('token_type')) ?? 'Bearer'
        const lang = cookieMap?.['NEXT_LOCALE'] ?? (await getCookieValue('NEXT_LOCALE')) ?? options.language ?? 'vi'

        try {
            const res = await fetch(url, {
                cache: options.cache ?? 'no-cache',
                headers: {
                    ...options.headers,
                    'Accept-Language': lang,
                    'Content-Type': 'application/json',
                    ...(accessToken ? { authorization: `${tokenType} ${accessToken}` } : {}),
                },
                ...options,
            })

            if (res.status === 401) {
                if (refreshToken) {
                    const refreshTokenFlag = refreshToken
                    await removeCookieValue('refresh_token')

                    await this.post<TokenResponse>('/system/refresh-token', {
                        refresh_token: refreshTokenFlag,
                    })
                        .then(async (data) => {
                            // Cập nhật token mới và retry API gốc
                            if (data.access_token && data.refresh_token) {
                                await setToken(data, 'access_token')
                                await setToken(data, 'refresh_token')
                                await this.request<T>(endpoint, options, cookieMap)
                            }
                        })
                        .catch((error) => {
                            console.error('API request failed:', error)
                            throw error
                        })
                } else {
                    await clearToken()
                    window.location.href = '/sign-in'
                }
            }

            if (res.status === 422) {
                throw await res.json()
            }

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            return await res.json()
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // GET method
    async get<T>(endpoint: string, data?: unknown): Promise<T> {
        let url = endpoint
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            const stringifiedData: Record<string, string> = {}
            Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
                stringifiedData[key] = value !== undefined && value !== null ? String(value) : ''
            })
            const params = new URLSearchParams(stringifiedData).toString()
            url += (endpoint.includes('?') ? '&' : '?') + params
        }
        return this.request<T>(url, { method: 'GET' })
    }

    // POST method
    async post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // PUT method
    async put<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    // DELETE method
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }
}

const apiService = new ApiService()
export default apiService
