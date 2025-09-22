'use client'
import { useEffect, useState } from 'react'

export function CounterWatch() {
    const [count, setCount] = useState(0)

    // watch(count)
    useEffect(() => {
        console.log('count changed:', count)
    }, [count])

    return (
        <div className="p-2 rounded-lg border border-gray-200">
            <strong>CounterWatch</strong>
            <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded border" onClick={() => setCount((c) => c - 1)}>
                    -
                </button>
                <span>{count}</span>
                <button className="px-2 py-1 rounded border" onClick={() => setCount((c) => c + 1)}>
                    +
                </button>
            </div>
        </div>
    )
}
