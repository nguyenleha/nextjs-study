'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, AlignLeft } from 'lucide-react'

export function SidebarToggle() {
    const [isOpen, setIsOpen] = useState(false)

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

    useEffect(() => {
        const sidebar = document.getElementById('desktop-sidebar')
        const mainContent = document.getElementById('main-content')

        const updateSidebar = () => {
            if (sidebar && mainContent) {
                // Chỉ xử lý desktop (>= 768px), mobile đã được xử lý ở useEffect khác
                if (window.innerWidth >= 768) {
                    sidebar.classList.remove('hidden')
                    sidebar.classList.add('md:flex')
                    sidebar.style.display = 'flex'

                    // Đảm bảo có transition và overflow hidden
                    sidebar.style.transition = 'all 0.3s ease-in-out'
                    sidebar.style.overflow = 'hidden'
                    mainContent.style.transition = 'padding-left 0.3s ease-in-out'

                    if (isOpen) {
                        // Sidebar hiển thị với hiệu ứng smooth (mở rộng)
                        sidebar.style.width = '5rem' // 80px = 5rem (12+12+32+12+12)
                        sidebar.style.transform = 'translateX(0)'
                        // Force reflow để đảm bảo width được áp dụng trước
                        void sidebar.offsetHeight
                        sidebar.style.width = '16rem' // 256px = 16rem
                        mainContent.classList.add('md:pl-64')
                        mainContent.style.paddingLeft = '16rem' // 256px = 16rem
                    } else {
                        // Sidebar thu gọn chỉ còn icon với hiệu ứng smooth
                        sidebar.style.width = '5rem' // 80px = 5rem (12+12+32+12+12)
                        mainContent.classList.remove('md:pl-64')
                        mainContent.style.paddingLeft = '5rem' // 80px = 5rem
                    }
                }
            }
        }

        // Reset state về true khi chuyển từ mobile sang desktop
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 768
            if (isDesktop && !isOpen) {
                // Reset về true khi chuyển sang desktop để sidebar mở mặc định
                setIsOpen(true)
            }
            // Chỉ update sidebar trên desktop
            if (isDesktop) {
                updateSidebar()
            }
        }

        // Cập nhật khi component mount và khi isOpen thay đổi (chỉ trên desktop)
        if (window.innerWidth >= 768) {
            updateSidebar()
        }

        // Lắng nghe sự kiện resize để cập nhật khi thay đổi kích thước màn hình
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isOpen])

    return (
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="hidden md:flex">
            {isOpen ? <AlignLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}
