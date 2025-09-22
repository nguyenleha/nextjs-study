'use client'
import React from 'react'

export type ClientPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function ClientPagination({ currentPage, totalPages, onPageChange }: ClientPaginationProps) {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav aria-label="Client Pagination" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                style={{
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    background: 'white',
                    opacity: currentPage <= 1 ? 0.5 : 1,
                    cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                }}
            >
                Prev
            </button>

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        aria-current={p === currentPage ? 'page' : undefined}
                        style={{
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: 6,
                            background: p === currentPage ? '#eee' : 'white',
                            fontWeight: p === currentPage ? 600 : 400,
                            cursor: 'pointer',
                        }}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                style={{
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    background: 'white',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                    cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                }}
            >
                Next
            </button>
        </nav>
    )
}
