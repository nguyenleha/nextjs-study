export type TextInputProps = {
    white?: boolean
    user?: boolean
    lg?: boolean
}

export function Loading({ white, user, lg }: TextInputProps) {
    const defaultColor = {
        ['--loading-spinner-color']: white ? '#ffffff' : user ? '#1a811e' : '#00554d',
    } as React.CSSProperties
    return (
        <div className={lg ? 'loading-form-nuxt-lg' : 'loading-form-nuxt'} style={defaultColor}>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
