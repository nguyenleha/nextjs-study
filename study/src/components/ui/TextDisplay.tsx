export type TextDisplayProps = {
    text?: string
}

export function TextDisplay({ text }: TextDisplayProps) {
    if (!text) return null
    return (
        <p style={{ margin: 0 }}>
            Printed: <strong>{text}</strong>
        </p>
    )
}
