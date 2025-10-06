'use client'

import { useAppSelector } from '@/store/hooks'
import { cn } from '@/libs/utils'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface SidebarLayoutProps {
    children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
    const { isDesktopOpen, isHovered, isMobile } = useAppSelector((state) => state.sidebar)

    // Logic đơn giản: trên desktop, sidebar expand khi isDesktopOpen = true hoặc hover
    // Trên mobile, sidebar luôn ẩn (mobile sidebar được xử lý bởi MobileSidebar component)
    const isExpanded = !isMobile && (isDesktopOpen || isHovered)

    // Tính toán width và padding dựa trên Redux state
    const sidebarWidth = isMobile ? '0px' : isExpanded ? '16rem' : '5rem'
    const mainPaddingLeft = isMobile ? '0px' : isExpanded ? '16rem' : '5rem'

    return (
        <div className="relative flex min-h-screen">
            {/* Desktop Sidebar */}
            <div
                className={cn('md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out hidden', isMobile && 'hidden')}
                style={{
                    width: sidebarWidth,
                    display: isMobile ? 'none' : 'flex',
                    transform: 'translateX(0px)',
                }}
            >
                <div className="flex-1 flex flex-col min-h-0 border-r bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                    <Sidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out" style={{ paddingLeft: mainPaddingLeft }}>
                <Header />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
