// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

class ApiService {
    private baseURL: string

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // GET method
    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' })
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

// Export singleton instance
export const apiService = new ApiService()

// User-specific API calls
export const userApi = {
    getUsers: () => apiService.get<User[]>('/users'),
    getUser: (id: string) => apiService.get<User>(`/users/${id}`),
    createUser: (userData: CreateUserData) => apiService.post<User>('/users', userData),
    updateUser: (id: string, userData: UpdateUserData) => apiService.put<User>(`/users/${id}`, userData),
    deleteUser: (id: string) => apiService.delete(`/users/${id}`),
}

// Types
interface User {
    id: string
    name: string
    email: string
    createdAt: string
}

interface CreateUserData {
    name: string
    email: string
    password: string
}

interface UpdateUserData {
    name?: string
    email?: string
}
