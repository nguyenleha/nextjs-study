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
    const [isOpen, setIsOpen] = useState(false)

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
