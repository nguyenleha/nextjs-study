'use client'

import { Link, usePathname } from '@/libs/I18nNavigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { useSidebarConfig } from '@/libs/sidebar-config'
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
    const { isOpen } = useSidebarConfig()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Lắng nghe sự kiện resize để cập nhật trạng thái collapsed
    useEffect(() => {
        const handleResize = () => {
            const sidebar = document.getElementById('desktop-sidebar')
            if (sidebar) {
                const computedStyle = window.getComputedStyle(sidebar)
                const width = computedStyle.width
                const collapsed = width === '80px' || width === '5rem'
                setIsCollapsed(collapsed)
            }
        }

        // Delay để đảm bảo sidebar đã được render
        const timeoutId = setTimeout(() => {
            handleResize()
        }, 100)

        // Lắng nghe sự kiện resize
        window.addEventListener('resize', handleResize)

        // Lắng nghe sự kiện transitionend để cập nhật trạng thái sau animation
        const sidebar = document.getElementById('desktop-sidebar')
        if (sidebar) {
            sidebar.addEventListener('transitionend', handleResize)
        }

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', handleResize)
            if (sidebar) {
                sidebar.removeEventListener('transitionend', handleResize)
            }
        }
    }, [])

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
    }, [])

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

    // Logic để xác định sidebar có đang expand không
    // Ưu tiên isOpen từ config, sau đó là hover, cuối cùng là !isCollapsed
    const isExpanded = isOpen || isHovered || !isCollapsed

    // Effect để xử lý hover expand sidebar và config state
    useEffect(() => {
        const sidebar = document.getElementById('desktop-sidebar')
        const mainContent = document.getElementById('main-content')

        if (sidebar && mainContent) {
            if (isOpen || isHovered) {
                // Sidebar hiển thị với hiệu ứng smooth (mở rộng)
                sidebar.style.width = '5rem' // 80px = 5rem
                sidebar.style.transform = 'translateX(0)'
                // Force reflow để đảm bảo width được áp dụng trước
                void sidebar.offsetHeight
                sidebar.style.width = '16rem' // 256px = 16rem
                mainContent.classList.add('md:pl-64')
                mainContent.style.paddingLeft = '16rem' // 256px = 16rem
            } else {
                // Sidebar thu gọn chỉ còn icon với hiệu ứng smooth
                sidebar.style.width = '5rem' // 80px = 5rem
                mainContent.classList.remove('md:pl-64')
                mainContent.style.paddingLeft = '5rem' // 80px = 5rem
            }
        }
    }, [isHovered, isOpen])

    const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
        const hasSubItems = item.subItems && item.subItems.length > 0
        const isOpen = isDropdownOpen(item.name)

        return (
            <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                    <Button variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start !px-3', level > 0 && 'ml-4 w-[calc(100%-1rem)]', isActive && 'bg-secondary')} onClick={() => isExpanded && toggleDropdown(item.name)} title={!isExpanded ? item.name : undefined}>
                        <div className="flex items-center w-full !gap-0">
                            <div className="h-8 flex items-center justify-center flex-shrink-0 transition-none w-8 data-[collapsed=true]:w-full">
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className={cn('flex-1 flex items-center justify-between transition-all duration-300', !isExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                                <span className="ml-2">{item.name}</span>
                                <ChevronRight className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-90')} />
                            </div>
                        </div>
                    </Button>
                ) : (
                    <Button variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start !px-3', level > 0 && 'ml-4 w-[calc(100%-1rem)]', isActive && 'bg-secondary')} asChild title={!isExpanded ? item.name : undefined}>
                        <Link href={item.href} className="flex items-center w-full !gap-0">
                            <div className="h-8 flex items-center justify-center flex-shrink-0 transition-none w-8 data-[collapsed=true]:w-full">
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className={cn('flex-1 transition-all duration-300', !isExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                                <span className="ml-2">{item.name}</span>
                            </div>
                        </Link>
                    </Button>
                )}

                {hasSubItems && isExpanded && (
                    <div className={cn('overflow-hidden transition-all duration-300 ease-in-out', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
                        <div className="space-y-1 pt-1">{item.subItems!.map((subItem) => renderNavigationItem(subItem, level + 1))}</div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn('h-full flex flex-col', className)} data-collapsed={isCollapsed} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* Brand section - cố định ở trên cùng */}
            <div className="flex-shrink-0 px-3 py-4">
                <Link href="/" className="flex items-center px-3">
                    <div className="h-8 flex items-center justify-center flex-shrink-0 transition-none w-8 data-[collapsed=true]:w-full">
                        <div className="h-8 w-8 rounded bg-primary"></div>
                    </div>
                    <div className={cn('flex-1 transition-all duration-300', !isExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                        <span className="ml-2 text-lg font-bold text-nowrap">{t('header.brand')}</span>
                    </div>
                </Link>
            </div>

            {/* Navigation section - có thể scroll */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            {navigation.map((item) => renderNavigationItem(item))}

                            <div className="pt-4 mt-4 border-t">
                                <div className={cn('transition-all duration-300', !isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto')}>
                                    <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t('sidebar.authSection')}</p>
                                </div>
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
