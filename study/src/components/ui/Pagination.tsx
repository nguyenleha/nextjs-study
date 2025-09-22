import Link from 'next/link'

export type PaginationProps = {
    currentPage: number
    totalPages: number
    pageSize?: number
    basePath: string
}

export function Pagination({ currentPage, totalPages, pageSize = 10, basePath }: PaginationProps) {
    const makeHref = (p: number) => ({
        pathname: basePath,
        query: { page: String(p), perPage: String(pageSize) },
    })

    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav aria-label="Pagination" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
                href={makeHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage <= 1}
                style={{
                    pointerEvents: currentPage <= 1 ? 'none' : 'auto',
                    opacity: currentPage <= 1 ? 0.5 : 1,
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                }}
            >
                Prev
            </Link>

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {pages.map((p) => (
                    <Link
                        key={p}
                        href={makeHref(p)}
                        aria-current={p === currentPage ? 'page' : undefined}
                        style={{
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: 6,
                            background: p === currentPage ? '#eee' : 'transparent',
                            fontWeight: p === currentPage ? 600 : 400,
                        }}
                    >
                        {p}
                    </Link>
                ))}
            </div>

            <Link
                href={makeHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage >= totalPages}
                style={{
                    pointerEvents: currentPage >= totalPages ? 'none' : 'auto',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                }}
            >
                Next
            </Link>
        </nav>
    )
}
