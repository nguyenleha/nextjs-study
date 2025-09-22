'use client'

import { useState } from 'react'

export type TextInputProps = {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

export function TextInput({ value: valueProp, onChange, placeholder }: TextInputProps) {
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
            style={{
                padding: '8px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                minWidth: 240,
            }}
        />
    )
}
