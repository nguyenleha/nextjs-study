import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'User create',
    description: 'User create page',
}

export default function userCreateLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}
