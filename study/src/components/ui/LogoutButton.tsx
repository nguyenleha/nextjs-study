'use client'
import { clearToken } from '@/lib/constants'
import { useRouter } from 'next/navigation'

// Client button không tự đọc cookie (tránh Promise). Header server-side quyết định hiển thị.
export function LogoutButton() {
    const router = useRouter()
    const handleLogout = async () => {
        await clearToken()
        // Yêu cầu Next.js refresh lại dữ liệu server (including cookies)
        router.refresh()
    }

    return (
        <button onClick={handleLogout} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer' }}>
            Logout
        </button>
    )
}
