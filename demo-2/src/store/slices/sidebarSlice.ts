import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
    isDesktopOpen: boolean
    isMobileOpen: boolean
    isCollapsed: boolean
    isHovered: boolean
    isMobile: boolean
    openDropdowns: string[]
}

const initialState: SidebarState = {
    isDesktopOpen: false,
    isMobileOpen: false,
    isCollapsed: true,
    isHovered: false,
    isMobile: true,
    openDropdowns: [],
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setDesktopOpen: (state, action: PayloadAction<boolean>) => {
            state.isDesktopOpen = action.payload
        },
        setMobileOpen: (state, action: PayloadAction<boolean>) => {
            state.isMobileOpen = action.payload
        },
        toggleDesktop: (state) => {
            state.isDesktopOpen = !state.isDesktopOpen
        },
        toggleMobile: (state) => {
            state.isMobileOpen = !state.isMobileOpen
        },
        // Giữ lại các action cũ để backward compatibility
        setOpen: (state, action: PayloadAction<boolean>) => {
            if (state.isMobile) {
                state.isMobileOpen = action.payload
            } else {
                state.isDesktopOpen = action.payload
            }
        },
        toggle: (state) => {
            if (state.isMobile) {
                state.isMobileOpen = !state.isMobileOpen
            } else {
                state.isDesktopOpen = !state.isDesktopOpen
            }
        },
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload
        },
        setHovered: (state, action: PayloadAction<boolean>) => {
            state.isHovered = action.payload
        },
        setMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
        toggleDropdown: (state, action: PayloadAction<string>) => {
            const itemName = action.payload
            const isOpen = state.openDropdowns.includes(itemName)
            state.openDropdowns = isOpen ? state.openDropdowns.filter((name) => name !== itemName) : [...state.openDropdowns, itemName]
        },
        setOpenDropdowns: (state, action: PayloadAction<string[]>) => {
            state.openDropdowns = action.payload
        },
        setSidebarState: (state, action: PayloadAction<Partial<SidebarState>>) => {
            return { ...state, ...action.payload }
        },
    },
})

export const { setDesktopOpen, setMobileOpen, toggleDesktop, toggleMobile, setOpen, toggle, setCollapsed, setHovered, setMobile, toggleDropdown, setOpenDropdowns, setSidebarState } = sidebarSlice.actions

export default sidebarSlice.reducer
