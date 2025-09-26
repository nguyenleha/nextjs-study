'use client'

import { useState } from 'react'
import type { HTMLInputTypeAttribute } from 'react'

export type TextInputProps = {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    type?: HTMLInputTypeAttribute
    className?: string
}

export function TextInput({ value: valueProp, onChange, placeholder, type = 'text', className }: TextInputProps) {
    const [internal, setInternal] = useState(valueProp ?? '')

    const value = valueProp ?? internal

    return (
        <input
            value={value}
            onChange={(e) => {
                setInternal(e.target.value)
                onChange?.(e.target.value)
            }}
            placeholder={placeholder ?? 'Type here…'}
            type={type}
            className={className}
        />
    )
}
