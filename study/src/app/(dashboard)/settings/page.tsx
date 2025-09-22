'use client'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { TextInput } from '@/components/ui/TextInput'
import { TextDisplay } from '@/components/ui/TextDisplay'
import ClientLifecycleDemo from '@/components/demo/ClientLifecycleDemo'
import { CounterWatch } from '@/components/demo/CounterWatch'
import { CartTotal } from '@/components/demo/CartTotal'
import { RouteWatcher } from '@/components/demo/RouteWatcher'

export default function SettingsPage() {
    const [value, setValue] = useState('')
    const [printed, setPrinted] = useState<string | null>(null)

    const handlePrint = () => {
        if (!value.trim()) {
            setPrinted(null)
            alert('Please type something first.')
            return
        }
        const ok = confirm(`Print this?\n\n${value}`)
        if (ok) setPrinted(value)
        else setPrinted(null)
    }

    return (
        <section className="p-6">
            <h1>Settings</h1>
            <p>Protected area example under (dashboard)/settings.</p>
            <div className="grid gap-3 items-start max-w-[460px]">
                <TextDisplay text={printed ?? undefined} />
                <TextInput value={value} onChange={setValue} placeholder="Type something…" />
                <Button variant="secondary" onClick={handlePrint}>
                    Confirm & Print
                </Button>
            </div>

            <hr className="my-6" />
            <h2>Nuxt → Next lifecycle demos</h2>
            <div className="grid gap-3 items-start max-w-[600px]">
                <ClientLifecycleDemo />
                <CounterWatch />
                <CartTotal />
                <RouteWatcher />
            </div>
        </section>
    )
}
