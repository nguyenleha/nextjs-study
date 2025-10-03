'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, AlignLeft } from 'lucide-react'

export function SidebarToggle() {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const sidebar = document.getElementById('desktop-sidebar')
        const mainContent = document.getElementById('main-content')

        const updateSidebar = () => {
            if (sidebar && mainContent) {
                // Luôn ẩn sidebar trên mobile (< 768px)
                if (window.innerWidth < 768) {
                    sidebar.classList.add('hidden')
                    sidebar.classList.remove('md:flex')
                    sidebar.style.transform = ''
                    sidebar.style.transition = ''
                    mainContent.classList.remove('md:pl-64')
                    mainContent.style.paddingLeft = ''
                    mainContent.style.transition = ''
                } else {
                    // Chỉ áp dụng toggle trên desktop (>= 768px)
                    sidebar.classList.remove('hidden')
                    sidebar.classList.add('md:flex')

                    // Đảm bảo có transition
                    sidebar.style.transition = 'all 0.3s ease-in-out'
                    mainContent.style.transition = 'padding-left 0.3s ease-in-out'

                    if (isOpen) {
                        // Sidebar hiển thị với hiệu ứng smooth
                        sidebar.style.display = 'flex'
                        // Đặt transform về -100% trước, sau đó animate về 0
                        sidebar.style.transform = 'translateX(-100%)'
                        // Force reflow để đảm bảo transform được áp dụng trước
                        sidebar.offsetHeight
                        sidebar.style.transform = 'translateX(0)'
                        mainContent.classList.add('md:pl-64')
                        mainContent.style.paddingLeft = '16rem' // 256px = 16rem
                    } else {
                        // Sidebar ẩn với hiệu ứng smooth
                        sidebar.style.transform = 'translateX(-100%)'
                        mainContent.classList.remove('md:pl-64')
                        mainContent.style.paddingLeft = '0'

                        // Ẩn sidebar sau khi animation hoàn thành
                        setTimeout(() => {
                            if (!isOpen) {
                                sidebar.style.display = 'none'
                            }
                        }, 300) // 300ms = duration của transition
                    }
                }
            }
        }

        // Reset state về true khi chuyển từ mobile sang desktop
        const handleResize = () => {
            const wasDesktop = window.innerWidth >= 768
            if (wasDesktop && !isOpen) {
                // Có thể reset về true nếu muốn sidebar luôn mở khi chuyển sang desktop
                // setIsOpen(true)
            }
            updateSidebar()
        }

        // Cập nhật khi component mount và khi isOpen thay đổi
        updateSidebar()

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
