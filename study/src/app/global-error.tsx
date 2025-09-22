'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html>
            <body>
                <section style={{ padding: 24, color: '#b91c1c' }}>
                    <h1>Global error</h1>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
                    <button onClick={reset} style={{ marginTop: 12, padding: '8px 12px' }}>
                        Reload
                    </button>
                </section>
            </body>
        </html>
    )
}
