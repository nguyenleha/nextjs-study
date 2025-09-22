'use client';

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section style={{ padding: 24, color: '#b91c1c' }}>
      <h1>Something went wrong</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={reset} style={{ marginTop: 12, padding: '8px 12px' }}>Try again</button>
    </section>
  );
}
