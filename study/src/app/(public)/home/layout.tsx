import type { ReactNode } from 'react'

export default function PublicHomeLayout({ children }: { children: ReactNode }) {
    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, margin: 16 }}>
            <header style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
                <h2>(public)/home layout</h2>
            </header>
            <main style={{ padding: 16 }}>{children}</main>
        </div>
    )
}
