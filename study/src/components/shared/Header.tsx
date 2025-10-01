import Link from 'next/link'
import type { Route } from 'next'
import { cookies } from 'next/headers'
import { LogoutButton } from '@/components/ui/LogoutButton'
import ThemeSwitcher from '@/components/ThemeSwitcher'

type HeaderProps = {
    isDashboard?: boolean
}

export async function Header({ isDashboard = false }: HeaderProps) {
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
              { href: '/test', label: 'Test' },
              { href: '/theme-demo', label: 'Theme Demo' },
          ]
        : [
              { href: '/', label: 'Root' },
              { href: '/home', label: 'Public Home' },
              { href: '/about', label: 'About' },
              { href: '/login', label: 'Login' },
              { href: '/theme-demo', label: 'Theme Demo' },
          ]

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-8 flex-wrap">
                        {nav.map((n) => (
                            <Link 
                                key={n.href} 
                                href={n.href} 
                                className="text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                {n.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                        {accessToken && <LogoutButton isDashboard={isDashboard} />}
                    </div>
                </nav>
            </div>
        </header>
    )
}
