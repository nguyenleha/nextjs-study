import type { ReactNode } from 'react'
import { Header } from '../../components/shared/Header'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {/* Double header for dashboard area */}
            <Header />
            <Header />
            <main style={{ paddingTop: 12 }}>{children}</main>
        </div>
    )
}
