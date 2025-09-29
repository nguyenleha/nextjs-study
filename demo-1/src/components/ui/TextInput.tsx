'use client'

import { useState } from 'react'
import type { HTMLInputTypeAttribute } from 'react'

export type TextInputProps = {
    id?: string
    value?: string | number | string[]
    onChange?: (value: string) => void
    placeholder?: string
    type?: HTMLInputTypeAttribute
    className?: string
    readOnly?: boolean
}

export function TextInput({ id, value: valueProp, onChange, placeholder, type = 'text', className, readOnly }: TextInputProps) {
    const [internal, setInternal] = useState(valueProp ?? '')

    const value = valueProp ?? internal

    return (
        <input
            id={id}
            value={value}
            onChange={(e) => {
                setInternal(e.target.value)
                onChange?.(e.target.value)
            }}
            placeholder={placeholder}
            type={type}
            className={className}
            readOnly={readOnly}
        />
    )
}
