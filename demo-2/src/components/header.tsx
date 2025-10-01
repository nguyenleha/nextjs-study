'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Home, LayoutDashboard, FormInput, Palette, BarChart3, Settings } from 'lucide-react'

export function Header() {
    const pathname = usePathname()
    const t = useTranslations('component')

    const navigation = [
        { name: t('header.navigation.home'), href: '/', icon: Home },
        { name: t('header.navigation.dashboard'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('header.navigation.forms'), href: '/forms', icon: FormInput },
        { name: t('header.navigation.animations'), href: '/animations', icon: Palette },
        { name: t('header.navigation.charts'), href: '/charts', icon: BarChart3 },
        { name: t('header.navigation.settings'), href: '/settings', icon: Settings },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <div className="h-6 w-6 rounded bg-primary"></div>
                        <span className="hidden font-bold sm:inline-block">{t('header.brand')}</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link key={item.name} href={item.href} className={cn('flex items-center space-x-2 transition-colors hover:text-foreground/80', pathname === item.href ? 'text-foreground' : 'text-foreground/60')}>
                                    <Icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Button variant="ghost" className="md:hidden" asChild>
                            <Link href="/">
                                <div className="h-6 w-6 rounded bg-primary"></div>
                                <span className="ml-2 font-bold">{t('header.brand')}</span>
                            </Link>
                        </Button>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <ThemeSwitcher />
                    </nav>
                </div>
            </div>
        </header>
    )
}
