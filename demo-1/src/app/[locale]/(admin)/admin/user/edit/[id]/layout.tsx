import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'User edit',
    description: 'User edit page',
}

export default function userEditLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}
