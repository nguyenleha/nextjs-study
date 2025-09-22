'use client'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import type React from 'react'

export type ButtonProps = PropsWithChildren<{
    variant?: 'primary' | 'secondary' | 'ghost'
}> &
    ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
    const base: React.CSSProperties = {
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid transparent',
        cursor: 'pointer',
        fontSize: 14,
    }
    const variants: Record<string, React.CSSProperties> = {
        primary: { background: '#111827', color: '#fff' },
        secondary: { background: '#e5e7eb', color: '#111827' },
        ghost: { background: 'transparent', color: '#111827', borderColor: '#e5e7eb' },
    }
    return (
        <button {...props} style={{ ...base, ...variants[variant], ...style }}>
            {children}
        </button>
    )
}
