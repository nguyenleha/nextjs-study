'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Home, LayoutDashboard, FormInput, Palette, BarChart3, Settings, Menu, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
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

    const authNavigation = [
        { name: t('sidebar.signIn'), href: '/sign-in', icon: LogIn },
        { name: t('sidebar.signUp'), href: '/sign-up', icon: UserPlus },
    ]

    return (
        <div className={cn('pb-12', className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Link href="/" className="flex items-center space-x-3 px-3 py-2 mb-6">
                            <div className="h-8 w-8 rounded bg-primary"></div>
                            <span className="text-lg font-bold">{t('header.brand')}</span>
                        </Link>

                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Button key={item.name} variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start', isActive && 'bg-secondary')} asChild>
                                    <Link href={item.href}>
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        })}

                        <div className="pt-4 mt-4 border-t">
                            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t('sidebar.authSection')}</p>
                            {authNavigation.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Button key={item.name} variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start', isActive && 'bg-secondary')} asChild>
                                        <Link href={item.href}>
                                            <Icon className="mr-2 h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
