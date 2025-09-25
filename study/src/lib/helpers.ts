// Format currency
export const formatCurrency = (amount: number, currency = 'VND'): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency,
    }).format(amount)
}

// Format date
export const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('vi-VN')
}

// Debounce function
export const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

// Generate random ID
export const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Validate email
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
