'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleDesktop, setMobile } from '@/store/slices/sidebarSlice'
import { Menu, AlignLeft } from 'lucide-react'

export function SidebarToggle() {
    const dispatch = useAppDispatch()
    const { isDesktopOpen } = useAppSelector((state) => state.sidebar)

    // Effect để xử lý mobile detection
    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 768
            dispatch(setMobile(isMobileView))
        }

        // Chạy ngay lập tức
        handleResize()

        // Lắng nghe resize
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch])

    return (
        <Button variant="ghost" size="icon" onClick={() => dispatch(toggleDesktop())} className="hidden md:flex">
            {isDesktopOpen ? <AlignLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}
