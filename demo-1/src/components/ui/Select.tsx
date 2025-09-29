import { ChangeEvent } from 'react'

export type SelectOption = {
    label: string
    value: string | number
}

export type SelectProps = {
    id?: string
    name?: string
    value?: string | number | string[]
    options: SelectOption[]
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    className?: string
    disabled?: boolean
}

export function Select({ id, name, value, options, onChange, className = '', disabled = false }: SelectProps) {
    return (
        <select id={id} name={name} value={value} onChange={onChange} className={className} disabled={disabled}>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}
