'use client'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import type React from 'react'
import { Loading } from '../shared/loading'

export type ButtonProps = PropsWithChildren<{
    className?: string
    pending?: {
        action: boolean
        white?: boolean
        user?: boolean
        lg?: boolean
    }
    style?: React.CSSProperties
}> &
    ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, style, className, pending, ...props }: ButtonProps) {
    return (
        <button {...props} style={{ ...style }} className={className}>
            {pending?.action ? <Loading white={pending.white} user={pending.user} lg={pending.lg} /> : children}
        </button>
    )
}
