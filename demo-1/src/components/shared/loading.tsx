export type TextInputProps = {
    white?: boolean
    user?: boolean
    lg?: boolean
    style?: React.CSSProperties
    className?: string
}

export function Loading({ white, user, lg, style, className }: TextInputProps) {
    const defaultColor = {
        ['--loading-spinner-color']: white ? '#ffffff' : user ? '#1a811e' : '#00554d',
    } as React.CSSProperties
    return (
        <div className={lg ? className + ' loading-form-nuxt-lg' : className + ' loading-form-nuxt'} style={{ ...defaultColor, ...style }}>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
