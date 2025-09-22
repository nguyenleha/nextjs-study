'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function RouteWatcher() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        console.log('Route changed:', pathname, searchParams.toString())
    }, [pathname, searchParams])

    return (
        <div className="p-2 rounded-lg border border-gray-200">
            <strong>RouteWatcher</strong>
            <div>
                Path: <code>{pathname}</code>
            </div>
            <div>
                Query: <code>{searchParams.toString()}</code>
            </div>
        </div>
    )
}
