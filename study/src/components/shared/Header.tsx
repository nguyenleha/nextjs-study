import Link from 'next/link'
import type { Route } from 'next'
import { cookies } from 'next/headers'
import { LogoutButton } from '@/components/ui/LogoutButton'

export async function Header() {
    const jar = await cookies()
    // const all = jar.getAll()
    const accessToken = jar.get('access_token')?.value ?? null

    // Log on the server (shows in server console)
    // console.log('SSR cookies:', all)
    // console.log('SSR access-token:', accessToken)

    const nav: { href: Route; label: string }[] = accessToken
        ? [
              { href: '/', label: 'Root' },
              { href: '/home', label: 'Public Home' },
              { href: '/about', label: 'About' },
              { href: '/projects', label: 'Projects' },
              { href: '/settings', label: 'Settings' },
              { href: '/test', label: 'test' },
          ]
        : [
              { href: '/', label: 'Root' },
              { href: '/home', label: 'Public Home' },
              { href: '/about', label: 'About' },
              { href: '/login', label: 'Login' },
          ]

    return (
        <header style={{ borderBottom: '1px solid #e5e7eb', padding: 12, marginBottom: 16 }}>
            <nav style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {nav.map((n) => (
                    <Link key={n.href} href={n.href} style={{ color: '#2563eb' }}>
                        {n.label}
                    </Link>
                ))}
                {accessToken && <LogoutButton />}
            </nav>
        </header>
    )
}
