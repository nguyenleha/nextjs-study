type RequestOptions = RequestInit & { baseUrl?: string }

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const base = options.baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
    const res = await fetch(base + path, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`HTTP ${res.status}: ${text}`)
    }
    return res.json() as Promise<T>
}
