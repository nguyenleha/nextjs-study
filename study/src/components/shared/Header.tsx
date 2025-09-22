import Link from 'next/link'
import type { Route } from 'next'

export function Header() {
    const nav: { href: Route; label: string }[] = [
        { href: '/', label: 'Root' },
        { href: '/home', label: 'Public Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/settings', label: 'Settings' },
    ]
    return (
        <header style={{ borderBottom: '1px solid #e5e7eb', padding: 12, marginBottom: 16 }}>
            <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {nav.map((n) => (
                    <Link key={n.href} href={n.href} style={{ color: '#2563eb' }}>
                        {n.label}
                    </Link>
                ))}
            </nav>
        </header>
    )
}
