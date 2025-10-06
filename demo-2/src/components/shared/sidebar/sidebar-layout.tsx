'use client'

import { useAppSelector } from '@/store/hooks'
import { cn } from '@/libs/utils'
import { Sidebar } from './sidebar'
import { Header } from '@/components/shared'

interface SidebarLayoutProps {
    children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
    const { isDesktopOpen, isHovered, isMobile } = useAppSelector((state) => state.sidebar)

    // Logic đơn giản: trên desktop, sidebar expand khi isDesktopOpen = true hoặc hover
    // Trên mobile, sidebar luôn ẩn (mobile sidebar được xử lý bởi MobileSidebar component)
    const isExpanded = !isMobile && (isDesktopOpen || isHovered)

    // Tính toán width và padding dựa trên Redux state
    const sidebarWidth = isMobile ? '0px' : isExpanded ? 'md:w-[16rem]' : 'md:w-[5rem]'
    const mainPaddingLeft = isMobile ? '0px' : isExpanded ? 'md:pl-[16rem]' : 'md:pl-[5rem]'

    return (
        <div className="relative flex min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <div
                    className={cn('md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out hidden translate-x-0 w-0', sidebarWidth)}
                >
                    <div className="flex-1 flex flex-col min-h-0 border-r bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                        <Sidebar />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn('flex flex-col flex-1 transition-all duration-300 ease-in-out pl-0', mainPaddingLeft)}>
                <Header />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
