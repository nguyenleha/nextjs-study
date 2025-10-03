'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SidebarConfigContextType {
    isOpen: boolean
    toggle: () => void
    setOpen: (open: boolean) => void
}

const SidebarConfigContext = createContext<SidebarConfigContextType | undefined>(undefined)

interface SidebarConfigProviderProps {
    children: ReactNode
}

export function SidebarConfigProvider({ children }: SidebarConfigProviderProps) {
    const [isOpen, setIsOpen] = useState(true) // Mặc định mở
    const [isInitialized, setIsInitialized] = useState(false)

    // Lưu trạng thái vào localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('sidebar-open')
        if (savedState !== null) {
            const parsedState = JSON.parse(savedState)
            setIsOpen(parsedState)
        }
        setIsInitialized(true)
    }, [])

    // Lưu trạng thái khi thay đổi (chỉ sau khi đã khởi tạo)
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('sidebar-open', JSON.stringify(isOpen))
        }
    }, [isOpen, isInitialized])

    const toggle = () => {
        setIsOpen((prev) => !prev)
    }

    const setOpen = (open: boolean) => {
        setIsOpen(open)
    }

    return <SidebarConfigContext.Provider value={{ isOpen, toggle, setOpen }}>{children}</SidebarConfigContext.Provider>
}

export function useSidebarConfig() {
    const context = useContext(SidebarConfigContext)
    if (context === undefined) {
        throw new Error('useSidebarConfig must be used within a SidebarConfigProvider')
    }
    return context
}
