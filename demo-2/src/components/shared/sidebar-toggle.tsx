'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSidebarConfig } from '@/libs/sidebar-config'
import { Menu, AlignLeft } from 'lucide-react'

export function SidebarToggle() {
    const { isOpen, toggle } = useSidebarConfig()

    // Effect riêng để xử lý mobile - đảm bảo sidebar luôn đóng trên mobile
    useEffect(() => {
        const handleMobileSidebar = () => {
            const sidebar = document.getElementById('desktop-sidebar')
            const mainContent = document.getElementById('main-content')

            if (sidebar && mainContent) {
                if (window.innerWidth < 768) {
                    // Force ẩn sidebar trên mobile
                    sidebar.style.display = 'none'
                    sidebar.classList.add('hidden')
                    sidebar.classList.remove('md:flex')
                    mainContent.classList.remove('md:pl-64')
                    mainContent.style.paddingLeft = '0'
                }
            }
        }

        // Chạy ngay lập tức
        handleMobileSidebar()

        // Lắng nghe resize
        window.addEventListener('resize', handleMobileSidebar)

        return () => {
            window.removeEventListener('resize', handleMobileSidebar)
        }
    }, [])

    // SidebarToggle chỉ cần xử lý mobile, desktop được xử lý bởi Sidebar component
    useEffect(() => {
        const handleMobileSidebar = () => {
            const sidebar = document.getElementById('desktop-sidebar')
            const mainContent = document.getElementById('main-content')

            if (sidebar && mainContent) {
                if (window.innerWidth < 768) {
                    // Force ẩn sidebar trên mobile
                    sidebar.style.display = 'none'
                    sidebar.classList.add('hidden')
                    sidebar.classList.remove('md:flex')
                    mainContent.classList.remove('md:pl-64')
                    mainContent.style.paddingLeft = '0'
                } else {
                    // Hiển thị sidebar trên desktop
                    sidebar.style.display = 'flex'
                    sidebar.classList.remove('hidden')
                    sidebar.classList.add('md:flex')
                }
            }
        }

        // Chạy ngay lập tức
        handleMobileSidebar()

        // Lắng nghe resize
        window.addEventListener('resize', handleMobileSidebar)

        return () => {
            window.removeEventListener('resize', handleMobileSidebar)
        }
    }, [])

    return (
        <Button variant="ghost" size="icon" onClick={toggle} className="hidden md:flex">
            {isOpen ? <AlignLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}
