import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'User list',
    description: 'User list page',
}

export default function userListLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}
