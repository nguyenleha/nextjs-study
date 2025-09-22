import { useMemo, useState } from 'react'

export function useAuth() {
    const [user, setUser] = useState<{ id: string; name: string } | null>(null)

    const login = (name: string) => setUser({ id: 'demo', name })
    const logout = () => setUser(null)

    const isAuthenticated = useMemo(() => Boolean(user), [user])

    return { user, isAuthenticated, login, logout }
}
