// You can augment Next.js types here if needed
export type PageProps = {
    // In Next.js 15, searchParams is async and must be awaited
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export type RequestOptions = RequestInit & { baseUrl?: string } & { language?: string }