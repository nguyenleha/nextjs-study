// CSS Module declarations
declare module '*.css' {
    const content: Record<string, string>
    export default content
}

declare module '*.scss' {
    const content: Record<string, string>
    export default content
}

declare module '*.sass' {
    const content: Record<string, string>
    export default content
}

// Global CSS imports (side-effect imports)
declare module '*.module.css' {
    const classes: Record<string, string>
    export default classes
}
