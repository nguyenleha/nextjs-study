'use client'
import { clearToken } from '@/lib/constants'
import { useRouter } from 'next/navigation'

type Props = {
    isDashboard?: boolean
}

// Client button không tự đọc cookie (tránh Promise). Header server-side quyết định hiển thị.
export function LogoutButton({ isDashboard = false }: Props) {
    const router = useRouter()
    const handleLogout = async () => {
        await clearToken()
        // Nếu đang ở khu vực dashboard -> chuyển thẳng sang trang login
        if (isDashboard) {
            router.replace('/login')
        } else {
            // Ở trang public thì giữ nguyên URL, chỉ refresh để cập nhật header/menu
            router.refresh()
        }
    }

    return (
        <button onClick={handleLogout} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer' }}>
            Logout
        </button>
    )
}
