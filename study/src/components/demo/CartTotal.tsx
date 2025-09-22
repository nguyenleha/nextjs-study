'use client'
import { useMemo, useState } from 'react'

export function CartTotal() {
    const [items, setItems] = useState<Array<{ price: number }>>([{ price: 10 }, { price: 20 }])

    const total = useMemo(() => items.reduce((sum, it) => sum + it.price, 0), [items])

    return (
        <div className="p-2 rounded-lg border border-gray-200">
            <strong>CartTotal</strong>
            <div>Total: ${total}</div>
            <button className="mt-2 px-3 py-1 rounded border hover:bg-gray-50" onClick={() => setItems((prev) => [...prev, { price: 10 }])}>
                Add $10 item
            </button>
        </div>
    )
}
