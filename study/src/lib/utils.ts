export function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ')
}

export async function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
}
