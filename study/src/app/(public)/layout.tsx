import type { ReactNode } from 'react'
import { Header } from '@/components/shared/Header'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            <main style={{ paddingTop: 12 }}>{children}</main>
        </div>
    )
}
