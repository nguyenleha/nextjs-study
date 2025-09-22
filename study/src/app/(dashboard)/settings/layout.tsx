import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Protected area example under (dashboard)/settings',
}

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return children
}
