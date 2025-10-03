'use client'

import { Link, usePathname } from '@/libs/I18nNavigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Home, LayoutDashboard, FormInput, Palette, BarChart3, Settings, Menu, LogIn, UserPlus, ChevronRight, type LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarProps {
    className?: string
}

interface NavigationItem {
    name: string
    href: string
    icon: LucideIcon
    subItems?: NavigationItem[]
    isOpen?: boolean
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const t = useTranslations('component')

    const navigation: NavigationItem[] = [
        { name: t('header.navigation.home'), href: '/', icon: Home },
        {
            name: t('header.navigation.dashboard'),
            href: '/dashboard',
            icon: LayoutDashboard,
            isOpen: false,
            subItems: [
                { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
                { name: 'Reports', href: '/dashboard/reports', icon: FormInput },
                { name: 'Overview', href: '/dashboard/overview', icon: Home },
            ],
        },
        {
            name: t('header.navigation.forms'),
            href: '/forms',
            icon: FormInput,
            isOpen: false,
            subItems: [
                { name: 'Basic Forms', href: '/forms/basic', icon: FormInput },
                { name: 'Advanced Forms', href: '/forms/advanced', icon: Settings },
            ],
        },
        { name: t('header.navigation.animations'), href: '/animations', icon: Palette },
        { name: t('header.navigation.charts'), href: '/charts', icon: BarChart3 },
        { name: t('header.navigation.settings'), href: '/settings', icon: Settings },
    ]

    const authNavigation = [
        {
            name: t('sidebar.authSection'),
            href: '/dashboard',
            icon: LayoutDashboard,
            isOpen: false,
            subItems: [
                { name: t('sidebar.signIn'), href: '/sign-in', icon: LogIn },
                { name: t('sidebar.signUp'), href: '/sign-up', icon: UserPlus },
            ],
        },
        { name: t('header.navigation.settings'), href: '/settings', icon: Settings },
    ]

    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

    // Function để lấy tất cả items có isOpen = true
    const getInitialOpenDropdowns = (items: NavigationItem[]) => {
        const openItems = new Set<string>()

        const addOpenItems = (itemList: NavigationItem[]) => {
            itemList.forEach((item) => {
                if (item.subItems && item.isOpen) {
                    openItems.add(item.name)
                }
                if (item.subItems) {
                    addOpenItems(item.subItems)
                }
            })
        }

        addOpenItems(items)
        return openItems
    }

    // Khởi tạo openDropdowns dựa trên isOpen của các items
    useEffect(() => {
        const allItems = [...navigation, ...authNavigation]
        const initialOpenItems = getInitialOpenDropdowns(allItems)
        setOpenDropdowns(initialOpenItems)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const toggleDropdown = (itemName: string) => {
        setOpenDropdowns((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(itemName)) {
                newSet.delete(itemName)
            } else {
                newSet.add(itemName)
            }
            return newSet
        })
    }

    const isDropdownOpen = (itemName: string) => openDropdowns.has(itemName)

    const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
        const hasSubItems = item.subItems && item.subItems.length > 0
        const isOpen = isDropdownOpen(item.name)

        return (
            <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                    <Button variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-between', level > 0 && 'ml-4 w-[calc(100%-1rem)]', isActive && 'bg-secondary')} onClick={() => toggleDropdown(item.name)}>
                        <div className="flex items-center gap-2">
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </div>
                        <ChevronRight className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-90')} />
                    </Button>
                ) : (
                    <Button variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start', level > 0 && 'ml-4 w-[calc(100%-1rem)]', isActive && 'bg-secondary')} asChild>
                        <Link href={item.href}>
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Link>
                    </Button>
                )}

                {hasSubItems && (
                    <div className={cn('overflow-hidden transition-all duration-300 ease-in-out', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
                        <div className="space-y-1 pt-1">{item.subItems!.map((subItem) => renderNavigationItem(subItem, level + 1))}</div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn('h-full flex flex-col', className)}>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            <Link href="/" className="flex items-center space-x-3 px-3 py-2 mb-6">
                                <div className="h-8 w-8 rounded bg-primary"></div>
                                <span className="text-lg font-bold text-nowrap">{t('header.brand')}</span>
                            </Link>

                            {navigation.map((item) => renderNavigationItem(item))}

                            <div className="pt-4 mt-4 border-t">
                                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t('sidebar.authSection')}</p>
                                {authNavigation.map((item) => renderNavigationItem(item))}
                            </div>
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
            <SheetContent side="left" className="p-0 w-64 h-full">
                <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <Sidebar className="h-full" />
            </SheetContent>
        </Sheet>
    )
}
