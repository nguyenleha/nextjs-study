// Các kiểu dữ liệu dùng chung
import { LoginResponse } from '@/types/login'
import { RequestOptions } from '@/types/next'
// Các helper về token/cookie và API base URL
import { API_BASE_URL, getCookieValue, removeCookieValue, setToken, clearToken } from './constants'

/**
 * apiFetch
 * - Hàm wrapper quanh fetch để tự động gắn Authorization header và xử lý 401 (refresh token).
 * - T có thể là bất kỳ kiểu dữ liệu JSON trả về từ API.
 *
 * Tham số:
 * - path: đường dẫn API tương đối (sẽ nối với API_BASE_URL hoặc options.baseUrl)
 * - options: các tùy chọn fetch, có thêm baseUrl và language
 * - cookieMap: map tạm thời (ví dụ khi SSR) để đọc token thay vì đọc từ cookies thực tế
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}, cookieMap?: Partial<{ [key: string]: string }>): Promise<T> {
    try {
        // 1) Xác định base URL: ưu tiên options.baseUrl, sau đó API_BASE_URL, cuối cùng là chuỗi rỗng
        const base = options.baseUrl ?? API_BASE_URL ?? ''
        // 2) Lấy token từ cookieMap (nếu có) hoặc từ cookies (client/server)
        const accessToken = cookieMap?.['access_token'] ?? (await getCookieValue('access_token'))
        const refreshToken = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token'))
        const tokenType = cookieMap?.['token_type'] ?? (await getCookieValue('token_type')) ?? 'Bearer'

        // 3) Dựng headers và đảm bảo một số header mặc định
        const hdrs = new Headers(options.headers || {})
        const ensure = (k: string, v: string) => {
            if (!hdrs.has(k)) hdrs.set(k, v)
        }
        ensure('Content-Type', 'application/json')
        ensure('accept-language', options.language ?? 'ja')

        // 4) Gắn Authorization nếu có accessToken; nếu không thì xóa header này
        if (accessToken) {
            hdrs.set('authorization', `${tokenType} ${accessToken}`)
        } else {
            hdrs.delete('authorization')
            hdrs.delete('Authorization')
        }

        // 5) Gọi API chính
        const res = await fetch(base + path, {
            cache: options.cache ?? 'no-cache',
            headers: hdrs,
            ...options,
        })

        // 6) Nếu bị 401: thử refresh token nếu có refreshToken
        if (res.status === 401) {
            if (refreshToken) {
                // refresh_token 1 lần, nêu fail thì dọn token và yêu cầu login lại
                const refresh_token = cookieMap?.['refresh_token'] ?? (await getCookieValue('refresh_token'))
                await removeCookieValue('refresh_token')

                await apiFetch<LoginResponse>('/system/refresh-token', {
                    method: 'POST',
                    body: JSON.stringify({
                        refresh_token,
                    }),
                })
                    .then(async (newTokens) => {
                        // Cập nhật token mới và retry API gốc
                        if (newTokens.access_token && newTokens.refresh_token) {
                            await setToken(newTokens, 'access_token')
                            await setToken(newTokens, 'refresh_token')
                            await apiFetch<T>(path, options, cookieMap)
                            return
                        }
                    })
                    .catch((error) => {
                        if (error instanceof Error) {
                            console.error('Token refresh failed:', error.message)
                            throw error
                        }
                    })
            } else {
                // Không có refresh_token: dọn token và yêu cầu đăng nhập lại.
                await clearToken()
            }
            throw new Error('Unauthorized: Access token is missing or invalid.')
        } else {
            // 7) Các mã khác: nếu không OK thì ném lỗi kèm nội dung, nếu OK thì trả JSON
            if (!res.ok) {
                const text = await res.text()
                throw new Error(`HTTP ${res.status}: ${text}`)
            }
            return (await res.json()) as T
        }
    } catch (error) {
        // Log lỗi và ném lại để caller xử lý.
        console.error('API fetch error:', error)
        throw error
    }
}
