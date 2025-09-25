import { CounterDemo } from '@/components/demo/CounterReduxDemo'

export default function ProjectsPage() {
    return (
        <section style={{ padding: 24 }}>
            <h1>Projects</h1>
            <p>Protected area example under (dashboard)/projects.</p>

            {/* Redux Counter Demo */}
            <CounterDemo />
        </section>
    )
}
