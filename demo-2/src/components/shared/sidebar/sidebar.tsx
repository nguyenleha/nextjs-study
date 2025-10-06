'use client'

import { Link, usePathname } from '@/libs/I18nNavigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setMobileOpen, setHovered, setMobile, toggleDropdown, setOpenDropdowns } from '@/store/slices/sidebarSlice'
import { Home, LayoutDashboard, FormInput, Palette, BarChart3, Settings, Menu, LogIn, UserPlus, ChevronRight, type LucideIcon } from 'lucide-react'
import { useEffect } from 'react'

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
    const dispatch = useAppDispatch()
    const { isDesktopOpen, isMobileOpen, isCollapsed, isHovered, isMobile, openDropdowns } = useAppSelector((state) => state.sidebar)

    // Lắng nghe sự kiện resize để cập nhật trạng thái mobile
    useEffect(() => {
        const handleResize = () => {
            // Kiểm tra xem có phải mobile không
            const isMobileView = window.innerWidth < 768 // md breakpoint
            dispatch(setMobile(isMobileView))
        }

        // Chạy ngay lập tức
        handleResize()

        // Lắng nghe sự kiện resize
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch])

    // Không cần effect này nữa vì logic đã được đơn giản hóa

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

    // Function để lấy tất cả items có isOpen = true
    const getInitialOpenDropdowns = (items: NavigationItem[]) => {
        const openItems: string[] = []

        const addOpenItems = (itemList: NavigationItem[]) => {
            itemList.forEach((item) => {
                if (item.subItems && item.isOpen) {
                    openItems.push(item.name)
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
        dispatch(setOpenDropdowns(initialOpenItems))
    }, [dispatch])

    const handleToggleDropdown = (itemName: string) => {
        dispatch(toggleDropdown(itemName))
    }

    const isDropdownOpen = (itemName: string) => openDropdowns.includes(itemName)

    // Logic để xác định sidebar có đang expand không
    // Trên mobile: chỉ dựa vào isMobileOpen từ config
    // Trên desktop: ưu tiên isDesktopOpen từ config, sau đó là hover, cuối cùng là !isCollapsed
    const isExpanded = isMobile ? isMobileOpen : isDesktopOpen || isHovered || !isCollapsed

    // Không cần effect này nữa vì chúng ta sẽ sử dụng CSS classes dựa trên Redux state

    const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
        const hasSubItems = item.subItems && item.subItems.length > 0
        const isOpen = isDropdownOpen(item.name)

        return (
            <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                    <Button variant={isActive ? 'secondary' : 'ghost'} className={cn('w-full justify-start !px-3', level > 0 && 'ml-4 w-[calc(100%-1rem)]', isActive && 'bg-secondary')} onClick={() => isExpanded && handleToggleDropdown(item.name)} title={!isExpanded ? item.name : undefined}>
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
        <div className={cn('h-full flex flex-col', className)} data-collapsed={isCollapsed} onMouseEnter={() => !isMobile && dispatch(setHovered(true))} onMouseLeave={() => !isMobile && dispatch(setHovered(false))}>
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
    const dispatch = useAppDispatch()
    const { isMobileOpen } = useAppSelector((state) => state.sidebar)

    return (
        <Sheet open={isMobileOpen} onOpenChange={(open) => dispatch(setMobileOpen(open))}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 h-full">
                <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>List of navigation links</SheetDescription>
                </VisuallyHidden>
                <Sidebar className="h-full" />
            </SheetContent>
        </Sheet>
    )
}
