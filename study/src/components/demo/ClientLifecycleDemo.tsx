'use client'
import { useEffect, useState } from 'react'

export default function ClientLifecycleDemo() {
    const [size, setSize] = useState({ w: 0, h: 0 })

    useEffect(() => {
        // onMounted
        const update = () => setSize({ w: window.innerWidth, h: window.innerHeight })
        update()
        window.addEventListener('resize', update)

        // onUnmounted
        return () => {
            window.removeEventListener('resize', update)
        }
    }, [])

    return (
        <div className="p-2 rounded-lg border border-gray-200">
            <strong>ClientLifecycleDemo</strong>
            <div>
                Window: {size.w} × {size.h}
            </div>
        </div>
    )
}
